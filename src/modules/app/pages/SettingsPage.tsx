import {
  Box, Button, FileButton, Group, Text, Modal, Stack
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useMemo, useRef } from 'react'
import ReactAvatarEditor from 'react-avatar-editor'
import { useMutation, useQuery } from '@tanstack/react-query'
import { showNotification } from '@mantine/notifications'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AvatarCarousel, AvatarEditor } from '../components'
import { uploadFile } from '../api/uploadFile'
import { attachUserFile } from '../api/attachUserFile'
import { getErrorMessage } from '@/utils/error'
import {
  ATTACH_USER_FILES_ERRORS, DELETE_USER_FILES_ERRORS, UPLOAD_FILE_ERRORS, dataURItoBlob, hashCode
} from '../utils'
import { userQuery } from '@/modules/auth/queries'
import { User } from '@/modules/auth/types'
import { queryClient } from '@/core'
import { deleteUserFile } from '../api/deleteUserFile'
import { InfoForm } from '@/modules/auth/components/InfoForm'
import {
  USER_INFO_ERRORS, logout, prepareInfoRequest, prepareInfoResponse
} from '@/modules/auth/utils'
import { InfoFormFields } from '@/modules/auth/components/InfoForm/types'
import { saveUserInfo } from '@/modules/auth/api/userInfo'

export const SettingsPage = () => {
  const navigate = useNavigate()

  const uploadFileMutation = useMutation({
    mutationFn: uploadFile,
    onError: (error: Error) => {
      showNotification({
        message: getErrorMessage(UPLOAD_FILE_ERRORS, error)
      })
    }
  })

  const attachUserFileMutation = useMutation({
    mutationFn: attachUserFile,
    onSuccess: () => {
      showNotification({
        message: 'Изображение профиля обновлено'
      })

      queryClient.invalidateQueries({
        queryKey: userQuery().queryKey
      })
    },
    onError: (error: Error) => {
      showNotification({
        message: getErrorMessage(ATTACH_USER_FILES_ERRORS, error)
      })
    }
  })

  const deleteUserFileMutation = useMutation({
    mutationFn: deleteUserFile,
    onError: (error: Error) => {
      showNotification({
        message: getErrorMessage(DELETE_USER_FILES_ERRORS, error)
      })
    },
    onSuccess: () => {
      showNotification({
        message: 'Изображение профиля удалено'
      })

      queryClient.invalidateQueries({
        queryKey: userQuery().queryKey
      })
    }
  })

  const saveUserInfoMutation = useMutation({
    mutationFn: saveUserInfo,
    onError: (error: Error) => {
      showNotification({
        message: getErrorMessage(USER_INFO_ERRORS, error)
      })
    },
    onSuccess: () => {
      showNotification({
        message: 'Персональные данные сохранены'
      })

      queryClient.removeQueries({
        queryKey: userQuery().queryKey
      })
    }
  })

  const { data } = useQuery<User>(userQuery())

  const avatars = useMemo(() => data?.imageLinks.slice(0).reverse().map((image) => ({
    id: image.id,
    src: `/api/downloadfile/${image.link}`
  })) ?? [], [data])

  const disabledAvatarDeletion = Boolean(!data?.imageLinks.length)

  const [
    openedAvatarEditor,
    { open: openAvatarEditor, close: closeAvatarEditor }
  ] = useDisclosure(false)

  const [
    openedAvatarDeletion,
    { open: openAvatarDeletion, close: closeAvatarDeletion }
  ] = useDisclosure(false)

  const rawAvatar = useRef<File | null>(null)
  const avatar = useRef<ReactAvatarEditor>(null)
  const resetRawAvatarRef = useRef<() => void>(null)

  const clearRawAvatar = () => {
    rawAvatar.current = null
    resetRawAvatarRef.current?.()
  }

  const handleRawAvatarUpload = (file: File | null) => {
    if (!file) return
    rawAvatar.current = file
    openAvatarEditor()
  }

  const handleSaveClick = async () => {
    if (!avatar.current || !rawAvatar.current) return

    const avatarURI = avatar.current?.getImage().toDataURL()
    const avatarBlob: Blob = dataURItoBlob(avatarURI)
    const [filename, extenstion] = rawAvatar.current.name.split('.')
    const avatarFile: File = new File(
      [avatarBlob],
      `${hashCode(filename)}.${extenstion}`,
      { type: avatarBlob.type }
    )
    const { data } = await uploadFileMutation.mutateAsync(avatarFile)
    await attachUserFileMutation.mutateAsync({ link: data.fileName })

    closeAvatarEditor()
    clearRawAvatar()
  }

  const handleDeleteClick = async (id: number) => {
    await deleteUserFileMutation.mutateAsync({ id })
  }

  const handleInfoSubmit = async (data: InfoFormFields) => {
    await saveUserInfoMutation.mutateAsync(prepareInfoRequest(data))
  }

  const handleLogoutCLick = () => {
    logout()

    navigate('/login')
  }

  return (
    <Box>
      <Modal opened={openedAvatarEditor} onClose={closeAvatarEditor} title="Редактирование изображения">
        <AvatarEditor file={rawAvatar.current} ref={avatar} />
        <Group justify="end" mt="xl">
          <Button
            onClick={handleSaveClick}
            loading={
              uploadFileMutation.isLoading ||
              attachUserFileMutation.isLoading
            }
          >
            Сохранить
          </Button>
        </Group>
      </Modal>
      <Modal opened={openedAvatarDeletion} onClose={closeAvatarDeletion} title="Мои изображения">
        {avatars.length
          ? (
            <AvatarCarousel avatars={avatars} w={260} h={260} m="0 auto">
              {(avatar, index) => (
                <Group justify="space-between" mt="xl">
                  <Text>{index + 1} из {avatars.length}</Text>
                  <Button
                    loading={deleteUserFileMutation.isLoading}
                    onClick={() => handleDeleteClick(avatar.id)}
                  >
                    Удалить изображение
                  </Button>
                </Group>
              )}
            </AvatarCarousel>
          )
          : <Text ta="center" my="lg">Все изображения удалены</Text>}
      </Modal>
      <Stack>
        <Text c="blue" fz="lg">Аватар</Text>
        <Group justify="flex-end">
          <Button
            variant="light"
            onClick={openAvatarDeletion}
            disabled={disabledAvatarDeletion}
          >
            Мои изображения
          </Button>
          <FileButton resetRef={resetRawAvatarRef} onChange={handleRawAvatarUpload} accept="image/png,image/jpeg">
            {(props) => <Button {...props}>Загрузить изображение</Button>}
          </FileButton>
        </Group>
        <Text c="blue" fz="lg">Персональные данные</Text>
        <InfoForm defaultValues={prepareInfoResponse(data)} onSubmit={handleInfoSubmit} />
        <Text c="blue" fz="lg">Прочее</Text>
        <Group justify="flex-end">
          <Button onClick={handleLogoutCLick} leftSection={<LogOut size="1rem" />}>Выход</Button>
        </Group>
      </Stack>
    </Box>
  )
}

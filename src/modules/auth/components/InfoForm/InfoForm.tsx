import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import {
  Button, Checkbox, Group, Stack
} from '@mantine/core'
import { AtSign } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Gender, InfoFormFields, InfoFormProps, InfoFormSchema
} from './types'
import { fallbackDefaultValues } from './utils/consts'
import {
  CheckboxGroup,
  DateInput, SegmentedControl, TextInput, Textarea
} from '@/libs/react-hook-form'

export const InfoForm = ({
  defaultValues,
  onSubmit
}: InfoFormProps) => {
  const form = useForm<InfoFormFields>({
    resolver: zodResolver(InfoFormSchema),
    defaultValues: defaultValues ?? fallbackDefaultValues
  })

  const submitHandler: SubmitHandler<InfoFormFields> = async (data) => {
    try {
      await onSubmit(data)
    } catch {
      form.reset(form.getValues())
    }
  }

  const genderData: {
    value: string
    label: React.ReactNode
  }[] = [
    { label: 'Женский', value: Gender.FEMALE },
    { label: 'Мужской', value: Gender.MALE }
  ]

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <Stack>
          {/* <TextInput value={} readOnly /> */}
          <TextInput
            name="name"
            label="Имя"
            withAsterisk
          />
          <TextInput
            name="tgAccount"
            label="Telegram аккаунт"
            withAsterisk
            leftSection={<AtSign size="1rem" />}
          />
          <DateInput
            name="birthday"
            label="Дата рождения"
            withAsterisk
            valueFormat="DD.MM.YYYY"
            defaultLevel="decade"
            maxDate={new Date()}
          />
          <Textarea
            name="description"
            label="Описание"
            rows={3}
          />
          <SegmentedControl
            label="Пол"
            name="gender"
            data={genderData}
          />
          <CheckboxGroup name="showGenders" label="Предпочтения" withAsterisk>
            <Stack gap="sm">
              {genderData.map((props) => (
                <Checkbox key={props.value} {...props} />
              ))}
            </Stack>
          </CheckboxGroup>
        </Stack>
        <Group mt="md" justify="end">
          <Button type="submit" loading={form.formState.isSubmitting}>
            Сохранить
          </Button>
        </Group>
      </form>
    </FormProvider>
  )
}

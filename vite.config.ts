import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { z } from 'zod';
import { ValidateEnv } from '@julr/vite-plugin-validate-env';
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
  plugins: [
    react(),
    svgr(),
    ValidateEnv({
      validator: 'zod',
      schema: {
        VITE_BACKEND_URL: z.string().url(),
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: env.VITE_BACKEND_URL,
        changeOrigin: true,
        secure: false
      }
    }
  },
}});

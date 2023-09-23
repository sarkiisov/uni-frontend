import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { z } from 'zod';
import { ValidateEnv } from '@julr/vite-plugin-validate-env';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
  }
});

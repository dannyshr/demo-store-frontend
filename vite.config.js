import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load all environment variables (empty prefix)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
    ],
    server: {
      port: 3001,
    },
    define: {
        // This makes env variables available via process.env.ENV_VARIABLE_NAME
        // The JSON.stringify is important to embed the value as a string literal.
        'process.env.BACKEND_PRODUCT_API_URL': JSON.stringify(env.BACKEND_PRODUCT_API_URL),
        'process.env.BACKEND_ORDER_API_URL': JSON.stringify(env.BACKEND_ORDER_API_URL),
    }
  }
})

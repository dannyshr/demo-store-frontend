// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables from .env.development (or .env.production etc.)
  // based on the current mode. The 'VITE_' prefix is important here.
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  // Ensure VITE_PROXY_BACKEND_BASE_API_URL is available
  const backendBaseApiUrl = env.VITE_PROXY_BACKEND_BASE_API_URL;

  if (!backendBaseApiUrl || backendBaseApiUrl.trim()==='') {
    console.error('VITE_PROXY_BACKEND_BASE_API_URL is not set in your .env.development file !! Local proxy to APIM will not work !!');
  } 
  else {
    console.log(`[Vite Proxy Setup] Configuring proxy to target Azure APIM: ${backendBaseApiUrl}`);
  }

  return {
    plugins: [react()],
    server: {
		  port: 3000,
      proxy: {
        // Proxy for /categories requests
        '/categories/api/Categories': {
          target: backendBaseApiUrl, // Your Azure APIM base URL
          changeOrigin: true, // Needed for virtual hosted sites (like Azure APIM)
          rewrite: (path) => {
            const rewrittenPath = `${backendBaseApiUrl}/categories/api/Categories`;
            console.log(`[Vite Proxy] Rewriting ${path} to ${rewrittenPath}`);
            return rewrittenPath;
          },
          secure: true, // Azure APIM uses HTTPS, so keep this true
          // logLevel: 'debug', // Uncomment for more detailed proxy logs in your terminal
        },
        // Proxy for /orders requests
        '/orders/orders': {
          target: backendBaseApiUrl, // Your Azure APIM base URL
          changeOrigin: true,
          rewrite: (path) => {
            const rewrittenPath = `${backendBaseApiUrl}/orders/orders`;
            console.log(`[Vite Proxy] Rewriting ${path} to ${rewrittenPath}`);
            return rewrittenPath;
          },
          secure: true,
            logLevel: 'error',
        },
      },
    },
  };
});

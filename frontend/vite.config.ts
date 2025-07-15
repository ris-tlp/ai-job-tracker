import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: '/src',
        },
      ],
    },
    server: {
      proxy: {
        '/api/parser': {
          target: env.VITE_API_URL_IMAGE_PARSER,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/parser/, env.VITE_API_VERSION)
        },
        '/api/analyzer': {
          target: env.VITE_API_URL_IMAGE_ANALYZER,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/analyzer/, env.VITE_API_VERSION)
        },
        '/api/jobs': {
          target: env.VITE_API_URL_JOB_TRACKER,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/jobs/, env.VITE_API_VERSION)
        }
      }
    },
  }
})

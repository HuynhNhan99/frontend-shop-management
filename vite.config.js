import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: '/',
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Shop Management',
          short_name: 'Shop',
          theme_color: '#00b894',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: '.',
          icons: [
            {
              src: 'logo192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'logo512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })],
    server: {
      proxy: {
        '/auth': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
        },
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: true,
        },
      },
      port: 5173
    },
  }
})

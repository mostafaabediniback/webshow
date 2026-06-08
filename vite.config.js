import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),

    tailwindcss(),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png', 'vite.svg'],
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'اربعین تی وی',
        short_name: 'ArbaeenTV',
        description: 'تلویزیون اینترنتی جبهه مقاومت',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],

  server: {
    host: '0.0.0.0',
    port: 3010,
  },
})
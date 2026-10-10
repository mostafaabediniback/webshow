import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const pwaIconFiles = [
  ['app-icon-192-v2.png', 192],
  ['app-icon-512-v2.png', 512],
  ['apple-touch-icon-v2.png', 192],
]

const validatePwaIcons = () => ({
  name: 'validate-pwa-icons',
  apply: 'build',
  buildStart() {
    for (const [fileName, size] of pwaIconFiles) {
      const file = new URL(`./public/icons/${fileName}`, import.meta.url)
      const data = readFileSync(file)
      const isPng = data.length >= 24 &&
        data.subarray(0, 8).toString('hex') === '89504e470d0a1a0a' &&
        data.subarray(12, 16).toString('ascii') === 'IHDR'

      if (!isPng || data.readUInt32BE(16) !== size || data.readUInt32BE(20) !== size) {
        throw new Error(`Invalid PWA icon ${fileName}: expected a ${size}x${size} PNG`)
      }
    }
  },
})

export default defineConfig({
  plugins: [
    react(),

    tailwindcss(),

    validatePwaIcons(),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      devOptions: {
        enabled: true
      },
      manifest: {
        id: '/',
        name: 'اربعین تی وی',
        short_name: 'اربعین تی وی',
        description: 'تلویزیون اینترنتی جبهه مقاومت',
        lang: 'fa',
        dir: 'rtl',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/icons/app-icon-192-v2.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/app-icon-512-v2.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
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

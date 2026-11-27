import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import { requireEnv } from './vite-env-guard.ts'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  // nitro() turns the server build into the target host's format (Vercel Functions when built on Vercel).
  // It must come after tanstackStart() and before viteReact().
  plugins: [requireEnv(['VITE_SITE_URL', 'VITE_CHARTLAB_LANDING_URL']), devtools(), tailwindcss(), tanstackStart(), nitro(), viteReact()],
})

export default config

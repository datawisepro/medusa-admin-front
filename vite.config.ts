/// <reference types="vitest" />
import react from "@vitejs/plugin-react"
import dns from "dns"
import path from "path"
import { defineConfig, loadEnv } from "vite"

// Resolve localhost for Node v16 and older.
// @see https://vitejs.dev/config/server-options.html#server-host.
dns.setDefaultResultOrder("verbatim")

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [react()],
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./src/test/setup.ts"],
      api: 7001,
    },
    // Backwards-compat with Gatsby.
    publicDir: "static",
    build: {
      outDir: "public",
      chunkSizeWarningLimit: 1000 * 1000,
    },
    resolve: {
      alias: {
        gatsby: path.resolve(__dirname, "src/compat/gatsby-compat.tsx"),
        "@reach/router": path.resolve(
          __dirname,
          "src/compat/reach-router-compat.tsx"
        ),
      },
    },
    define: {
      __MEDUSA_BACKEND_URL__: JSON.stringify(
        env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
      ),
    },
    optimizeDeps: {
      exclude: ["typeorm", "medusa-interfaces"],
    },
  }
})

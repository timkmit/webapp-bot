import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', 
    rollupOptions: {
    }
  },

  define: {
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify('https://ilshaw.site')
  },

  resolve: {
    alias: [
      {find: '@', replacement: '/src'}
    ]
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173, // Use default Vite port
    host: '0.0.0.0',
    cors: true,
    // Proxy API requests to backend to avoid CORS issues
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path // Keep the /api prefix
      }
    }
  },
  // Fix build issues
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  },
  // Environment variables support (only expose what you need)
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1'),
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
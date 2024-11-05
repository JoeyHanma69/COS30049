import { defineConfig , loadEnv } from 'vite'
import react from '@vitejs/plugin-react'



export default defineConfig(({mode}) => {  
  const env = loadEnv(mode, process.cwd()); 
  return { 
    plugins: [react()],
    esbuild: {
      loader: {
        '.js': 'jsx',
      },
    },
  server: {
    proxy: {
      '/api': {
        target: env.VITE_API_URL || 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }, 
}
});


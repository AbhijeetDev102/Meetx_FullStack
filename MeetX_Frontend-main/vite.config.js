import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  // server:{
  //   host: "0.0.0.0", // Allow access from LAN
  //   port: 5173,
  //   https:{
  //     key: './meetx-privateKey.key',
  //     cert: './meetx.crt'
  //   }
  // },
  plugins: [
    tailwindcss(),
    react()],
})

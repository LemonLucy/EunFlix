import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // mode에 따라 환경 변수 로드
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'import.meta.env': env, // 환경 변수를 import.meta.env에 매핑
    },
  };
});

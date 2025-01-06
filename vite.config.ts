// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), dts({
    include: ['src'],
    beforeWriteFile: (filePath, content) => {
      return {
        filePath,
        content
      };
    }
  })],
  build: {
    lib: {
      entry: 'src/components/DocumentPreview.tsx',  // The entry file for the component
      name: 'document-preview',  // The global variable name
      fileName: (format) => `document-preview.${format}.js`,  // Output file name
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});

// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts'
import fs from "fs-extra"
import { resolve } from 'path';

const copyWorkerPlugin = () => ({
  name: 'copy-worker',
  writeBundle: async () => {
    // Copy worker folder to dist
    await fs.copy(
      resolve(__dirname, 'src/worker'),
      resolve(__dirname, 'dist/worker'),
      { overwrite: true }
    );
  }
});

export default defineConfig({
  plugins: [react(), dts({
    include: ['src'],
    insertTypesEntry : true , 
    beforeWriteFile: (filePath, content) => {
      return {
        filePath,
        content
      };
    }
  }) , copyWorkerPlugin()],
  build: {
    lib: {
      entry : "./src/index.ts" , 
      formats : ['es' , 'umd'] , 
      // entry: 'src/components/DocumentPreview.tsx',  // The entry file for the component
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

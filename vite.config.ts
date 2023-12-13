import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteSassPlugin from "vite-plugin-sass"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          "jsx-control-statements",
          ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
        ],
      },
    }),
    ViteSassPlugin(),
  ],

  server: {
    port: 3000,
  },
});

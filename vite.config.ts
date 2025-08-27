import { buildXDC, eruda, mockWebxdc } from "@webxdc/vite-plugins";
import preact from "@preact/preset-vite";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import path from "path";
import { promises as fs } from "node:fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    buildXDC(),
    eruda(),
    mockWebxdc(),
    Icons({
      compiler: "jsx",
      jsx: "react",
      customCollections: {
        custom: {
          "party-popper": () => fs.readFile("./img/party-popper.svg", "utf-8"),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "@sfx": path.resolve(__dirname, "./sfx"),
      "@img": path.resolve(__dirname, "./img"),
    },
  },
});

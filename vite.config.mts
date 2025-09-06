import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tsconfigPaths()],
    server: { port: 8080, open: false },
    resolve: {
        alias: {
            "@shaders": "/shaders",
            "@math": "/math"
        }
    }
});

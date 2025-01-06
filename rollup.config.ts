import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import cloneStaticFiles from "./core/rollup/plugin-clone-static-files";

export default defineConfig([
    {
        input: "./core/express/main.ts",
        output: {
            file: "./dist/index.js",
            format: "esm",
        },
        plugins: [
            typescript({ tsconfig: "./tsconfig.json" }),
            cloneStaticFiles(), //
        ],
        external: [
            "react", // react
            "react/jsx-runtime", // jsx runtime
            "@react-email/components", // react email
            "express", // express server
        ],
    },
]);

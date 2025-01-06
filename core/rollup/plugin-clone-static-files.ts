import { glob } from "glob";
import fs from "fs/promises";
import crypto from "crypto";

// get name, extension & hash from path
const getFileName = async (path: string) => {
    const name = path.split("/").at(-1)!;
    const extension = name.split(".").at(-1)!;

    const hash = crypto
        .createHash("sha256")
        .update(await fs.readFile(path))
        .digest("base64url");

    return {
        name: name.slice(0, -1 * (extension.length + 1)),
        extension: extension,
        hash: hash,
    };
};

// helper for folder creation
const mkdir = async (path: string) => {
    try {
        const stats = await fs.stat(path);

        if (stats.isDirectory()) {
            return;
        }

        throw new Error(`We can't create a "${path}" directory, it's already exists as a file.`);

        //
    } catch (error) {
        if (error instanceof Error && error.message.includes("no such file or directory")) {
            return await fs.mkdir(path);
        }
    }
};

// plugin
export default () => {
    // asset manifest
    const manifest: Record<string, string> = {};

    return {
        name: "plugin-clone-static-files",
        buildStart: async () => {
            // find the target files with glob
            const files = await glob("**/{static,_static}/**/*.{png,jpg,jpeg,gif}");

            // show information
            console.log("\ncloning static files...\n");

            // folders
            await mkdir("dist");
            await mkdir("dist/assets");

            // clone all files with hash
            for (const path of files) {
                // get file details
                const { name, extension, hash } = await getFileName(path);

                // paths for manifest & clone
                const source = path.slice("app/emails".length);
                const target = `/assets/${name}-${hash.slice(0, 8)}.${extension}`;

                // clone the file with new name
                await fs.copyFile(path, "dist" + target);

                // show information
                console.log(`${source} -> ${target}`);

                // update the manifest
                manifest[source] = target;
            }

            console.log(""); // just an empty line
        },
        transform: (code: string, id: string) => {
            // find the "asset" helper
            if (!id.includes("/app/utils/asset.ts")) {
                return;
            }

            // update the "MANIFEST" constant
            return code.replace(
                `const MANIFEST = {};`,
                `const MANIFEST = ${JSON.stringify(manifest)};` //
            );
        },
    };
};

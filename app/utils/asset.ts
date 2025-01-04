// base url
const BASE_URL: string = "http://localhost:3000";

// mapping
const MANIFEST: Record<string, string | undefined> = {}; // Don't touch it, rollup will handle this

const asset = (asset: string) => {
    return BASE_URL + (MANIFEST[asset] || asset);
};

export default asset;

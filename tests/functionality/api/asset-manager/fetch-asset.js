import { assetManager } from "/src/main.js";


const fetchAsset = async () => {
  const { fetchAsset: _fetchAsset } = assetManager;
  const src = "/tests/functionality/api/asset-manager/assets/markup.html";
  const markup = await _fetchAsset(src);
  let passed = markup.startsWith("<div");
  
  if (passed) console.info("Passed");
  else console.error("Failed");
};


export default fetchAsset;
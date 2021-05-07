import { assetManager } from "/src/main.js";


const prefetch = async () => {
  const { prefetch: _prefetch } = assetManager;

  const assetOptions = [
    {
      id: "markup",
      type: "text",
      src: "/tests/functionality/asset-manager/assets/markup.html",
      collection: "markups"
    },
    {
      id: "module",
      type: "module",
      src: "/tests/functionality/asset-manager/assets/module.js",
      collection: "modules"
    }
  ];

  const assets = await _prefetch(assetOptions);
  let passed = true;

  assets.forEach((asset, index) => {
    if (!assets[index]) passed = false;
    if (assets[index] !== window.$App.prefetchedAssets[asset.id]) passed = false;
  });
  
  if (passed) console.info("Passed");
  else console.error("Failed");
};


export default prefetch;
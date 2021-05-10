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

  assetOptions.forEach((option, index) => {
    if (!assets[index]) passed = false;
    if (assets[index] !== window.$app.prefetchedAssets[option.collection][option.id]) passed = false;
  });
  
  if (passed) console.info("Passed");
  else console.error("Failed");
};


export default prefetch;
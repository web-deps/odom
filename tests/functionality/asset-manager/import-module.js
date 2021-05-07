import { assetManager } from "/src/main.js";


const importModule = async () => {
  const { importModule: _importModule } = assetManager;
  const src = "/tests/functionality/asset-manager/assets/module.js";
  const exported = await _importModule(src);
  let passed = exported === "module";
  
  if (passed) console.info("Passed");
  else console.error("Failed");
};


export default importModule;
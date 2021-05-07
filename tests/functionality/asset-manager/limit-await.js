import { assetManager } from "/src/main.js";


const limitAwait = async () => {
  const { limitAwait: _limitAwait } = assetManager;

  const asset = await _limitAwait({
    placeholder: "Placeholder",
    promise: promise(),
    time: 1000,
    replacer: (resolved) => {
      asset = resolved;
    }
  });

  let passed = asset === "Placeholder";
  
  setTimeout(() => {
    passed = passed && asset === "Asset";

    if (passed) console.info("Passed");
    else console.error("Failed");
  }, 3000);
};

const promise = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Asset");
    }, 2000);
  });
};


export default limitAwait;
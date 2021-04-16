import { importModule } from "./import-module.js";
import { fetchAsset } from "./fetch-asset.js";
import { prefetch } from "./prefetch.js";

export const assetManager = {
  import: importModule,
  fetch: fetchAsset,
  prefetch
};
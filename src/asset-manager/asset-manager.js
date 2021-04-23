import { importModule } from "./import-module.js";
import { fetchAsset } from "./fetch-asset.js";
import { prefetch } from "./prefetch.js";
import { limitAwait } from "./limit-await.js";

export const assetManager = { importModule, fetchAsset, prefetch, limitAwait };
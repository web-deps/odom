import { importModule } from "./import-module.js";

export const getConstructor = async (text, uri) => {
  text = await correctURIs(text, uri);
  return importModule(text);
};

import { defer } from "./defer.js";
import { lazy } from "./lazy.js";


export const loading = async function (element, value, { transform, transformOptions }) {
  let type;
  
  if (typeof value === "object") {
    type = value.type;
    delete value.type;
  } else type = value;

  if (type === "defer") await defer(element, value, { transform, transformOptions });
  else if (type === "lazy") await lazy.call(this, element, value, { transform, transformOptions });
  else throw new Error(`Wrong condition type for "loading"`);
};
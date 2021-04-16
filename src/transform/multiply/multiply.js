import { multiple } from "./multiple.js";
import { map } from "./map.js";

export const multiply = async ({ element, type, props, data, methods }) => {
  if (type === "multiple") await multiple({ element, props, data, methods });
  else await map({ element, props, data, methods });
};
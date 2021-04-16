import { getNestedValue } from "./get-nested-value.js";


export const getData = async ({ selector, data, methods, props }) => {
  return (
    selector.startsWith("@data") ? getNestedValue(data, selector.replace("@data.", ""))
    : selector.startsWith("@methods") ?  getNestedValue(methods, selector.replace("@methods.", ""))
    : selector.startsWith("@props") ? getNestedValue(props, selector.replace("@props.", ""))
    : selector.startsWith("@$app") ? getNestedValue(window.$app, selector.replace("@$app.", ""))
    : selector
  );
};
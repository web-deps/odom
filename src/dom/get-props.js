import { getData } from "../get-data.js";


export const getProps = async ({ element, skip, data, methods, props }) => {
  const attributes = element.attributes, properties = {};
  
  for (const { name, value } of attributes) {
    if (skip && skip.indexOf(name) !== -1) continue;
    properties[name] = value;
  };

  await Promise.all(
    Object.entries(properties).filter(([name, value]) => value.startsWith("@")).map(
      ([name, value]) => (async () => {
        properties[name] = await getData({ selector: value, data, methods, props });
      })()
    )
  );
  
  return properties;
};
import { createComponent } from "/src/main.js";


const attributes = async () => {
  const markup = /* html */`<div></div>`;

  const scopeAttributes = {
    id: "attributes",
    class: "attributes"
  };

  const _attributes = {
    ":scope": scopeAttributes
  };

  const options = { markup, attributes: _attributes };
  const Attributes = await createComponent(options);
  const scope = Attributes.scope;
  let passed = true;

  for (const attributeName in scopeAttributes) {
    if (scopeAttributes[attributeName] !== scope.getAttribute(attributeName)) passed = false;
  };

  if (passed) console.info("Passed");
  else console.error("Failed");

  return Attributes;
};


export default attributes;
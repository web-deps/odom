import { createComponent } from "/src/main.js";


const attributes = async () => {
  const markup = /* html */`<div></div>`;

  const _attributes = {
    id: "attributes",
    class: "attributes"
  };

  const options = { markup, attributes: _attributes };
  const Attributes = await createComponent(options);
  const scope = Attributes.scope;
  let passed = true;

  for (const attributeName in _attributes) {
    if (_attributes[attributeName] !== scope.getAttribute(attributeName)) passed = false;
  };

  if (passed) console.info("Passed");
  else console.error("Failed");

  return Attributes;
};


export default attributes;
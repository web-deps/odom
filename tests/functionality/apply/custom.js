import { createComponent } from "/src/main.js";


const custom = async () => {
  const markup = /* html */`<div></div>`;
  const options = { markup };
  const Custom = await createComponent(options);

  const customMap = {
    ":scope": {
      custom: "custom"
    }
  };

  const applyDataAttributes = (element, [name, value]) => element.dataset[name] = value;

  Custom.apply.custom(customMap, applyDataAttributes);
  const scope = Custom.scope;
  let passed = scope.dataset.custom === "custom";

  if (passed) console.info("Passed");
  else console.error("Failed");

  return Custom;
};


export default custom;
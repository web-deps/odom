import { createComponent } from "/src/main.js";

const assetWithConditional = async () => {
  const markup = /* html */ `
    <div>
      <div id="div-1"></div>
      <div id="div-2"></div>
      <div id="div-3"></div>
      <div id="div-4" odom-src="/tests/functionality/assets/assets/esm-component.js" odom-loading="lazy"></div>
    </div>
  `;

  const styles = /* css */ `
    :scope > div {
      margin: 1rem auto;
      width: 40vh;
      height: 40vh;
      background-color: green;
    }
  `;

  const options = { markup, styles };
  const AssetWithConditional = await createComponent(options);
  const scope = AssetWithConditional.scope;
  const DIV = 4;
  document.body.appendChild(scope);
  let div = AssetWithConditional.select(`div:nth-of-type(${DIV})`, false);
  let passed = div.hasAttribute("odom-placeholder");

  const observer = new MutationObserver(async () => {
    const component = AssetWithConditional.select(`#esm-component`, false);
    passed = passed && !!component;

    if (passed) console.info("Passed");
    else console.error("Failed");
  });

  observer.observe(AssetWithConditional.scope, { childList: true, subtree: true });
  return AssetWithConditional;
};

export default assetWithConditional;

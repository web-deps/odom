import { createComponent } from "/src/main.js";

const lazy = async () => {
  const markup = /* html */ `
    <div>
      <div id="div-1"></div>
      <div id="div-2"></div>
      <div id="div-3"></div>
      <div id="div-4" odom-loading="lazy"></div>
      <div id="div-5" odom-loading='{"type": "lazy", "options": {"threshold": 0.5}}'></div>
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
  const Lazy = await createComponent(options);
  const scope = Lazy.scope;
  const DIV = 4;
  document.body.appendChild(scope);
  let div = Lazy.select(`div:nth-of-type(${DIV})`, false);
  let passed = div.hasAttribute("odom-placeholder");

  const observer = new MutationObserver(async () => {
    div = Lazy.select(`#div-${DIV}`, false);
    passed = passed && !!div;

    if (passed) console.info("Passed");
    else console.error("Failed");
  });

  observer.observe(Lazy.scope, { childList: true, subtree: true });

  return Lazy;
};

export default lazy;

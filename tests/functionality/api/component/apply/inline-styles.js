import { createComponent } from "/src/main.js";


const inlineStyles = async () => {
  const markup = /* html */`<div></div>`;

  const _inlineStyles = {
    ":scope": {
      width: "100vw",
      height: "100vh",
      color: "green"
    }
  };

  const options = { markup, inlineStyles: _inlineStyles };
  const InlineStyles = await createComponent(options);
  const scope = InlineStyles.scope;
  let passed = true;
  if (scope.style.getPropertyValue("width") !== "100vw") passed = false;

  if (passed) console.info("Passed");
  else console.error("Failed");

  return InlineStyles;
};


export default inlineStyles;
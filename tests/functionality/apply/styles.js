import { createComponent } from "/src/main.js";


const styles = async () => {
  const markup = /* html */`<div></div>`;

  const _styles = /* css */`
    :scope {
      width: 100vw;
      height: 100vh;
      color: green;
    }
  `;

  const options = { markup, styles: _styles };
  const Styles = await createComponent(options);
  const scope = Styles.scope;
  let passed = true;
  if (scope.style.getPropertyValue("width") !== "100vw") passed = false;

  if (passed) console.info("Passed");
  else console.error("Failed");

  return Styles;
};


export default styles;
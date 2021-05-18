import { createComponent } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";


const styles = async () => {
  const markup = /* html */`<div></div>`;

  const _styles = /* css */`
    :scope {
      width: 500px;
      height: 500px;
      color: green;
    }
  `;

  const options = { markup, styles: _styles };
  const Styles = await createComponent(options);
  document.body.appendChild(Styles.scope);
  const styleElementSelector = `[data-id="${Styles.id}"]`;
  let passed = !!document.head.querySelector(styleElementSelector);
  passed = passed && getComputedStyle(Styles.scope).getPropertyValue("width") === "500px";
  Styles.scope.remove();

  setTimeout(() => {
    passed = passed && !document.head.querySelector(styleElementSelector);
    logResult(passed);
  }, 0);

  return Styles;
};


export default styles;
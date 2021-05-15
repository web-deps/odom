import { createComponent } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";


const custom = async () => {
  const markup = /* html */`<div></div>`;

  const styles = /* css */`
    :scope {
      width: 100vw;
    }
  `;

  const preprocessor = async (css) => css.replace("width", "height");
  const postprocessor = async (css) => css.replace("{", "{display: block;");
  const _custom = [preprocessor, postprocessor];
  const _styles = { custom: _custom };
  const middleware = { styles: _styles };
  const options = { markup, styles, middleware };
  const Custom = await createComponent(options);
  document.body.appendChild(Custom.scope);
  console.info(document.head.querySelector(`[data-id="${Custom.id}"]`));
  console.info(Custom.scope.style.getPropertyValue("height"))

  const passed = (
    Custom.scope.style.getPropertyValue("display") === "block"
    && Custom.scope.style.getPropertyValue("height") === "100vw"
  );

  logResult(passed);

  return Custom;
};


export default custom;
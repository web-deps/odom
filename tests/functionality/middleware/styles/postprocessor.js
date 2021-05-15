import { createComponent } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";


const postprocessor = async () => {
  const markup = /* html */`<div></div>`;

  const styles = /* css */`
    :scope {
      width: 100vw;
    }
  `;

  const _postprocessor = async (css) => css.replace("width", "height");
  const _styles = { postprocessor: _postprocessor };
  const middleware = { styles: _styles };
  const options = { markup, styles, middleware };
  const Postprocessor = await createComponent(options);
  document.body.appendChild(Postprocessor.scope);
  console.info(document.head.querySelector(`[data-id="${Postprocessor.id}"]`))
  const passed = Postprocessor.scope.style.getPropertyValue("height") === "100vw";
  logResult(passed);

  return Postprocessor;
};


export default postprocessor;
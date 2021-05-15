import { createComponent } from "/src/main.js";


const defer = async () => {
  const markup = /* html */`
    <div>
      <div id="div-1" acom-loading="defer"></div>
      <div id="div-2" acom-loading='{"type": "defer", "time": 3000}'></div>
    </div>
  `;

  const styles = /* css */`
    :scope > div {
      margin: 1rem auto;
      width: 40vh;
      height: 40vh;
      background-color: green;
    }
  `;
  
  const options = { markup, styles };
  const Defer = await createComponent(options);
  const scope = Defer.scope;
  const DIV = 2;
  document.body.appendChild(scope);
  let div = Defer.select(`div:nth-of-type(${DIV})`, false);
  let passed = div.hasAttribute("acom-placeholder");

  setTimeout(async () => {
    div = Defer.select(`#div-${DIV}`, false);
    passed = passed && !div;
  }, 2000);

  setTimeout(async () => {
    div = Defer.select(`#div-${DIV}`, false);
    passed = passed && !!div;

    if (passed) console.info("Passed");
    else console.error("Failed");
  }, 4000);

  return Defer;
};


export default defer;
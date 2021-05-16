import { createComponent } from "/src/main.js";
import logResult from "../../../log-result.js";


const doubleBind = async () => {
  const markup = /* html */`
    <div>
      <h1></h1>
      <input type="text" value="::@data.text">
    </div>
  `;

  const update = (newData) => {
    h1.textContent = newData;
    return newData;
  };

  const text = {
    data: "Default",
    updates: [update]
  };
  
  const dynamic = { text };
  const data = { dynamic };
  const utils = { data };
  const options = { markup, utils };
  const DoubleBind = await createComponent(options);
  const h1 = DoubleBind.select("h1", false);
  h1.textContent = text;
  const input = DoubleBind.select("input", false);
  let passed = input.value === "Default";
  DoubleBind.dynamicData.text = "New";
  passed = input.value === "New" && h1.textContent === "New";
  input.setAttribute("value", "Newest");

  setTimeout(() => {
    passed = (
      input.value === "Newest"
      && h1.textContent === "Newest"
      && DoubleBind.dynamicData.text === "Newest"
    );
  
    logResult(passed);
  }, 0);

  document.body.appendChild(DoubleBind.scope);

  return DoubleBind;
};


export default doubleBind;
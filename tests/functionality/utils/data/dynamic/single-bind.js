import { createComponent } from "/src/main.js";
import logResult from "../../../log-result.js";


const singleBind = async () => {
  const markup = /* html */`
    <div>
      <h1></h1>
      <input type="text" value=":@data.text">
    </div>
  `;

  const text = {
    data: "Default",
    update: (newData) => {
      h1.textContent = newData;
      return newData;
    }
  };

  const dynamic = { text };
  const data = { dynamic };
  const utils = { data };
  const options = { markup, utils };
  const SingleBind = await createComponent(options);
  const h1 = await SingleBind.select("h1", false);
  const input = await SingleBind.select("input", false);
  let passed = input.value === "Default" && h1.textContent === "Default";
  SingleBind.dynamicData.text = "New";
  passed = input.value === "New" && h1.textContent === "New";
  logResult(passed);
  document.body.appendChild(SingleBind.scope);

  return SingleBind;
};


export default singleBind;
import { createComponent } from "/src/main.js";
import logResult from "../../log-result.js";


const staticData = async () => {
  const markup = /* html */`
    <div title="@data.text"></div>
  `;

  const text = "Text";
  const data = { text };
  const utils = { data };
  const options = { markup, utils };
  const StaticData = await createComponent(options);
  const passed = StaticData.scope.getAttribute("title") === "Text";
  logResult(passed);

  return StaticData;
};


export default staticData;
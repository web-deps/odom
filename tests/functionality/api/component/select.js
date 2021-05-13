import { createComponent } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js"; 


const select = async () => {
  const markup = /* html */`
    <div>
      <div></div>
    </div>
  `;

  const options = { markup };
  const Select = await createComponent(options);
  const passed = !!(await Select.select("div"));
  logResult(passed);

  return Select;
};


export default select;
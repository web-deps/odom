import { createComponent } from "/src/main.js";


const presence = async () => {
  const markup = /* html */`
    <div>
      <div id="div-1" acom-presence='{"action": "remove", "conditions": ["@data.remove"]}'></div>
      <div id="div-2" acom-presence='{"action": "remove", "conditions": [{"query": "(min-width: 800px)"}]}'></div>
      <div
        id="div-3"
        acom-presence='{"action": "remove", "conditions": ["@data.remove", {"query": "(min-width: 800px)"}]}'
      ></div>
      <div
        id="div-4"
        acom-presence='{
          "action": "remove",
          "conditions": ["@data.remove", {"query": "(min-width: 800px)", "watch": true}]
        }'
      ></div>
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

  const data = { remove: true };
  const utils = { data };
  const options = { markup, styles, utils };
  const Presence = await createComponent(options);
  const DIV = 1;
  const div = await Presence.select(`div:nth-of-type(${DIV})`, false);
  let passed;
  
  if (data.remove === true) passed = !div;
  else if (data.remove === false) passed = !!div;

  if (passed) console.info("Passed");
  else console.error("Failed");

  return Presence;
};


export default presence;
import { createComponent } from "/src/main.js";


const display = async () => {
  const markup = /* html */`
    <div>
      <div acom-display='{"value": "none", "conditions": ["@data.hide"]}'></div>
      <div acom-display='{"value": ["none", "block"], "conditions": ["@data.hide"]}'></div>
      <div acom-display='{"value": ["none", "block"], "conditions": [{"query": "(min-width: 800px)"}]}'></div>
      <div
        acom-display='{"value": ["none", "block"], "conditions": ["@data.hide", {"query": "(min-width: 800px)"}]}'
      ></div>
      <div
        acom-display='{
          "value": ["none", "block"],
          "conditions": ["@data.hide", {"query": "(min-width: 800px)", "watch": true}]
        }'
      ></div>
    </div>
  `;

  const inlineStyles = {
    ":scope > div": {
      "margin": "1rem auto",
      "width": "40vh",
      "height": "40vh",
      "background-color": "green",
      "display": "block"
    }
  };

  const data = { hide: true };
  const utils = { data };
  const options = { markup, inlineStyles, utils };
  const Display = await createComponent(options);
  const DIV = 1;
  const div = Display.select(`div:nth-of-type(${DIV})`, false);
  let passed;
  
  if (data.hide === true) passed = div.style.getPropertyValue("display") === "none";
  else if (data.hide === false) passed = div.style.getPropertyValue("display") === "block";

  if (passed) console.info("Passed");
  else console.error("Failed");

  return Display;
};


export default display;
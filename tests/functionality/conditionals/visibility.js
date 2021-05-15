import { createComponent } from "/src/main.js";


const visibility = async () => {
  const markup = /* html */`
    <div>
      <div acom-visibility='{"value": "hidden", "conditions": ["@data.hide"]}'></div>
      <div acom-visibility='{"value": ["hidden", "visible"], "conditions": ["@data.hide"]}'></div>
      <div acom-visibility='{"value": ["hidden", "visible"], "conditions": [{"query": "(min-width: 800px)"}]}'></div>
      <div
        acom-visibility='{"value": ["hidden", "visible"], "conditions": ["@data.hide", {"query": "(min-width: 800px)"}]}'
      ></div>
      <div
        acom-visibility='{
          "value": ["hidden", "visible"],
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
      "visibility": "visible"
    }
  };

  const data = { hide: true };
  const utils = { data };
  const options = { markup, inlineStyles, utils };
  const Visibility = await createComponent(options);
  const DIV = 1;
  const div = Visibility.select(`div:nth-of-type(${DIV})`, false);
  let passed;
  
  if (data.hide === true) passed = div.style.getPropertyValue("visibility") === "hidden";
  else if (data.hide === false) passed = div.style.getPropertyValue("visibility") === "visible";

  if (passed) console.info("Passed");
  else console.error("Failed");

  return Visibility;
};


export default visibility;
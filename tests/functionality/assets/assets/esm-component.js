import { createComponent } from "/src/main.js";


const ESMComponent = async () => {
  const markup = /* html */`<div id="esm-component"></div>`;
  const options = { markup };
  return createComponent(options);
};


export default ESMComponent;
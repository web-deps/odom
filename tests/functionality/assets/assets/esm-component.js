import { createComponent } from "/src/main.js";


const ESMComponent = async () => {
  const markup = /* html */`<div></div>`;
  const options = { markup };
  return createComponent(options);
};


export default ESMComponent;
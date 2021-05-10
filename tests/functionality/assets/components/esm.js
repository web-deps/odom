import ESMComponent from "../assets/esm-component.js";


const esm = async () => {
  const component = await ESMComponent();
  let passed = !!component.scope;
  
  if (passed) console.info("Passed");
  else console.error("Failed");

  return component;
};


export default esm;
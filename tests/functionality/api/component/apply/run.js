import { createComponent } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";


const run = async () => {
  const markup = /* html */`<div></div>`;

  const attributes = {
    ":scope": {
      id: "run"
    }
  };

  const classes = {
    ":scope": ["run"]
  };

  const inlineStyles = {
    ":scope": {
      width: "100vw"
    }
  };
  
  const options = { markup };
  const Run = await createComponent(options);

  await Run.apply.run({ attributes, classes, inlineStyles });
  const scope = Run.scope;

  let passed = (
    scope.getAttribute("id") === "run"
    && scope.className.includes("run")
    && scope.style.getPropertyValue("width") === "100vw"
  );

  logResult(passed);

  return Run;
};


export default run;
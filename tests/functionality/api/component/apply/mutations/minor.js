import { createComponent } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";

const minor = async () => {
  const markup = /* html */`
    <div>
      <span>Target</span>
    </div>
  `;

  const mutations = {
    "span": {
      type: "minor",
      mutator: (subject) => {
        subject.textContent = "Mutant";
        return subject;
      }
    }
  };

  const options = { markup };
  const Minor = await createComponent(options);
  await Minor.apply.mutations(mutations);
  const span = await Minor.select("span", false);

  setTimeout(() => {
    const passed = span.textContent === "Mutant";
    logResult(passed);
  }, 0);

  return Minor;
};


export default minor;
import { createComponent } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";

const major = async () => {
  const markup = /* html */`
    <div>
      <span>Target</span>
    </div>
  `;

  const mutations = {
    "span": {
      type: "major",
      preserve: {
        subtree: true,
        observers: false
      },
      mutator: (subject) => {
        subject.textContent = "Mutant";
        return subject;
      }
    }
  };

  const options = { markup };
  const Major = await createComponent(options);
  await Major.apply.mutations(mutations);
  let span = await Major.select("span", false);
  let passed = span.textContent === "Mutant";
  logResult(passed);
  return Major;
};


export default major;
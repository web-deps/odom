import { createComponent } from "/src/main.js";
import logResult from "/tests/functionality/log-result.js";

const _createComponent = async () => {
  const markup = /* html */ `
    <div>
      <span odom-text="test"></span>
    </div>
  `;

  let passed = false;

  const onIDSet = async (component) => (passed = !!component.id);
  const onScopeCreated = async (component) => (passed = passed && component.scope);
  const onAttributesSet = async (component) => (passed = passed && component.scope.getAttribute("data-test"));
  const onDynamicDataCreated = async (component) => (passed = passed && component.dynamicData.test);

  const onTransformationCompleted = async (component) => {
    passed = passed && component.scope.textContent.includes("test");
  };

  const onStylesAndEventsApplied = async (component) => {
    passed = passed && getComputedStyle(component.scope).getPropertyValue("width") === "500px";
  };

  const options = {
    markup,
    styles: `
      :scope {width: 500px;}
    `,
    attributes: {
      "data-test": "test"
    },
    utils: {
      data: {
        dynamic: {
          test: "test"
        }
      },
      texts: { test: "test" }
    },
    onIDSet,
    onScopeCreated,
    onAttributesSet,
    onDynamicDataCreated,
    onTransformationCompleted,
    onStylesAndEventsApplied
  };

  const CreateComponent = await createComponent(options);
  passed = CreateComponent.scope.tagName === "DIV";
  logResult(passed);
  return CreateComponent;
};

export default _createComponent;

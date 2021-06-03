import { parseMarkup } from "../dom/parse-markup.js";
import { select } from "../dom/select.js";
import { transform } from "./transform/transform.js";
import { apply } from "./apply/apply.js";
import { createDynamicData } from "./create-dynamic-data.js";

export class Component {
  constructor(scope) {
    if (scope) this.scope = scope;
    this.transform = transform.call(this);
    this.apply = apply.call(this);
  }

  createDynamicData = async (data) => (this.dynamicData = await createDynamicData(data));

  parseMarkup = async (markup, middleware) => {
    this.scope = await parseMarkup({ markup, middleware });
    this.scope.setAttribute("odom-scope", this.id);
    return this.scope;
  };

  render = async (element) => {
    if (typeof element === "string") element = document.querySelector(element);
    if (element) element.replaceWith(this.scope);
  };

  select = (selector, selectAll) => select(this.scope, selector, selectAll);

  setID = (id) => {
    this.id = id || String(performance.now()).replace(".", "-");
    this.selector = `[odom-scope="${this.id}"]`;
  };

  setProps = (props) => Object.assign(this, props);
}

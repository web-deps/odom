import { parseMarkup } from "./parse-markup.js";
import { select } from "./dom/select.js";
import { transform } from "./transform/transform.js";
import { apply } from "./apply/apply.js";
import { render } from "./render.js";


export class Component {
  constructor(scope) {
    if (scope) this.scope = scope;
    this.transform = transform.call(this);
    this.apply = apply.call(this);
  };

  setProps = props => Object.assign(this, props);
  select = (selector, selectAll) => select(this.scope, selector, selectAll);
  parseMarkup = async (markup, middleware) => parseMarkup.call(this, markup, middleware);
  render = async element => render.call(this, element);
};
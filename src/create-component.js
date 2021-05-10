import { Component } from "./component.js";
import { createDynamicData } from "./create-dynamic-data.js";


export const createComponent = async options => {
  if (!options) throw new Error("Missing parameter 'options'.");
  const $component = new Component();
  
  if ("src" in options) {
    try {
      options = importOptions(options);
    } catch (error) {
      console.error(`Failed to get options at ${src}.`);
      return;
    };
  };

  if ("data" in options) {
    options = { ...options, ...options.data };
    delete options.data;
  };
  
  if (options.props && "id" in options.props) delete options.props.id;
  await transform($component, options);

  return $component;
};

const importOptions = async ({ src, importType = "module", extension }) => {
  let imported;

  if (importType === "module") {
    imported = Object.values((await import(src)))[0];
    if (typeof imported === "function") imported = imported();
  } else {
    const res = await fetch(src);
    imported = res.json();
  };

  return extension ? { ...imported, ...extension } : json;
};

const transform = async (
  $component, 
  {
    id,
    props,
    markup,
    scope,
    styles,
    inlineStyles,
    eventListeners,
    classes,
    attributes,
    utils,
    middleware
  }
) => {
  if (id) $component.id = id;
  else $component.id = String(performance.now()).replace(".", "-");

  $component.selector = `[acom-scope="${$component.id}"]`;
  await $component.setProps(props);

  if (scope) $component.scope = scope;
  else if (markup) await $component.parseMarkup(markup, middleware && middleware.markup);

  $component.scope.setAttribute("acom-scope", $component.id);
  const { data: { dynamic } = {} } = utils || { data: {} };
  if (dynamic) $component.dynamicData = createDynamicData(dynamic);
  // Delete dynamic from utils.data

  attributes && await $component.apply.attributes(attributes);
  classes && await $component.apply.classes(classes);
  const promises = [];
  styles && promises.push($component.apply.styles(styles, middleware && middleware.styles));
  inlineStyles && promises.push($component.apply.inlineStyles(inlineStyles));
  eventListeners && promises.push($component.apply.eventListeners(eventListeners));
  promises.length && await Promise.all(promises);
  await $component.transform.run({ props, utils });
};
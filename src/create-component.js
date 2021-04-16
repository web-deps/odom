import { Component } from "./component.js";
import { createDynamicDataProxy } from "./create-dynamic-data-proxy.js";


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

const importOptions = async ({ src, extension }) => {
  const res = await fetch(src);
  const json = res.json();
  return extension ? { ...json, ...extension } : json;
};

const transform = async (
  $component, 
  {
    id,
    url,
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
  $component.url = url;

  if (scope) $component.scope = scope;
  else if (markup) await $component.parseMarkup(markup, middleware && middleware.markup);

  $component.scope.setAttribute("acom-scope", $component.id);
  const apply = styles || inlineStyles || eventListeners || classes || attributes;
  const { data: { dynamic } = {} } = utils || { data: {} };
  if (dynamic) $component.dynamicData = createDynamicDataProxy(dynamic);
  // Delete dynamic from utils.data

  apply && await $component.apply.run({
    styles,
    inlineStyles,
    eventListeners,
    classes,
    attributes,
    stylesMiddleware: middleware && middleware.styles,
    dynamicData: $component.dynamicData
  });

  await $component.setProps(props);
  await $component.transform.run({ props, utils });
};
import { Component } from "./component/component.js";

export const createComponent = async (options) => {
  if (!options) throw new Error("Missing parameter 'options'.");
  const $component = new Component();

  if ("src" in options) {
    try {
      options = importOptions(options);
    } catch (error) {
      console.error(`Failed to get options at ${src}.`);
      return;
    }
  }

  if (options.props && "id" in options.props) delete options.props.id;
  await initialize($component, options);

  return $component;
};

const importOptions = async ({ src, importType = "module", extension }) => {
  let imported;

  if (importType === "module") {
    imported = Object.values(await import(src))[0];
    if (typeof imported === "function") imported = imported();
  } else {
    const res = await fetch(src);
    imported = res.json();
  }

  return extension ? { ...imported, ...extension } : json;
};

const initialize = async ($component, options) => {
  const {
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
    middleware = {},
    onIDSet,
    onScopeCreated,
    onAttributesSet,
    onDynamicDataCreated,
    onTransformationCompleted,
    onStylesAndEventsApplied
  } = options;

  $component.setID(id);
  $component.setProps(props);
  onIDSet && (await onIDSet($component));

  if (scope) $component.scope = scope;
  else if (markup) await $component.parseMarkup(markup, middleware.markup);

  onScopeCreated && (await onScopeCreated($component));
  attributes && (await $component.apply.attributes(attributes));
  classes && (await $component.apply.classes(classes));
  inlineStyles && (await $component.apply.inlineStyles(inlineStyles));
  onAttributesSet && (await onAttributesSet($component));
  const { data: { dynamic } = {} } = utils || { data: {} };
  if (dynamic) await $component.createDynamicData(dynamic);
  if (dynamic) utils.data.dynamic = undefined;
  onDynamicDataCreated && (await onDynamicDataCreated($component));
  await $component.transform.run({ props, utils, dynamicData: $component.dynamicData });
  onTransformationCompleted && (await onTransformationCompleted($component));
  const promises = [];
  styles && promises.push($component.apply.styles(styles, middleware.styles));
  eventListeners && promises.push($component.apply.eventListeners(eventListeners));
  promises.length && (await Promise.all(promises));
  onStylesAndEventsApplied && (await onStylesAndEventsApplied($component));
};

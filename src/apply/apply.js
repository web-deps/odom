import { styles } from "./styles.js";
import { eventListeners } from "./event-listeners.js";
import { run } from "./run.js";
import { custom } from "./custom.js";
import { applyClasses } from "./classes.js";
import { applyAttributes } from "./attributes.js";
import { applyInlineStyles } from "./inline-styles.js";
import { applyMutations } from "./mutations.js";


export const apply = function () {
  return {
    styles: async param => styles.call(this, param),
    inlineStyles: async (map) => this.apply.custom(map, applyInlineStyles),
    eventListeners: async param => eventListeners.call(this, param),
    run: async param => await run.call(this, param),
    custom: async (data, action, options) => await custom.call(this, data, action, options),
    classes: async classEntries => await applyClasses.call(classEntries),
    attributes: async attributeEntries => await applyAttributes.call(this, attributeEntries),
    mutations: async (map) => this.apply.custom(map, applyMutations)
  };
};
import { apply } from "../../dom/apply.js";
import { run } from "./run.js";
import { insertData } from "./insert/data.js";
import { getSlots } from "./get-slots.js";
import { insertSlot } from "./insert/slot.js";
import { conditionals } from "../../conditionals/conditionals.js";
import { collections } from "./collections/collections.js";
import { getProps } from "../../dom/get-props.js";
import { render } from "../../dom/render.js";

export const transform = function () {
  return {
    insertData: async ({ props, data, methods } = {}) => {
      const skip = ["odom-multiple", "odom-map"];
      await apply(this.scope, async (element) => {
        await insertData({ element, props, data, methods, skip });
      });
    },
    insertSlots: async (slots) => {
      if (!slots) return;

      await apply(this.scope, async (element) => {
        if (!element.hasAttribute("odom-slot")) return;
        await insertSlot(element, slots[element.getAttribute("odom-slot")]);
      });
    },

    insertComponents: async ({ components, data, methods, props } = {}) => {
      await apply(
        this.scope,
        async (element) => {
          const children = element.children;
          const _props = await getProps({ element, skip: ["odom-src"], data, methods, props });
          if (children[0]) _props.slots = await getSlots(children);

          await render({
            assetType: "component",
            fileType: "module",
            target: element,
            asset: element.getAttribute("odom-src"),
            assets: components,
            props: _props
          });
        },
        "odom-src"
      );
    },

    insertNodes: async ({ nodes, data, methods, props } = {}) => {
      await apply(
        this.scope,
        async (element) => {
          await render({
            assetType: "element",
            fileType: "module",
            target: element,
            asset: element.getAttribute("odom-node"),
            assets: nodes,
            props: await getProps({ element, skip: ["odom-node"], data, methods, props })
          });
        },
        "odom-node"
      );
    },

    insertMarkup: async ({ markups, data, methods, props } = {}) => {
      await apply(
        this.scope,
        async (element) => {
          await render({
            assetType: "markup",
            fileType: element.getAttribute("odom-filetype"),
            target: element,
            asset: element.getAttribute("odom-markup"),
            assets: markups,
            props: await getProps({ element, skip: ["odom-node"], data, methods, props })
          });
        },
        "odom-markup"
      );
    },

    insertText: async ({ texts, data, methods, props } = {}) => {
      await apply(
        this.scope,
        async (element) => {
          await render({
            assetType: "text",
            fileType: element.getAttribute("odom-filetype"),
            target: element,
            asset: element.getAttribute("odom-text"),
            assets: texts,
            props: await getProps({ element, skip: ["odom-node"], data, methods, props })
          });
        },
        "odom-text"
      );
    },

    multiple: async ({ data, methods, props }) => {
      await apply(
        this.scope,
        async (element) => collections({ element, type: "multiple", props, data, methods }),
        "odom-multiple"
      );
    },

    map: async ({ data, methods, props }) => {
      await apply(
        this.scope,
        async (element) => collections({ element, type: "map", props, data, methods }),
        "odom-map"
      );
    },

    loading: async ({ props, data, methods } = {}) => {
      await apply(
        this.scope,
        async (element) =>
          conditionals.call(this, {
            element,
            type: "loading",
            options: element.getAttribute("odom-loading"),
            props,
            utils: { data, methods },
            dynamicData: this.dynamicData,
            transform: run
          }),
        "odom-loading"
      );
    },

    visibility: async ({ props, data, methods } = {}) => {
      await apply(
        this.scope,
        async (element) =>
          conditionals({
            element,
            type: "visibility",
            options: element.getAttribute("odom-visibility"),
            props,
            utils: { data, methods },
            dynamicData: this.dynamicData,
            transform: run
          }),
        "odom-visibility"
      );
    },

    display: async ({ props, data, methods } = {}) => {
      await apply(
        this.scope,
        async (element) =>
          conditionals({
            element,
            type: "display",
            options: element.getAttribute("odom-display"),
            props,
            utils: { data, methods },
            dynamicData: this.dynamicData,
            transform: run
          }),
        "odom-display"
      );
    },

    presence: async ({ props, data, methods } = {}) => {
      await apply(
        this.scope,
        async (element) =>
          conditionals({
            element,
            type: "presence",
            options: element.getAttribute("odom-presence"),
            props,
            utils: { data, methods },
            dynamicData: this.dynamicData,
            transform: run
          }),
        "odom-presence"
      );
    },

    run: async ({ props, utils, dynamicData } = {}) => {
      await apply(this.scope, async (element) => {
        this.scope = await run.call(this, { element, props, utils, dynamicData });
      });
    }
  };
};

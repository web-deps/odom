import { apply } from "../dom/apply.js";
import { run } from "./run.js";
import { insertData } from "./insert/data.js";
import { insertSlot } from "./insert/slot.js";
import { conditionals } from "../conditionals/conditionals.js";
import { collections } from "./collections/collections.js";
import { getProps } from "../dom/get-props.js";
import { render } from "../dom/render.js";


export const transform = function () {
  return {
    insertData:async ({ props, data, methods }) => {
      const skip = ["acom-markupltiple", "acom-map"];
      await apply(this.scope, async element => {
        await insertData({ element, attributes, props, data, methods, skip });
      });
    },
    insertSlot: async slots => {
      await apply(this.scope, async element => {
        await insertSlot(element, slots);
      });
    },

    insertComponents: async (components) => {
      await apply(this.scope, async element => {
        await insertComponent({ element, src, components, props });

        await render({
          assetType: "component",
          fileType: "module",
          target: element,
          asset: src,
          assets: components,
          props
        });
      });
    },

    insertElements: async (elements) => {
      await apply(
        this.scope,
        async (element) => {
          const asset = element.getAttribute("acom-node");
          const props = await getProps(element);
          
          await render({
            assetType: "element",
            fileType: "module",
            target: element,
            asset,
            assets: elements,
            props
          });
        },
        "acom-node"
      );
    },

    insertMarkups: async (markups) => {
      await apply(
        this.scope,
        async (element) => {
          const asset = element.getAttribute("acom-markup");
          const props = await getProps(element);
          
          await render({
            assetType: "markup",
            fileType: element.getAttribute("acom-filetype"),
            target: element,
            asset,
            assets: markups,
            props
          });
        },
        "acom-markup"
      );
    },

    insertTexts: async (texts) => {
      await apply(
        this.scope,
        async (element) => {
          const asset = element.getAttribute("acom-text");
          const props = await getProps(element);
          
          await render({
            assetType: "text",
            fileType: element.getAttribute("acom-filetype"),
            target: element,
            asset,
            assets: texts,
            props
          });
        },
        "acom-text"
      );
    },

    multiple: async ({ data, methods, props }) => {
      await apply(
        this.scope,
        async element => collections({ element, type: "multiple", props, data, methods }),
        "acom-markupltiple"
      );
    },

    map: async (methods) => {
      await apply(
        this.scope,
        async element => collections({ element, type: "map", props, data, methods }),
        "acom-map"
      );
    },

    loading: async ({ props, data, methods }) => {
      await apply(
        this.scope,
        async element => conditionals.call(this, {
          element,
          type: "loading",
          options: element.getAttribute("acom-loading"),
          props,
          data,
          methods
        }),
        "acom-loading"
      );
    },

    visibility: async ({ props, data, methods }) => {
      await apply(
        this.scope,
        async element => conditionals({
          element,
          type: "visibility",
          options: element.getAttribute("acom-visibility"),
          props,
          data,
          methods
        }),
        "acom-visibility"
      );
    },
    
    display: async ({ props, data, methods }) => {
      await apply(
        this.scope,
        async element => conditionals({
          element,
          type: "display",
          options: element.getAttribute("acom-display"),
          props,
          data,
          methods
        }),
        "acom-display"
      );
    },
    
    presence: async ({ props, data, methods }) => {
      await apply(
        this.scope,
        async element => conditionals({
          element,
          type: "presence",
          options: element.getAttribute("acom-presence"),
          props,
          data,
          methods
        }),
        "acom-presence"
      );
    },

    run: async ({ props, utils }) => {
      await apply(this.scope, async element => {
        this.scope = await run.call(this, {  element, props, utils });
      });
    }
  };
};
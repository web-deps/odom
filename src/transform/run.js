import { insertData } from "./insert/data.js";
import { insertSlot } from "./insert/slot.js";
import { getSlots } from "./get-slots.js";
import { getProps } from "../dom/get-props.js";
import { conditionals } from "../conditionals/conditionals.js";
import { collections } from "./collections/collections.js";
import { render } from "../dom/render.js";


export const run = async function ({ element, placeholder, props = {}, utils = {}, dynamicData }) {
  const {
    components,
    nodes,
    texts,
    markups,
    data,
    methods
  } = utils;
  let proceed = true;
  const slots = props.slots;
  const attributes = await getProps({ element, props, data, methods });
  const multiplyTypes = ["multiple", "map"];

  const multiplyElements = async type => {
    if (`acom-${type}` in attributes) {
      await collections({ element, type, props, data, methods });
      proceed = false;
    };
  };

  await Promise.all(multiplyTypes.map(type => multiplyElements(type)));

  if (!proceed) return;

  const conditionTypes = ["loading", "visibility", "display", "presence"];

  const setConditions = async type => {
    const attributeName = `acom-${type}`;
    if (attributeName in attributes) await conditionals({
      element,
      type,
      options: attributes[attributeName],
      props,
      utils,
      dynamicData,
      transform: run
    });
  };

  await Promise.all(conditionTypes.map(type => setConditions(type)));

  const assetTypeToAttributeMap = [
    ["component", "acom-src"],
    ["node", "acom-node"],
    ["markup", "acom-markup"],
    ["text", "acom-text"]
  ];

  const assetTypeToAssetsMap = {
    "component": components,
    "node": nodes,
    "markup": markups,
    "text": texts
  };

  for (const [assetType, attribute] of assetTypeToAttributeMap) {
    if (attribute in attributes) {
      await renderAsset({
        assetType,
        fileType: attributes["acom-filetype"],
        element,
        attribute,
        props: attributes,
        placeholder,
        assets: assetTypeToAssetsMap[assetType]
      });

      proceed = false;
      break;
    };
  };

  if (!proceed) return;
  
  const skip = {
    elements: [
      "acom-src",
      "acom-node",
      "acom-markup",
      "acom-text"
    ],
    attributes: [
      "acom-markupltiple",
      "acom-map"
    ]
  };

  await insertData({
    element,
    attributes,
    props,
    data,
    methods,
    dynamicData,
    skip
  });

  if (element.hasAttribute("acom-slot") && slots) return insertSlot(element, slots[element.getAttribute("acom-slot")]);
  return element;
};

const renderAsset = async ({
  assetType,
  fileType,
  element,
  attribute,
  props,
  placeholder,
  assets
}) => {
  let asset;
  const prefetchID = element.getAttribute("acom-prefetch");

  if (prefetchID) {
    asset = (
      window.$app
      && window.$app.prefetchedAssets
      && window.$app.prefetchedAssets[assetType]
      && window.$app.prefetchedAssets[assetType][prefetchID]
    );
  };

  if (!asset) asset = element.getAttribute(attribute);
  
  if (assetType === "component") {
    const children = element.children;
    if (children[0]) props.slots = await getSlots(children);
  } else if (assetType === "text" && asset.startsWith("@datum")) return;
  
  await render({
    target: element,
    assetType,
    fileType,
    asset,
    assets,
    placeholder,
    props
  });
};

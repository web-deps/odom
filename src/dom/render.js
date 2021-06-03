import { importModule } from "../asset-manager/import-module.js";
import { select } from "./select.js";
import { importComponent } from "../import-component/import-component.js";
import { parseMarkup } from "./parse-markup.js";
import { getProps } from "./get-props.js";
import { fetchAsset } from "../asset-manager/fetch-asset.js";
import { getExtension } from "../get-extension.js";

export const render = async (options = {}) => {
  let { assetType, fileType, target, asset, assets, placeholder, scope, props, replacer = replace } = options;

  if (!asset) return renderToDocument({});
  if (typeof target === "string") target = select(target, scope, false);
  if (placeholder) target.replaceWith(placeholder);

  await insert({
    assetType,
    fileType,
    target: placeholder || target,
    asset,
    assets,
    props,
    createElement: assetTypeToCreateElementMap[assetType],
    wait: true,
    replacer
  });
};

const insert = async ({ target, asset, assets, props, createElement, wait, assetType, fileType, replacer }) => {
  const insertAsset = async (asset) => {
    replacer(target, asset);
  };

  if (target && !fileType) fileType = target.getAttribute("odom-filetype");
  const getAssetParam = { asset, assets, props, assetType, fileType, createElement };

  if (wait) await insertAsset(await getAsset(getAssetParam));
  else getAsset(getAssetParam).then((asset) => insertAsset(asset));
};

const getTargets = () => {
  let targets = [];
  const assetTypes = ["component", "node", "markup", "text"];

  for (const assetType of assetTypes) {
    const attributeName = assetTypeToAttributeMap[assetType];
    const elements = document.querySelectorAll(`[${attributeName}]`);

    if (elements[0]) {
      for (const element of elements) {
        const attributeValue = element.getAttribute(attributeName);
        targets.push([assetType, element, attributeValue]);
      }
    }
  }

  return targets;
};

const assetTypeToAttributeMap = {
  component: "odom-src",
  node: "odom-node",
  markup: "odom-markup",
  text: "odom-text"
};

const assetTypeToCreateElementMap = {
  component: async ($component) => $component.scope,
  node: (node) => node,
  markup: async (markup) => parseMarkup({ markup }),
  text: (text) => document.createTextNode(text)
};

const renderToDocument = async ({ replacer = replace }) => {
  const targets = getTargets();

  for (const [assetType, target, asset] of targets) {
    await insert({
      assetType,
      fileType: target.getAttribute("odom-filetype"),
      target,
      asset,
      props: await getProps({ element: target, skip: [assetTypeToAttributeMap[assetType]] }),
      createElement: assetTypeToCreateElementMap[assetType],
      wait: true,
      replacer
    });
  }
};

const replace = (target, element) => {
  target.replaceWith(element);
};

const getAsset = async ({ asset, assets, props, assetType, fileType, createElement }) => {
  if (typeof asset === "string") {
    if (fileType && !/module|text/.test(fileType)) throw new Error(`Wrong filetype ${fileType}.`);

    if (!fileType) {
      let extension = getExtension(asset);

      if (extension) {
        if (extension && extension !== "js") fileType = "text";
        else fileType = "module";
      }
    }

    asset = await (!asset.includes("/")
      ? assets[asset]
      : assetType === "component"
      ? importComponent({ src: asset, type: fileType === "module" ? "js" : "html" })
      : fileType === "module"
      ? importModule(asset, { construct: true, props })
      : fetchAsset(asset, "text"));
  }

  if (typeof asset === "function") asset = await asset(props);
  return createElement ? createElement(asset) : asset;
};

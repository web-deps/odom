import { Component } from "./component.js";
import { createComponent } from "./create-component.js";
import { importComponent } from "./import-component.js";
import { render } from "./dom/render.js";
import { assetManager } from "./asset-manager/asset-manager.js";
import { replaceNode } from "./dom/replace-node.js";


const $create = createComponent, $A = Component;

export {
  createComponent,
  $create,
  Component,
  $A,
  importComponent,
  render,
  replaceNode,
  assetManager
};

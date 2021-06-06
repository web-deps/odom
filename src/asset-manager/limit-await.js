import { replaceNode } from "../dom/replace-node.js";

const replace = (target, node) => target.replaceWith(node);

export const limitAwait = ({ type, promise, time, placeholder, replacer = replace }) => {
  return new Promise((resolve, reject) => {
    let resolved = false;

    if (time === 0) {
      resolved = true;
      return resolve(type === "component" ? { scope: placeholder } : placeholder);
    }

    setTimeout(() => {
      if (resolved) return;
      resolved = true;
      resolve(type === "component" ? { scope: placeholder } : placeholder);
    }, time);

    promise.then((asset) => {
      if (resolved) {
        if (/component|node/.test(type)) {
          replaceNode(placeholder, asset.scope, (target, node) => {
            replacer.call(node, target, asset.scope);
          });
        } else replacer(asset);
      } else {
        resolved = true;
        resolve(asset);
      }
    });
  });
};

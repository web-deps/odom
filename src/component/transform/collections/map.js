import { parseMarkup } from "../../../dom/parse-markup.js";
import { observeMutations } from "../../../dom/observe-mutations.js";
import { getData } from "../../../get-data.js";
import { createFragment } from "./create-fragment.js";

export const map = async ({ element, props, data, methods }) => {
  const value = element.getAttribute("odom-map");
  let limits, cache, getMapData, createNode, mapDataSelector, mapData, reactive;

  if (value.startsWith("@")) mapDataSelector = value;
  else if (/^\s*\{/.test(value)) {
    const options = JSON.parse(value);
    mapDataSelector = options.data;
    limits = options.range;
    cache = options.cache;
    getMapData = options.getData;
    createNode = options.createNode;
    reactive = options.reactive;
    if (reactive === undefined) reactive = true;
  }

  if (mapDataSelector) mapData = await getData({ selector: mapDataSelector, props, data, methods });
  if (typeof mapData === "function") mapData = mapData();

  if (getMapData) {
    getMapData = await getData({ selector: getMapData, methods });
    mapData = await getMapData();
  }

  if (createNode) createNode = await getData({ selector: createNode, methods });
  const template = element.firstElementChild;
  await addFragment({ element, template, data: mapData, limits, createNode });
  if (reactive) await setReactivity({ element, template, data: mapData, cache, getMapData, createNode });
};

const addFragment = async ({ element, template, data, limits, createNode, append, prepend }) => {
  const wrapCreateNode = async (datum) => {
    let el = await createNode(datum);
    if (typeof el === "string") el = await parseMarkup({ markup: el });
    return el;
  };

  const fragment = await createFragment({ template, data, createNode: wrapCreateNode, limits });
  if (!fragment) return;

  if (append) element.append(fragment);
  else if (prepend) element.prepend(fragment);
  else {
    element.innerHTML = "";
    element.append(fragment);
  }
};

const setReactivity = async ({ element, template, data, cache, getMapData, createNode }) => {
  if (cache) await setCache(cache.id, cache.storage, data);

  const updateMap = async ({ refresh, range, extension, newData, prepend, append } = {}) => {
    if (refresh) {
      data = await getMapData();
    } else if (cache) {
      data = await getCache(cache.id, cache.storage);
    }

    if (!range) {
      const options = JSON.parse(element.getAttribute("odom-map"));
      range = options.range;
    }

    if (extension) {
      const len = element.children.length;
      range = [len + 1, len + extension];
    }

    if (newData) data = newData;
    await addFragment({ element, template, data, limits: range, createNode, append, prepend });
  };

  if (!element.odom) element.odom = {};
  element.odom.updateMap = updateMap;

  observeMutations(element, updateMap, { attributes: true, attributeFilter: ["odom-map"] });
};

const setCache = async (id, storage, data) => {
  const run = async () => {
    storage === "app"
      ? await setInApp()
      : storage === "session"
      ? await setInSession()
      : console.error(`Invalid storage type '${storage}'.`);
  };

  const setInApp = async () => {
    if (!window.$app) window.$app = {};
    if (!window.$app.cache) window.$app.cache = {};

    if (!window.$app.cache.map) {
      window.$app.cache.map = {};
      if (data) window.$app.cache.map[id] = data;
    }
  };

  const setInSession = async () => {
    let odomStorage = sessionStorage.odom;

    if (odomStorage) odomStorage = JSON.parse(sessionStorage.odom);
    else odomStorage = {};

    if (!odomStorage.cache) odomStorage.cache = {};

    if (!odomStorage.cache.map) {
      odomStorage.cache.map = {};

      if (data) {
        odomStorage.cache.map[id] = data;
        sessionStorage.odom = JSON.stringify(odomStorage);
      }
    }
  };

  await run();
};

const getCache = async (id, storage) => {
  const run = async () => {
    return storage === "app" ? window.$app.cache.map[id] : storage === "session" ? getFromSession() : null;
  };

  const getFromSession = async () => {
    const odomStorage = JSON.parse(sessionStorage.odom);
    return odomStorage.cache.map[id];
  };

  return run();
};

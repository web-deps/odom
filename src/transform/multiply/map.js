import { parseMarkup } from "../../dom/parse-markup.js";
import { observeMutations } from "../../dom/observe-mutations.js";
import { getData } from "../../get-data.js";
import { createFragment } from "./create-fragment.js";


export  const map = async ({ element, props, data, methods }) => {
  const value = element.getAttribute("acom-map");
  let limits, cache, getMapData, createNode, mapDataSelector, mapData, refresh, reactive;

  if (value.startsWith("@")) mapDataSelector = value;
  else if (value.startsWith("{")) {
    const options = JSON.parse(value);
    mapDataSelector = options.data;
    limits = options.range;
    cache = options.cache;
    getMapData = options.getData;
    createNode = options.createNode;
    refresh = options.refresh;
    reactive = options.reactive;
    if (reactive === undefined) reactive = true;
  };

  if (mapDataSelector) mapData = await getData({ selector: mapDataSelector, props, data, methods });

  if (getMapData) {
    getMapData = await getData({ selector: getMapData, methods });
    mapData = await getMapData();
  };
  
  if (createNode) createNode = await getData({ selector: createNode, methods });
  const template = element.firstElementChild;
  await addFragment({ element, template, data: mapData, limits, createNode });
  if (reactive) await setReactivity({ element, template, data: mapData, cache, getMapData, refresh, createNode });
};

const addFragment = async ({ element, template, data, limits, createNode, append, prepend }) => {
  const wrapCreateNode = async datum => {
    let el = await createNode(datum);
    if (typeof el === "string") el = await parseMarkup({ markup: el });
    return el;
  };

  const fragment = await createFragment({ template, data, createNode: wrapCreateNode, limits });
  if (!fragment) return;

  
  if (append) element.append(fragment);
  else if(prepend) element.prepend(fragment);
  else {
    element.innerHTML = "";
    element.append(fragment);
  };
};

const setReactivity = async ({ element, template, data, cache, refresh, getMapData, createNode }) => {
  if (cache) await setCache(cache.id, cache.storage, data);

  const updateMap = async ({ range, extension, newData, prepend, append } = {}) => {
    if (!range) {
      const options = JSON.parse(element.getAttribute("acom-map"));
      range = options.range;
    };

    if (extension) {
      const len = element.children.length;
      range = [len + 1, len + extension];
    };

    if (refresh) {
      data = await getMapData();
    } else if (cache) {
      data = await getCache(cache.id, cache.storage);
    };


    if (newData) data = newData;
    await addFragment({ element, template, data, limits: range, createNode, append, prepend });
  };

  if (!element.acom) element.acom = {};
  element.acom.updateMap = updateMap;

  observeMutations(
    element,
    updateMap,
    { attributes: true, attributeFilter: ["acom-map"] }
  );
};

const setCache = async (id, storage, data) => {
  const run = async () => {
    storage === "app" ? await setInApp()
    : storage === "session" ? await setInSession()
    : console.error(`Invalid storage type '${storage}'.`)
  };

  const setInApp = async () => {
    if (!window.$app) window.$app = {};
    if (!window.$app.cache) window.$app.cache = {};

    if (!window.$app.cache.map) {
      window.$app.cache.map = {};
      if (data) window.$app.cache.map[id] = data;
    };
  };
  
  const setInSession = async () => {
    let acomStorage = sessionStorage.acom;
  
    if (acomStorage) acomStorage = JSON.parse(sessionStorage.acom);
    else acomStorage = {};
  
    if (!acomStorage.cache) acomStorage.cache = {};

    if (!acomStorage.cache.map) {
      acomStorage.cache.map = {};
  
      if (data) {
        acomStorage.cache.map[id] = data;
        sessionStorage.acom = JSON.stringify(acomStorage);
      };
    };
  };

  await run();
};

const getCache = async (id, storage) => {
  const run = async () => {
    return (
      storage === "app" ? window.$app.cache.map[id]
      : storage === "session" ? getFromSession()
      : null
    );
  };

  const getFromSession = async () => {
    const acomStorage = JSON.parse(sessionStorage.acom);
    return acomStorage.cache.map[id];
  };

  return run();
};
import doubleBind from "./data/dynamic/double-bind.js";
import singleBind from "./data/dynamic/single-bind.js";
import staticData from "./data/static.js";
import components from "./components.js";
import markups from "./markups.js";
import nodes from "./nodes.js";
import texts from "./texts.js";


export default {
  components,
  data: {
    dynamic: { doubleBind, singleBind },
    static: staticData
  },
  markups,
  nodes,
  texts
};
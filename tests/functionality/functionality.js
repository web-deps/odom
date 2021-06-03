import api from "./api/api.js";
import assets from "./assets/assets.js";
import collections from "./collections/collections.js";
import conditionals from "./conditionals/conditionals.js";
import utils from "./utils/utils.js";
import attributes from "./attributes/attributes.js";
import middleware from "./middleware/middleware.js";

// Tests for the API
// createComponent
// api.createComponent();

// Component
// apply
// api.component.apply.attributes();
// api.component.apply.classes();
// api.component.apply.custom();
// api.component.apply.eventListeners();
// api.component.apply.inlineStyles();
// api.component.apply.mutations.major();
// api.component.apply.mutations.minor();
// api.component.apply.run();
// api.component.apply.styles();

// parseMarkup
// api.component.parseMarkup();

// render
// api.component.render();

// select
// api.component.select();

// setProps
// api.component.setProps();

// transform
// api.component.transform.display();
// api.component.transform.insertComponents();
// api.component.transform.insertData();
// api.component.transform.insertMarkup();
// api.component.transform.insertNodes();
// api.component.transform.insertSlots();
// api.component.transform.insertText();
// api.component.transform.loading();
// api.component.transform.map();
// api.component.transform.multiple();
// api.component.transform.presence();
// api.component.transform.run();
// api.component.transform.visibility();

// importComponent
// api.importComponent();

// render
// api.render();

// replaceNode
// api.replaceNode();

// Tests for assetManager
// api.assetManager.fetchAsset();
// api.assetManager.importModule();
// api.assetManager.limitAwait();
// api.assetManager.prefetch();

// Tests for assets
// assets.components.esm();
// assets.components.html();
// assets.markup();
// assets.node();
// assets.text();

// Tests for collections
// collections.map();
// collections.multiple();

// Tests for Conditionals
// conditionals.display();
// conditionals.loading.defer();
// conditionals.loading.lazy();
// conditionals.presence();
// conditionals.visibility();

// Tests for Utils
// utils.components();
// utils.data.dynamic.doubleBind();
utils.data.dynamic.singleBind();
// utils.data.static();
// utils.markups();
// utils.nodes();
// utils.texts();

// Tests for Attributes
// attributes.assetWithConditional();

// Tests for middleware
// markup
// middleware.markup.converter();
// middleware.markup.custom();
// middleware.markup.parser();

// styles
// middleware.styles.custom();
// middleware.styles.postprocessor();
// middleware.styles.preprocessor();

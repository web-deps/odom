# Assets

__Table of Contents__

- [Assets](#assets)
  - [Introduction](#introduction)
  - [Types of Assets](#types-of-assets)
    - [Introduction](#introduction-1)
    - [Components](#components)
    - [Nodes](#nodes)
    - [Markup](#markup)
    - [Text](#text)
  - [Using Assets](#using-assets)
    - [Introduction](#introduction-2)
    - [Constructor](#constructor)
    - [Target Elements](#target-elements)
    - [Importing](#importing)
      - [Introduction](#introduction-3)
      - [Static Imports](#static-imports)
      - [Dynamic Imports](#dynamic-imports)
      - [Using Imports](#using-imports)
    - [Using URIs](#using-uris)

## Introduction

A component may depend on external assets such as other components and nodes. We are going to look at these assets and how they can be used in a component. There are two ways in which external assets can find their way into a component. One way is by importing them into a JavaScript module and the other is by referencing them via markup.

## Types of Assets

### Introduction

In Acom, there are four types of assets, components, nodes, markup and text. In the following sections, we will look at how you can use each one of these types of assets.

### Components

Components are the main assets in Acom. Components can be created in JS scripts, ES6 modules and HTML files. For more infomation on how to create and use component refer to [Components](./components.md).

### Nodes

DOM nodes can be created in various ways including Vanilla Javascript, libraries and frameworks. Howsoever you create a node, you might want to use or reuse the node in a component which is in the same file or another file. Acom provides a way to do so. You can create a node and use it as is, or you can create a function that takes props as arguments and returns a node.

### Markup

Acom allows you to create markup and insert it in the DOM. The markup is parsed before inserted into the DOM. Markup can be created the same way [`nodes`](#nodes) are created. Either use it directly or create a function that returns markup. In Acom, markup can be HTML, XML or any XML based markup. Acom has built-in support for HTML and XML. If you use any markup that is not HTML or XML-compliant, you can use [`middleware`](./api/create-component/middleware.md) to precess the markup. External markup can be created in HTML files, XML files, ES6 modules or any text file. Refer to [Using Assets](#using-assets) to see how you can use markup as an asset.

### Text

Just like markup, text can also be inserted dynamically into the DOM. External text can be in any text file. Text is converted to text nodes before being inserted into the DOM.

## Using Assets

### Introduction

Assets are inserted into the DOM using target nodes. Target nodes are nodes that are replaced by data or external assets. Target nodes use special attributes to indicate what kind of asset or data is supposed to replace them. All assets are converted to DOM nodes before they are inserted into the DOM.

### Constructor

A constructor is any function that returns a promise that resolves to an asset. Constructors can be used in all of the aforementioned types of assets.

### Target Elements

Target elements are DOM elements that are mearnt to be replaced by assets. Any element with one of the following attributes is a target element:

- acom-src
- acom-node
- acom-markup
- acom-text

Refer to [Using Imports](#using-imports) to find out which asset each one of these attributes correspond to.

### Importing

#### Introduction

Assets can be imported statically or dynamically. Static imports are done via the ES6 static `import` statement. Dynamic imports are done via ES6 dynamic `import` statement or using `importComponent`.

#### Static Imports

Static imports work for all kinds of assets execpt HTML single file components. Only assets in modules can be imported this way.

__Example__

```javascript
import { home } from "/src/components/pages/home.js";
```

#### Dynamic Imports

__Description__

ES6 dynamic imports work for all kinds of assets except HTML single file components. Single file components, whether HTML or JS, can be imported with `importComponent`. It is used the same way ES6 dynamic imports are used.

__Example__

_Using import_:

```javascript
const home = await import("/src/components/pages/home.js");
```

_Using importComponent_:

```javascript
const home = await importComponent("/src/components/pages/home.html");
```

#### Using Imports

All imports can be used via [`utils`](./api/create-component/utils.md). The assets are put in `utils` and then referenced in the DOM via the special attributes. The table below shows assets and the corresponding collection in `utils`.

Asset     | Value
----------|-----------
component | `components`
node      | `nodes`
markup    | `markups`
text      | `texts`

__Example__:

If you have imported a component and put in in `utils.components` under the property name "home", you can reference it as follows:

```html
<div acom-src="home">
```

### Using URIs

Assets can be inserted into the DOM using special attributes. All of these attributes are prefixed with `acom`. The table below shows attributes and the kind of assets they reference.

Asset     | Attribute
----------|-----------
component | `acom-src`
node      | `acom-node`
markup    | `acom-markup`
text      | `acom-text`

In the markup, you provide the URI of the asset as the value of the attribute. Some assets may require additional attributes on target nodes.

__Example__:

```html
<div acom-node="/src/components/pages/home.js">
```

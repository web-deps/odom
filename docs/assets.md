# Assets

**Table of Contents**

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
    - [Using URLs](#using-urls)

## Introduction

An app may depend on assets such as components and nodes. A component may depend on other components and nodes. We are going to look at these assets and how they can be used in an app and at component level. There are two ways in which assets can find their way into the DOM. One way is by importing them into a JavaScript module and insert them into the DOM and the other is by referencing them directly from the DOM.

## Types of Assets

### Introduction

In Odom, there are four types of assets; components, nodes, markup and text. In the following sections, we will look at how you can use each one of these types of assets.

### Components

Components are the main assets in Odom. Components can be created in JS scripts, ES modules and HTML files. For more information on how to create and use component refer to [Components](./components.md).

### Nodes

DOM nodes can be created in various ways using Vanilla Javascript, libraries and frameworks. You can create a node and use it as is, or you can create a function that takes props as arguments and returns a node.

### Markup

Odom allows you to create markup and insert it in the DOM. The markup is parsed before inserted into the DOM. Markup can be created the same way [`nodes`](#nodes) are created. Either use it directly or create a function that returns markup. In Odom, markup can be HTML, XML or any XML-compliant markup. Odom has built-in support for HTML and XML. If you use any markup that is not HTML, you can use [`middleware`](./api/create-component/middleware.md) to precess the markup. External markup can be created in HTML files, XML files, ES6 modules or any text file. Refer to [Using Assets](#using-assets) to see how you can use markup as an asset.

### Text

Just like markup, text can also be inserted dynamically into the DOM. External text can be in any text file. Text is converted to text nodes before it is inserted into the DOM.

## Using Assets

### Introduction

Assets are inserted into the DOM using target nodes. [Target elements](#target-elements) are elements that are replaced by assets.

### Constructor

A constructor is any function that returns a promise that resolves to an asset. Constructors can be used in all of the aforementioned types of assets.

### Target Elements

Target elements are DOM elements that are meant to be replaced by assets. Any element with one of the following attributes is a target element:

- odom-src
- odom-node
- odom-markup
- odom-text

Refer to [Using Imports](#using-imports) to find out which asset each one of these attributes correspond to.

### Importing

#### Introduction

Assets can be imported statically or dynamically. Static imports are done via the ES6 static `import` statement. Dynamic imports are done via ES6 dynamic `import` statement or using [`importComponent`](./api/api.md#importcomponent).

#### Static Imports

Static imports work for all kinds of assets except HTML single-file components. Only assets in modules can be imported this way.

**Example**

```javascript
import { home } from "/src/components/pages/home.js";
```

#### Dynamic Imports

**Description**

ES6 dynamic imports work for all kinds of assets except HTML single-file components. Single-file components, whether HTML or JS, can be imported with `importComponent`. It is used the same way ES6 dynamic imports are used.

**Example**

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

| Asset     | Value        |
| --------- | ------------ |
| component | `components` |
| node      | `nodes`      |
| markup    | `markups`    |
| text      | `texts`      |

**Example**:

If you have imported a component and put in in `utils.components` under the property name "home", you can reference it as follows:

```html
<div odom-src="home">
```

### Using URLs

Assets can be inserted into the DOM using special attributes. All of these attributes are prefixed with `odom`. The table below shows attributes and the kind of assets they reference.

| Asset     | Attribute     |
| --------- | ------------- |
| component | `odom-src`    |
| node      | `odom-node`   |
| markup    | `odom-markup` |
| text      | `odom-text`   |

In the markup, you provide the URL of the asset as the value of the attribute. Some assets may require additional attributes on target nodes.

**Example**:

```html
<div odom-node="/src/components/pages/home.js">
```

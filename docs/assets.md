# Assets

__Table of Contents__

- [Assets](#assets)
  - [Introduction](#introduction)
  - [Components](#components)
  - [Elements](#elements)
  - [Markup](#markup)
  - [Text](#text)
  - [Using Assets](#using-assets)
    - [Importing](#importing)
      - [Introduction](#introduction-1)
      - [Static Imports](#static-imports)
      - [Dynamic Imports](#dynamic-imports)
      - [Using Imports](#using-imports)
    - [Using URIs](#using-uris)

## Introduction

A component may depend on external assets such as other components and elements. We are going to look at these assets and how they can be used in a component. There are two ways in which external assets can find their way into a component. One way is by importing them and the other is by referencing them via markup.


## Components

Components are the main assets in Acom. Components can be created in JS scripts, ES6 modules and HTML files. For more infomation on how to create and use component refer to [Components](components.md).

## Elements

Elements can be created in various ways including Vanilla Javascript, libraries and frameworks. Howsoever you create an element, you might want to use or reuse the element in a component which is in the same file or another file. Acom provides a way to do so. You can create an element and use it as is, or you can create a function that takes props as arguments and returns an element.

## Markup

Acom allows you to create markup and insert it in the DOM. The markup is parsed before inserted into the DOM. Markup can be created the same way elements. Either use it directly or create a function that returns markup. In Acom, markup can be HTML, XML or any XML based markup. Acom has built-in support for HTML and XML. Using other types of markup, require middleware. External markup can be created in HTML files, XML files, ES6 modules or any text file. Refer to [Using Assets](#60-using-assets) to see how you can use markup as an asset in a component.

## Text

Just like markup, text can also be inserted dynamically into the DOM. External text can be in any text file.

## Using Assets

Assets are inserted into the DOM using target elements. Target elements are elements that are replaced by data or external assets. Target elements use special attributes to indicate what kind of asset or data is supposed to replace them. All assets are converted to DOM nodes before they are inserted into the DOM.

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

Example

`import`:

```javascript
const home = await import("/src/components/pages/home.js");
```

`importComponent`:

```javascript
const home = await importComponent("/src/components/pages/home.html");
```

#### Using Imports

All imports can be used via `options.utils`. The assets are put in `options.utils` and then referenced in the DOM via the special attributes. The table below shows assets and the corresponding value in `options.utils`.

Asset     | Value
----------|-----------
component | `components`
element   | `elements`
markup    | `markups`
text      | `texts`

Example:

If you have imported a component and put in in `options.utils.components`, you can reference it as follows:

```html
<div acom-src="home">
```


### Using URIs

Assets can be inserted into the DOM using special attributes. All of these attributes are prefixed with `acom-`. The table below shows attributes and the kind of assets they reference.

Asset     | Attribute
----------|-----------
component | `acom-src`
element   | `acom-node`
markup    | `acom-markup`
text      | `acom-text`

In the markup, you provide the URI of the asset as the value of the attribute. Some assets may require additional attributes on target elements.

Example:

```html
<div acom-src="/src/components/pages/home.html">
```

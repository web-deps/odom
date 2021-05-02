# `createComponent`

__Table of Contents__:

- [`createComponent`](#createcomponent)
  - [Introduction](#introduction)
  - [Syntax](#syntax)
  - [Parameters](#parameters)
  - [Return Value](#return-value)
  - [`options`](#options)
    - [Description](#description)
    - [Structure](#structure)
    - [`data`](#data)
    - [`eventListeners`](#eventlisteners)
    - [`extension`](#extension)
    - [`id`](#id)
    - [`importType`](#importtype)
    - [`inlineStyles`](#inlinestyles)
    - [`markup`](#markup)
    - [`middleware`](#middleware)
    - [`props`](#props)
    - [`scope`](#scope)
    - [`src`](#src)
    - [`styles`](#styles)
    - [`utils`](#utils)

## Introduction

Components can be created using `createComponent`, a method of the [API](../api.md). The method creates and transforms a component using [`options`](#options). The method has an alias `$create` which available in the API.

## Syntax

```js
createComponent(options);
```

## Parameters

- `options`
  - Type: `Object`
  - Required: Yes
  - Usage: contains utilities for manipulating a component
  - Reference: [`options`](#options)

> __Note:__ If you create a component directly using [`Component`](./component/component.md), you have to manipulate the component on your own using the [`API`](./component/component.md#api).

## Return Value

A promise that resolves to an instance of [`Component`](#component).

## `options`

### Description

The options contains utilities that are used to create and manipulate a component.

### Structure

```js
{
  data: Object,
  eventListeners: Array<Object>,
  extension: Object,
  id: string,
  importType: string,
  inlineStyles: Object,
  markup: string,
  middleware: Object,
  props: Object,
  scope: Element,
  src: string,
  styles: string | HTMLStyleElement,
  utils: Object
}
```

### `data`

Used for HTML components. The creator gets `data` as a parameter and put it in the options. This can also be user defined, used to assign custom element and props to a component.

```js
{
  id: String,
  uri: String,
  props: Object,
  scope: Element | document,
  styles: String | HTMLStyleElement
}
```

The attributes `id`, `uri`, `props`, `styles` work the same way as the attributes of the `options`.

`scope`

Used for HTML components and can also be user defined. This ends up being the `scope` of a component accessed via `Component.scope`.

### `eventListeners`

eventListeners can be attached to the DOM via `eventListeners`. This has the following structure:

```js
{
  type: String,
  listerner: Function,
  useCapture: Boolean,
  wantsUntrusted: Boolean,
  options: Object
}
```

The attributes of `eventListeners` are the [parameters](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters) of [`addEventLister`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). Let us look at what each one of the attributes mean.

`type`

This is the type of the event e.g `click`. This can be any valid JavaScript event type. In `addEventListener`, this is the first parameter.

`listener`

The event listener. It is a function that is called everytime an event to which it listens is fired. This is the second parameter of `addEventListener`.

`useCaptrue`

`wantsUntrusted`


`options`

```js
{
  capture: Boolean,
  once: Boolean,
  passive: Boolean,
  mozSytemGroup: Boolean
}
```

`capture`

`once`

`passive`

`mozSytemGroup`

### `extension`

This is used when the `options` are being imported. It is an extension of the imported `options`.

### `id`

The ID of the component. For HTML components, `id` is set via the meta tag. Set the id property of a meta tag to the ID of the component. For JS components, the id is set via `options`. If not provided, it is generated. The `id` is used to provide a unique class for style elements of components and for caching. The id must be unique.

### `importType`

The type of imported `options`. It have any of the following values:

- `"module"`: a JavaScript (ESM) module
- `"json"`: a JSON file or string. The JSON is fetched and the response is read to completion as JSON.

The default value is `"module"`. If the imported module is a function, the function is invoked and the return value will be used as the imported `options`.

### `inlineStyles`



### `markup`

The markup used to construct the DOM of a component. The markup can be HTML, XML or any XML-compliant markup. For types of markup other than HTML, the root element of the markup must have the attribute `acom-ml="xml"`. The attribute is not required for HTML, but it is permitted, in which case you set it to `html`.

For all non-HTML markup, all elements are converted to the `div` element of HTML by default. To specify which HTML element should be used in place of an element, you set the attribute `html` to the HTML element tag name. All other attributes on the element will be preserved. An attribute `xml` is set to the XML tag name during conversion from XML to HTML.

__Example__:

The following markup flavours will result in the same DOM elements, except for extra attribute "xml" on the XML based one.

HTML

```html
<main acom-ml="html">
  <a href="/example">visit</a>
</main>
```

XML

```xml
<container acom-ml="xml" html="main">
  <link html="a" href="/example">Visit</link>
</container>
```

HTML Equivalent

```html
<main acom-ml="xml" xml="container">
  <a href="/example" xml="link">Visit</button>
</main>
```

### `middleware`

middleware are used to manipulate [`markup`](#markup) and [`styles`](#styles), and add state to a component. Refer to [middleware](middleware.md).

### `props`

Contains data that define a component. The data can be inserted into the DOM via the data selector `@props`. All data (except any value with the property named 'id') is going to be added to the properties of [`Component`](../../component/component.md).

### `scope`

An `Element` used for the DOM of the component. It is required if `markup` is not included in `options`.

### `src`

You can import options via this property. You provide a URI of either an ES module or JSON file.

### `styles`

The styling for the content is specified via `styles`. This can be a `string` containing CSS or a style `Element`. The `style` element must be part of the document for it to work.

### `utils`

This is an object containing the utilities of a component. Refer to [Utils](./utils.md) for more.

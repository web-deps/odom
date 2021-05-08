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
      - [Description](#description-1)
      - [Structure](#structure-1)
      - [Event Object Properties](#event-object-properties)
      - [Example](#example)
    - [`extension`](#extension)
    - [`id`](#id)
    - [`importType`](#importtype)
    - [`inlineStyles`](#inlinestyles)
      - [Description](#description-2)
      - [Structure](#structure-2)
      - [Example](#example-1)
    - [`markup`](#markup)
    - [`middleware`](#middleware)
    - [`mutations`](#mutations)
      - [`mutator`](#mutator)
      - [`preserve`](#preserve)
      - [`type`](#type)
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
  - Usage: Contains utilities for manipulating a component
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
  mutations: Object,
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

#### Description

Used to specify event listeners you want to apply to a component. 

#### Structure

A map of CSS selectors and event types is used to specify the event listeners. Each property of the map is a CSS selector that is used to select elements in a component. Each value is an array of objects that are used to specify the type of event to listen to and other options. The objects have the following structure:

```js
{
  type: String,
  listener: Function,
  useCapture: Boolean,
  wantsUntrusted: Boolean,
  options: Object
}
```

The attributes of `eventListeners` are the [parameters](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters) of [`addEventLister`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). Let us look at what each one of the attributes mean.

#### Event Object Properties

Let us look at what each each one of the properties of the event objects.

`type`

- Type: `string`
- Required: Yes.
- Usage: Indicates the type of the event e.g `click`. This can be any valid JavaScript event type.

`listener`

The event listener. It is a function that is called everytime an event to which it listens is fired.

__Syntax__:

```js
listener(event, component)
```

__Parameters__:

- `event`:
  - Type: `Event`
  - Required: Yes.
  - Usage: The event object.
- `component`:
  - Type: `Object`
  - Required: No.
  - Usage: It is the component on which `eventListeners` are applied.

__Return Value__:

A promise that resolves to `undefined`.

`useCaptrue`

- Type: `Boolean`
- Required: No.
- Usage: Indicates whether the event will be dispatched to the registered `listener` before being dispatched to any `EventTarget` beneath it in the DOM tree.

`wantsUntrusted`

- Type: `Boolean`
- Required: No.
- Usage: It is a Firefox (Gecko)-specific parameter. If true, the `listener` receives synthetic events dispatched by web content (the default is false for browser chrome and true for regular web pages).

`options`

__Structure__:

```js
{
  capture: Boolean,
  once: Boolean,
  passive: Boolean,
  mozSytemGroup: Boolean
}
```

__Properties__:

- `capture`: 
  - Type: `Boolean`
  - Required: No.
  - Usage: Indicates that events of this type will be dispatched to the registered listener before being dispatched to any `EventTarget` beneath it in the DOM tree.
- `once`:
  - TYpe: `Boolean`
  - Required: No.
  - Usage: Indicates that the listener should be invoked at most once after being added. If true, the listener would be automatically removed when invoked.
- `passive`:
  - Type: `Boolean`
  - Required: No.
  - Usage:  Indicates that the function specified by `listener` will never call `preventDefault()`. If a passive listener does call `preventDefault()`, the user agent will do nothing other than generate a console warning.
- `mozSytemGroup`:
  - Type: `Boolean`
  - Required: No.
  - Usage: Indicates whether the `listener` should be added to the system group. Available only in code running in XBL or in the chrome of the Firefox browser.

#### Example

Let us look at how we can apply event listeners to a component by applying a click event in a button element of a component.

```js
{
  "button": [
    {
      type: "click",
      listener: () => alert("Button clicked!")
    }
  ]
}
```

The button element in the component will be selected and the `listener` will be applied for the `click` event. When you click the button, an alert will pop up with the message "Button clicked!".

> __Note__: <br />
> Acom uses event delegation to apply event listeners. All event listeners are attached to [`scope`](#scope). So, `event.currentTarget` always refers to `scope`.

### `extension`

This is used when the `options` are being imported. It is an extension of the imported `options`.

### `id`

The ID of the component. For HTML components, `id` is set via the meta tag. Set the id property of a meta tag to the ID of the component. For JS components, the id is set via `options`. If not provided, it is generated. The `id` is used to provide a unique class for style elements of components and for caching. The id must be unique.

### `importType`

The type of imported `options`. It have any of the following values:

- `"module"`: A JavaScript (ESM) module.
- `"json"`: A JSON file or string. The JSON is fetched and the response is read to completion as JSON.

The default value is `"module"`. If the imported module is a function, the function is invoked and the return value will be used as the imported `options`.

### `inlineStyles`

#### Description

The inline styles that you want to apply to a component.

#### Structure

You specify the inline styles using a map of CSS selectors and the styles you want to apply. The properties of the map are CSS selectors and each value is an object containing key value pairs of CSS properties and values.

#### Example

Let us look at an example on how we can apply inline styles to elements in a component. We will use a map with the following structure:

```js
{
  ".main-content": {
    "width": 50vw;
    "min-height": 60vh;
  }
}
```

This will select the element with the class `main-content` and make its width half of the viewport width and its height 60% of the viewport height.

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

Used to provide utilities that are used to manipulate [`markup`](#markup) and [`styles`](#styles), and add state to a component. Refer to [middleware](middleware.md).

### `mutations`

Used to apply mutations to a component. It is an object that maps CSS selectors to options for mutating. Each property in the object is a CSS selector for elements you want to apply mutations to. The corresponding values are options for mutating the selected elements. The options object has the following structure:

```js
{
  mutator: Function,
  preserve: Object,
  type: string
}
```

#### `mutator`

Used to apply mutations to elements. Refer to [`mutations`](../component/apply.md#mutations) for more details.

#### `preserve`

Indicates which parts of an element should be kept after cloning. Refer to [`mutations`](../component/apply.md#mutations) for more details.

#### `type`

Indicates the type of mutation you want to apply. Refer to [`mutations`](../component/apply.md#mutations) for more details.

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

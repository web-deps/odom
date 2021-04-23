# options

__Table of Contents__

- [options](#options)
  - [Introduction](#introduction)
  - [Structure](#structure)
  - [`src`](#src)
  - [`id`](#id)
  - [`uri`](#uri)
  - [`markup`](#markup)
  - [`styles`](#styles)
  - [`eventListeners`](#eventlisteners)
  - [`data`](#data)
  - [`utils`](#utils)
  - [`middleware`](#middleware)


## Introduction

One of the possible parameters of `acom` is a `options`. The options contains attributes that are used to create a component. 

## Structure

The `options` has the following structure:

```js
{
  src: String,
  id: String,
  uri: String,
  props: Object,
  markup: String,
  styles: String | HTMLStyleElement,
  eventListeners: Array<Object>,
  data: Object,
  utils: Object,
  middleware: Object
}
```

## `src`

You can import a options via this attribute. You provide a URI of either an ES module or JSON file.

## `id`

The ID of the component. For HTML components, `id` is set via the meta tag. Set the id property of a meta tag to the ID of the component. For JS components, the id is set via the `options`. If not provided, it is generated. The `id` is used to provide a unique class for style elements of components and for caching. The id must be unique.

## `uri`

The URI of a component. Used for caching.

## `markup`

The markup used to construct the DOM of a component is specified in `markup`. The markup can be HTML, XML or any XML-compliant markup. For types of markup other than HTML, the markup have some details to indicate this. The root element of the markup must have the attribute `acom-ml="xml"`. The attribute is not required for HTML, but it is permitted, in which case you set it to `html`. For all non-HTML markup, all elements are converted to the `div` element of HTML by default. To specify which HTML element should be used in place of an element, you set the attribute `html` to the HTML element tag name. All other attributes on the element will be preserved.

One or two more attributes will be added on the resulting HTML element. An attribute `xml` will be set to the XML tag name. If the elment does not have the `name` attribute, `name` will be set to the XML tag name. The attribute `html` will be removed.

__Example__

The following markup flavours will result in the same DOM elements, except for extra one or two attributes on the XML based one.

HTML

```html
<main acom-ml="html">
  <button name="say-hello">Say Hello</button>
</main>
```

XML

```xml
<container acom-ml="xml" html="main">
  <btn html="button" name="say-hello">Say Hello</btn>
</container>
```

HTML Equivalent

```html
<main acom-ml="xml" name="container" xml="container">
  <button name="say-hello" xml="btn">Say Hello</button>
</main>
```

## `styles`

The styling for the content is specified via `styles`. This can be a `string` containing CSS or a style `Element`. The `style` element must be part of the document for it to work.

## `eventListeners`

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


## `data`

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

## `utils`

This is an object containing the utilities of a component. Refer to [Utils]() for more.

## `middleware`

middleware are used to manipulate [`markup`](#markup) and [`styles`](#styles), and add state to a component. Check out [middleware](middleware.md).




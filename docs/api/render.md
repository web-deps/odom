# render

## Introduction

The render function is one of the methods of the [`API`](./api.md). It is used to render assets to the DOM. An asset can be a component, DOM node, markup or text. For a component, the scope to the component will be rendered. For markup, the markup is converted to a DOM element. For text, the text is converted to a text node.

## Syntax

```js
render([options]);
```

## Parameters

###  `options`

* Type: Object
* Required: No
* Usage: contains options for rendering assets


#### Structure:
```js
{
  assetType: string,
  fileType: string,
  target: Element,
  asset: string | Element,
  assets: Array,
  placeholder: Element,
  scope: Element,
  props: Object,
  replacer: Function
}
```

`assetType`:

The type of asset to be rendered. It's value can be "component", "element", "markup" or "text". All assets that are not DOM nodes will be converted to DOM nodes before they are rendered. THis property is required.


`fileType`:

The type of file containing the asset. The default value is "module", but it can also be set to "text". This property is considered only when [`asset`]() is a URI.

`target`:

The element that the asset is going to replace when rendered.

`asset`:



`assets`:

`placeholder`:

`scope`:

`props`:

`replacer`:

## Return Value

A promise that resolves to `undefined`.
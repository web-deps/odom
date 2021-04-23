# render

## Introduction

The render function is one of the methods of the [`API`](./api.md). It is used to render assets to the DOM. An asset can be a component, DOM node, markup or text. For a component, the [`Component.scope`](../component/component.md#scope) of the component will be rendered. For markup, the markup is converted to an `Element`. For text, the text is converted to a `TextNode`.

## Syntax

```js
render([options]);
```

## Parameters

###  `options`

* Type: Object
* Required: No
* Usage: contains options for rendering assets
* Reference: [`options`](#options)

## Return Value

A promise that resolves to `undefined`.

## `options`

## Structure:
```js
{
  assetType: string,
  fileType: string,
  target: Node | string,
  asset: Node | string | Function | Object,
  assets: Object,
  placeholder: Element,
  scope: Element,
  props: Object,
  replacer: Function
}
```

### `assetType`

The type of asset to be rendered. All assets that are not DOM nodes will be converted to DOM nodes before they are rendered. It can have any or the following values:

* `"component"`: a [`Component`](../component/component.md)
* `"node"`: a DOM `Node`
* `"markup"`: HTML or XML markup
* `"text"`: any text content


### `fileType`

The type of file containing the asset. This property is considered only when [`asset`](#asset) is a URI. It can be set to any of the following values:

* `"module"`: a JavaScript module (ESM)
* `"text"`: HTML, XML or regular text file


### `target`

The `Node` that the asset is going to replace when rendered. A CSS selector can be used. Using a CSS selector requires [`scope`](#scope) to be included in [`options`](#options).

### `asset`

The asset to be rendered. It can be any of the following:

* Component: a [`Component`](../component/component.md) `Function` returns a promise that resolves to a [`Component`](../component/component.md). It is [`Component.scope`](../component/component.md#scope) that is rendered.
* Node: a DOM `Node`
* Markup: HTML or XML. Converted to `Element`
* Text: regular text. Converted to `TextNode`.

### `assets`

Contains assets which can be refered to by property name using [`asset`](#asset).

### `placeholder`

Used as a placeholder for the `Node` (asset) that is supposed to be rendered. This can be used to show a temporary UI component like a loader before the `Node` is rendered. The placeholder gets rendered immediatly and when the asset gets fetched and/or gets constructed, the asset is rendered.

### `scope`

The `Element` that is used as the scope for a CSS selector (if [`target`](#target) is a string).

### `props`

The props to be used in case the asset is a function and takes props.

### `replacer`

A function used to replace the [`target`](#target) with the [`asset`](#asset). Refer to [`replacer`](./replace-node.md#replacer) for more.
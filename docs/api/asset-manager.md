# `assetManager`

## Introduction

Contains utilities used to manage assets. It handles importation, fetching and prefetching of assets.

## Structure

```js
{
  fetchAsset: Function,
  importModule: Function,
  prefetch: Function,
  limitAwait: Function
}
```

## `fetchAsset`

### Description

Used for fetching assets like `markup`, `text`, `json` and more.

### Syntax

```js
fetchAsset(src[, responseType])
```

### Parameters

- `src`:
  - Type: `string`
  - Required: Yes.
  - Usage: points to the asset.
- `responseType`:
  - Type: `string`
  - Required: No.
  - Usage: specifies the type of response expected when the asset has been fetched.

#### `responseType`

Specifies the type of response expected when the asset gets fetched. It can have any of the following values:

- `"text"`: regular text content.
- `"json"`: JSON text.
- `"blob"`: a blob.
- `"arrayBuffer"`: an array buffer.
- `"formData"`: form data.

### Return Value

Any value corresponding to the `responseType`. The response is read to completion using using an appropriate method specified via `responseType`. The resulting value is what gets returned.

## `importModule`

### Description

Used to import modules (ESM).

### Syntax

```js
importModule(src[, options])
```

### Parameters

- `src`
  - Type: `string`
  - Required: Yes.
  - Usage: points to the module.
- `options`
  - Type: `Object`
  - Required: No.
  - Reference: [`options`](#options)

#### `options`

__Structure__

```js
{
  name: String,
  construct: Boolean,
  props: any
}
```

__Properties__:

- `name`: specifies the name of the module if named exports are used in the module. If not specified, the first export will be returned.
- `construct`: it specifies whether the module export should be constructed. This is used only when the module export is a function, in which case it will be invoked and the its return value will be returned.
- `props`: the props to be used when constructing the module export. This is used only when `construct` is set to `true`.

### Return Value

The module export or the result of constructing (if `construct` is set to `true`).

## `limitAwait`

### Description

Used to set a time limit to how long an asset asynchronously fetched should be waited for. If the asset takes longer to be fetched than the specified time, limitAwait resolves its promise with a placeholder. When the asset has been fetched the placeholder is replaced with the asset using a callback function.

### Syntax

```js
limitAwait(options)
```

### Parameters

- `options`:
  - Type: `Object`
  - Required: Yes.
  - Usage: contains assets and conditions for waiting for an asset to get fetched.
  - Reference: [`options`](#options)

#### `options`

__Description__

Contains assets and conditions for waiting for an asset to get fetched.

__Structure__

```js
{
  type: string,
  promise: Promise,
  time: number,
  placeholder: Node,
  replacer: Function
}
```

__Properties__

- `type`: specifies what type of valuethe promise resolves to.
- `promise`: the promise that is to be waited for.
- `time`: the time limit for waiting for the promise to resolve.
- `placeholder`: the value that the promise of `limitAwait` should resolve to if the time limit is reached.
- `replacer`: a callback that replaces the placeholder with the value to which the promise resolves. For `type` `"component"` or `"element"`, the replacer will be used to replace the placeholder in the DOM of component.

### Return Value

A promise that resolves to a placeholder or the resolve value of the `promise`.

> __NOTE:__<br />
> For `type` `"component"`, the `placeholder` is wrapped in an `Object` that mimics a component. The `Object` has the following structure: <br />
> `{ scope: Node }`<br /><br />
> The property `scope` refers to the `placeholder`.
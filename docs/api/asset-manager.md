# `assetManager`

## Introduction

Contains utilities used to manage assets. It handles importing, fetching and prefetching of assets.

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
  - Reference: [responseType](#responsetype).

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
  - Usage: URL pointing to the module.
- `options`
  - Type: `Object`
  - Required: No.
  - Reference: [`options`](#options)

#### `options`

**Structure**

```js
{
  name: String,
  construct: Boolean,
  props: any
}
```

**Properties**:

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
  - Usage: Contains assets and conditions for waiting for an asset to get fetched.
  - Reference: [`options`](#options-1).

### Return Value

A promise that resolves to a placeholder or the resolve value of the `promise`.

#### `options`

**Description**

Contains assets and conditions for waiting for an asset to get fetched.

**Structure**

```js
{
  type: string,
  promise: Promise,
  time: number,
  placeholder: Node,
  replacer: Function
}
```

**Properties**

- `type`: specifies what type of value the promise resolves to. It can values `"component"`, `"node"` or `"other"`.
- `promise`: the promise that is to be waited for.
- `time`: the time limit for waiting for the promise to resolve.
- `placeholder`: the value that the promise of `limitAwait` should resolve to if the time limit is reached.
- `replacer`: a callback that replaces the placeholder with the value to which the promise resolves. For `type` `"component"` or `"node"`, the replacer will be used to replace the placeholder in the DOM of component.

> **NOTE:**<br />
> For `type` `"component"`, the `placeholder` is wrapped in an `Object` that mimics a component. The `Object` has the following structure: <br /> > `{ scope: Node }`<br /><br />
> The property `scope` refers to the `placeholder`.

## `prefetch`

### Description

Used to prefetch assets. All prefetched assets are made available globally via `window.$app.prefetchedAssets`.

### Syntax

```js
prefetch(options)
```

### Parameters

- `options`:
  - Type: `Array`
  - Required: Yes.
  - Usage: Used to specify the options for the assets to be prefetched, where they should be placed and more.
  - Reference: [prefetch Options](#prefetch-options).

### Return Value

A promise that resolves into the an array of prefetched assets.

### `prefetch` Options

#### Structure

Each item in the array is an object of the following structure:

```js
{
  collection: string,
  construct: Boolean,
  id: string,
  name: string,
  props: any,
  src: string,
  type: string
}
```

#### Properties

- `collection`: The type of collection to which the asset should be set in `window.$app.prefetchedAssets`. You can set this to any value you want except for Odom-specific assets like components. The specific values you can set it to are:
  - `"component"`: For components.
  - `"nodes"`: For nodes.
  - `"markups"`: For markup.
  - `"texts"`: For text.
- `construct`: Specifies whether or not the prefetched asset should be constructed. This is set to true only when the fetched asset is a function. The function will be invoked (with `props` if provided) and the return value will be returned.
- `id`: The unique ID of the asset. This is used to store the asset in `window.$app.prefetchedAssets`.
- `props`: Used for constructing an asset if it is a function.
- `src`: The URL of the asset.
- `type`: The type of the asset. It can take any of the following values:
  - `"module"`: An ES module.
  - `"text"`: A text file.
  - `"json"`: A JSON file.
  - `"blob"`: a blob.
  - `"arrayBuffer"`: an array buffer.
  - `"formData"`: form data.

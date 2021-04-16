# `assetManager`

## Introduction

Contains utilities used to manage assets. It handles importation, fetching and prefetching of assets.

### Structure

```js
{
  fetchAsset: Function,
  importModule: Function,
  limitAwait: Function
}
```

### `limitAwait`

#### Description

Used to set a time limit to how long an asset asynchronously fetched should be waited for. If the asset takes longer to be fetched than the specified time, limitAwait resolves its promise with a placeholder. When the asset has been fetched the placeholder is replaced with the asset using a callback function.

#### Syntax

```js
limitAwait(options)
```

#### Parameters

* `options`:
  * Type: `Object`
  * Required: Yes
  * Usage: contains assets and options for waiting for the asset to be fetched.

#### Return Value

`any`

#### Reference

[`limitAwait`](./limit-await.md)


### `fetchAsset`

#### Description

Used for fetching assets like `markup`, `text`, `json` and more.

#### Syntax

```js
fetchAsset(src, responseType)
```

#### Parameters

* src
  * Type: `string`
  * Required: Yes
  * Usage: points to the asset

#### Return Value

`any`


## `importModule`

### Description

Used to import modules.

### Syntax

```js
importModule(src, options)
```

### Parameters

* `src`
  * Type: `string`
  * Required: Yes
  * Usage: points to the module
* `options`
  * Type: `Object`
  * Required: No
  * Structure:
    * ```js
      {
        name: String,
        construct: Boolean,
        props: any
      }
      ```

### Return Value

### Reference

[`render`](#render)


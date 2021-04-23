# API

__Table of Contents__

- [API](#api)
  - [Introduction](#introduction)
  - [Structure](#structure)
  - [`createComponent`](#createcomponent)
    - [Description](#description)
    - [Syntax](#syntax)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Reference](#reference)
  - [`$create`](#create)
  - [`Component`](#component)
  - [`$A`](#a)
  - [`render`](#render)
    - [Description](#description-1)
    - [Syntax](#syntax-1)
    - [Parameters](#parameters-1)
    - [Return Value](#return-value-1)
    - [Reference](#reference-1)
  - [`replaceNode`](#replacenode)
    - [Description](#description-2)
    - [Syntax](#syntax-2)
    - [Parameters](#parameters-2)
    - [Return Value](#return-value-2)
    - [Reference](#reference-2)
  - [`assetManager`](#assetmanager)
    - [Description](#description-3)
    - [Structure](#structure-1)
    - [Reference](#reference-3)
  - [`importComponent`](#importcomponent)
    - [Description](#description-4)
    - [Syntax](#syntax-3)
    - [Parameters](#parameters-3)
    - [Return Value](#return-value-3)


## Introduction

Acom provides a number of utilities for creating and manipulating components. We are going to look at how each one of these utilities works.

## Structure

```js
{
  createComponent: Function,
  $create: Function,
  Component: Object,
  $A: class,
  render: Function,
  replaceNode: Function,
  assetManager: Object
}
```

## `createComponent`

### Description

Used to create and transform a component. The function executes processes using values of [`options`](#options) to transform a component.

### Syntax

```js
createComponent(options);
```

### Parameters

* `options`
  * Type: `Object`
  * Required: Yes
  * Usage: contains utilities for manipulating a component
  * Reference: [`options`](./options.md)


> __Note:__ If you create a component directly using [`Component`](./component/component.md), you have to manipulate the component on your own using the [`API`](./component/component.md#api).


### Return Value

A promise that resolves to an instance of [`Component`](#component).

### Reference

[`createComponent`](./create-component.md).

## `$create`

An alias for [`crateComponent`](#createcomponent).

## `Component`

The component class. Refer to [Component](./component/component.md) for more.

## `$A`

An alias for [Component](#component);

## `render`

### Description

Used for inserting components into the DOM or component.

### Syntax

```js
render([options])
```

### Parameters

* `options`
  * Type: Object
  * Required: No
  * Usage: contains options for rendering assets

### Return Value

A promise that resolves to `undefined`.

### Reference

[`render`](./render.md)


## `replaceNode`

### Description

Used to replace a DOM node with another node.

### Syntax

```js
replaceNode(target, node[, replacer])
```

### Parameters

* `target`:
  * Type: `Node`
  * Required: Yes
  * Usage: replaced by another node

* `node`:
  * Type: `Node`
  * Required: Yes
  * Usage: replaces another node

* `replacer`:
  * Type: `Function`
  * Required: No
  * Usage: replaces `target` with `node`


### Return Value

`undefined`

### Reference

[`replaceNode`](#replace-node.md)


## `assetManager`

### Description

Contains utilities used to manage assets. It handles importation, fetching and prefetching of assets.

### Structure

```js
{
  fetchAsset: Function,
  importModule: Function,
  prefetch: Function,
  limitAwait: Function
}
```

### Reference

[assetManager](./asset-manager.md);


## `importComponent`

### Description

Used to import components. It can be used to import either HTML or JS components.

### Syntax

```js
importComponent(src)
```

### Parameters

* `src`
  * Type: string
  * Required: Yes
  * Usage: uri pointing to the file location of component

### Return Value

A promise that resolves to a function.
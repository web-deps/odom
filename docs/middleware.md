# Middleware

__Table of Contents__

- [Middleware](#middleware)
  - [Introduction](#introduction)
  - [Structure](#structure)
  - [`markup`](#markup)
    - [Description](#description)
    - [Structure](#structure-1)
    - [`parser`](#parser)
      - [Syntax](#syntax)
      - [Parameters](#parameters)
      - [Return Value](#return-value)
    - [`converter`](#converter)
      - [Syntax](#syntax-1)
      - [Parameters](#parameters-1)
      - [Return Value](#return-value-1)
    - [`custom`](#custom)
  - [`styles`](#styles)
    - [Structure](#structure-2)
    - [`preprocessor`](#preprocessor)
      - [Syntax](#syntax-2)
      - [Parameters](#parameters-2)
      - [Return Value](#return-value-2)
    - [`postprocessor`](#postprocessor)
      - [Syntax](#syntax-3)
      - [Parameters](#parameters-3)
      - [Return Value](#return-value-3)
    - [`custom`](#custom-1)

## Introduction

middleware are either user defined or third-party functions used to supplement or override the [Component API](component/component.md#API). The middleware are used for manipulating `markup` and `styles` of a component.

## Structure

```js
{
  markup: Object,
  styles: Object
}
```

## `markup`

### Description

Used to manipulate [`markup`](#markup).

### Structure

```js
{
  parser: Function,
  converter: Function,
  custom: Array
}
```

### `parser`

Used to parse [`markup`](#markup).

#### Syntax

```js
parser(markup)
```

#### Parameters

* `markup`
  * Type: `String`
  * Required: Yes
  * Usage: contains markup to be parsed

#### Return Value

A promise that resolves to an `Element`.

### `converter`

#### Syntax

```js
converter(element)
```

#### Parameters

* `element`
  * Type: `Element`
  * Required: Yes
  * Usage: converted to `HTMLElement`

#### Return Value

A promise that resolves to an `HTMLElement`.

### `custom`

Array of functions used to process [`markup`](). The result of one function is passed to the next function.

## `styles`

Used to manipulate [`styles`](#styles).

### Structure

```js
{
  preprocessor: Function,
  postprocessor: Function,
  custom: Array
}
```

### `preprocessor`

Used to preprocess [`styles`](#styles).

#### Syntax

```js
preprocessor(styles)
```

#### Parameters

* `styles`
  * Type: `String`
  * Required: Yes
  * Usage: converted to CSS

#### Return Value

A promise that resolves to a string containg CSS.

### `postprocessor`

Used to post-process CSS.

#### Syntax

```js
postprocessor(css)
```

#### Parameters

* `css`
  * Type: `String`
  * Required: Yes
  * Usage: converted to post-precessed CSS


#### Return Value

A promise that resolves to a `string` containing post-processed CSS.

### `custom`

Array of functions used to process [`styles`](). The result of one function is passed to the next function.
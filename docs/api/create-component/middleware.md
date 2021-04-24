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
      - [Description](#description-1)
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

middleware are either user defined or third-party utilities used to supplement or override the [Component API](component/component.md#api). The middleware are used for manipulating `markup` and `styles` of a component.

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

Used to parse [`markup`](#markup). This will override the default markup parser for a component.

#### Syntax

```js
parser(markup)
```

#### Parameters

- `markup`
  - Type: `string`
  - Required: Yes
  - Usage: contains markup to be parsed

#### Return Value

A promise that resolves to a `Node`.

### `converter`

#### Description

Used to convert an XML based document to HTML document. This is used when the markup used is not HTML. This overrides the default converter for a component.

#### Syntax

```js
converter(element)
```

#### Parameters

- `element`
  - Type: `Element`
  - Required: Yes
  - Usage: converted to `HTMLElement`

#### Return Value

A promise that resolves to an `HTMLElement`.

### `custom`

Array of functions used to process [`markup`](./create-component.md#markup). The functions are involked in the order they are in the array. The result of one function is passed to the next function. After processing, the end result is assigned to [`Component.scope`](../component/compnent.md#scope). This overrides all the component utilities used to process markup.

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

Used to preprocess [`styles`](#styles). This can be used for languages that can be converted to CSS.

#### Syntax

```js
preprocessor(styles)
```

#### Parameters

- `styles`
  - Type: `string`
  - Required: Yes
  - Usage: converted to CSS

#### Return Value

A promise that resolves to a string containg CSS.

### `postprocessor`

Used to post-process CSS. This can be used to add vendor prefixes and the like.

#### Syntax

```js
postprocessor(css)
```

#### Parameters

- `css`
  - Type: `String`
  - Required: Yes
  - Usage: converted to post-precessed CSS

#### Return Value

A promise that resolves to a `string` containing post-processed CSS.

### `custom`

Array of functions used to process [`styles`](./create-component.md#styles). The functions are involked in the order they are put in the array. The result of one function is passed to the next function. The end result is used to style the component. These utilities override all the default styling utilities of a component.

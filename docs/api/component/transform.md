# Transform

- [Transform](#transform)
  - [Introduction](#introduction)
  - [Structure](#structure)
  - [`insertComponents`](#insertcomponents)
    - [Syntax](#syntax)
    - [Parameters](#parameters)
      - [insertComponent Options](#insertcomponent-options)
    - [Return Value](#return-value)
  - [`insertData`](#insertdata)
    - [Syntax](#syntax-1)
    - [Parameters](#parameters-1)
      - [`options`](#options)
    - [Return Value](#return-value-1)
  - [`insertMarkup`](#insertmarkup)
    - [Syntax](#syntax-2)
    - [Parameters](#parameters-2)
      - [insertMarkup Options](#insertmarkup-options)
    - [Return Value](#return-value-2)
  - [`insertNodes`](#insertnodes)
    - [Syntax](#syntax-3)
    - [Parameters](#parameters-3)
      - [insertNodes Options](#insertnodes-options)
    - [Return Value](#return-value-3)
  - [`insertSlots`](#insertslots)
    - [Syntax](#syntax-4)
    - [Parameters](#parameters-4)
    - [Return Value](#return-value-4)
  - [`insertText`](#inserttext)
    - [Syntax](#syntax-5)
    - [Parameters](#parameters-5)
      - [insertText Options](#inserttext-options)
    - [Return Value](#return-value-5)
  - [`map`](#map)
    - [Syntax](#syntax-6)
    - [Parameters](#parameters-6)
      - [map Options](#map-options)
    - [Return Value](#return-value-6)
  - [`multiple`](#multiple)
    - [Syntax](#syntax-7)
    - [Parameters](#parameters-7)
      - [multiple Options](#multiple-options)
    - [Return Value](#return-value-7)
  - [`run`](#run)
    - [Syntax](#syntax-8)
    - [Parameters](#parameters-8)
      - [run Options](#run-options)
    - [Return Value](#return-value-8)

## Introduction

Transformations like inserting components into [`scope`](./component.md#scope) are done via `transform`, a property of [`Component`](component.md). Transformations are some of the functions performed by [`createComponent`](../create-component/create-component.md). Let us take a look at the structure and functionality of `transform`. Every transformations are done on [`scope`](./component.md#scope).

## Structure

```js
{
  display: Function,
  insertData: Function,
  insertSlots: Function,
  insertComponents: Function,
  insertElements: Function,
  insertMarkup: Function,
  insertText: Function,
  loading: Function,
  map: Function,
  multiple: Function,
  presence: Function,
  run: Function
}
```

## `insertComponents`

This method inserts `components`.

### Syntax

```js
insertComponents(options)
```

### Parameters

- `options`
  - Type: `Object`
  - Required: Yes
  - Usage: contains utilites for inserting components
  - Reference: [`insertComponents Options`](#insertcomponents-options)

#### insertComponent Options

__Structure__:

```js
{
  components: Object,
  data: Object,
  methods: Object,
  props: Object
}
```

__Properties__:

- `components`: contains components with property names corresponding to values specified via "acom-src" attributes.
- `data`: the data that can be accessed via [data selectors](../create-component/utils.md#data-selectors)
- `methods`: the methods that can be accessed via data selectors
- `props`: the props of the component that can be accessed via data selectors

### Return Value

A promise that resolves to `undefined`.

## `insertData`

Used for inserting and binding data.

### Syntax

```js
insertData(options)
```

### Parameters

- `options`
  - Type: `Object`
  - Required: Yes
  - Usage: provides data utilities for inserting
  - Reference: [`options`](#options)

#### `options`

_Structure_

```js
{
  props: Object,
  data: Object,
  methods: Object
}
```

_Properties_

- `props`: the props of a component provided in [`options`](../create-component/create-component.md). For more information, Refer to [`props`](../create-component/create-component.md#props).
- `data`: generic data in a component. Refer to [`data`](../create-component/create-component.md#data) for more details
- `methods`: generic methods used in a component. Refer to [`methods`](../create-component/create-component.md#methods) for more details.

### Return Value

A promise that resolves to `undefined`.

## `insertMarkup`

This method inserts markup into [`scope`](component.md#scope).

### Syntax

```js
insertMarkup(markups)
```

### Parameters

- `options`
  - Type: `Object`
  - Required: Yes
  - Usage: contains utilites for inserting markup
  - Reference: [`insertMarkup Options`](#insertmarkup-options)

#### insertMarkup Options

__Structure__:

```js
{
  markups: Object,
  data: Object,
  methods: Object,
  props: Object
}
```

__Properties__:

- `markups`: contains markup with property names corresponding to values specified via "acom-markup" attributes.
- `data`: the data that can be accessed via [data selectors](../create-component/utils.md#data-selectors)
- `methods`: the methods that can be accessed via data selectors
- `props`: the props of the component that can be accessed via data selectors

### Return Value

A promise that resolves to `undefined`.

## `insertNodes`

This method inserts `nodes` into [`scope`](component.md#scope).

### Syntax

```js
insertNodes(options)
```

### Parameters

- `options`
  - Type: `Object`
  - Required: Yes
  - Usage: contains utilites for inserting elements
  - Reference: [`insertElements Options`](#insertnodes-options)

#### insertNodes Options

__Structure__:

```js
{
  nodes: Object,
  data: Object,
  methods: Object,
  props: Object
}
```

__Properties__:

- `nodes`: contains nodes with property names corresponding to values specified via "acom-node" attributes.
- `data`: the data that can be accessed via [data selectors](../create-component/utils.md#data-selectors)
- `methods`: the methods that can be accessed via data selectors
- `props`: the props of the component that can be accessed via data selectors

### Return Value

A promise that resolves to `undefined`.

## `insertSlots`

This method inserts `slots` into [`scope`](./component.md#scope). For more details, Refer to [Slots](../../data.md#slots).

### Syntax

```js
insertSlots(slots)
```

### Parameters

- `slots`
  - Type: `Object`
  - Required: Yes
  - Usage: contains slots passed in from parent component

### Return Value

A promise that resolves to `undefined`.

## `insertText`

This method inserts text into [`scope`](component.md#scope).

### Syntax

```js
insertText(options)
```

### Parameters

- `options`
  - Type: `Object`
  - Required: Yes
  - Usage: contains utilites for inserting text
  - Reference: [`insertText Options`](#inserttext-options)

#### insertText Options

__Structure__:

```js
{
  texts: Object,
  data: Object,
  methods: Object,
  props: Object
}
```

__Properties__:

- `texts`: contains text with property names corresponding to values specified via "acom-text" attributes.
- `data`: the data that can be accessed via [data selectors](../create-component/utils.md#data-selectors)
- `methods`: the methods that can be accessed via data selectors
- `props`: the props of the component that can be accessed via data selectors

### Return Value

A promise that resolves to `undefined`.

## `map`

This method inserts variants of the same element into `scope` by mapping an array of data to a collection of elements. Refer to [`Map`](../../collections.md#map) for more.

### Syntax

```js
map(options)
```

### Parameters

- `options`
  - Type: `Object`
  - Required: Yes
  - Usage: contains utilites for inserting a map element
  - Reference: [`map Options`](#map-options)

#### map Options

__Structure__:

```js
{
  data: Object,
  methods: Object,
  props: Object
}
```

__Properties__:

- `data`: the data that can be accessed via [data selectors](../create-component/utils.md#data-selectors)
- `methods`: the methods that can be accessed via data selectors
- `props`: the props of the component that can be accessed via data selectors

### Return Value

A promise that resolves to `undefined`.

## `multiple`

This method inserts a collection of variants of an element into `scope` using a template. Refer to [`Multiple`](../../collections.md#multiple) for more.

### Syntax

```js
multiple(options)
```

### Parameters

- `options`
  - Type: `Object`
  - Required: Yes
  - Usage: contains utilites for inserting multiple elements
  - Reference: [`multiple Options`](#multiple-options)

#### multiple Options

__Structure__:

```js
{
  data: Object,
  methods: Object,
  props: Object
}
```

__Properties__:

- `data`: the data that can be accessed via [data selectors](../create-component/utils.md#data-selectors)
- `methods`: the methods that can be accessed via data selectors
- `props`: the props of the component that can be accessed via data selectors

### Return Value

A promise that resolves to `undefined`.

## `run`

This method perfom all the transformations.

### Syntax

```js
run(options)
```

### Parameters

- `options`
  - Type: `Object`
  - Required: Yes
  - Usage: contains utilies for transforming a component
  - Reference: [`run Options`](#run-options)

#### run Options

__Sturcture__:

```js
{
  props: Object,
  utils: Object
}
```

__Properties__:

- `props`: the props of a component. For more information, Refer to [`props`](../../data.md#props).
- `utils`: contains the utilities used to perform transformations. Refer to [`utils`](../create-component/utils.md) for more details.

### Return Value

A promise that resolves to `undefined`.

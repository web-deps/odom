# Transform

- [Transform](#transform)
  - [Introduction](#introduction)
  - [Structure](#structure)
  - [`insertData`](#insertdata)
    - [Syntax](#syntax)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
  - [`insertComponents`](#insertcomponents)
    - [Syntax](#syntax-1)
    - [Parameters](#parameters-1)
    - [Return Value](#return-value-1)
  - [`insertElements`](#insertelements)
    - [Syntax](#syntax-2)
    - [Parameters](#parameters-2)
    - [Return Value](#return-value-2)
  - [`insertMarkup`](#insertmarkup)
    - [Syntax](#syntax-3)
    - [Parameters](#parameters-3)
    - [Return Value](#return-value-3)
  - [`insertText`](#inserttext)
    - [Syntax](#syntax-4)
    - [Parameters](#parameters-4)
    - [Return Value](#return-value-4)
  - [`insertSlots`](#insertslots)
    - [Syntax](#syntax-5)
    - [Parameters](#parameters-5)
    - [Return Value](#return-value-5)
  - [`multiply`](#multiply)
    - [Syntax](#syntax-6)
    - [Parameters](#parameters-6)
    - [Return Value](#return-value-6)
  - [`map`](#map)
    - [Syntax](#syntax-7)
    - [Parameters](#parameters-7)
    - [Return Value](#return-value-7)
  - [`run`](#run)
    - [Syntax](#syntax-8)
    - [Parameters](#parameters-8)
    - [Return Value](#return-value-8)

## Introduction

Transformations like inserting components into `scope` are done via `transform`, a property of [`Component`](component.md). Transformations are some of the functions performed by [`acom`](../exports.md#acom). Let us take a look at the structure and functionality of `transform`.

## Structure

```js
{
  insertData: Function,
  insertSlots: Function,
  insertComponents: Function,
  insertElements: Function,
  insertMarkup: Function,
  insertText: Function,
  multiply: Function,
  map: Function
}
```

## `insertData`

Used for inserting data into [`scope`](#scope).

### Syntax

```js
insertData(param)
```

### Parameters

`param`

__Structure__

```js
{
  props: Object,
  data: Object,
  methods: Object
}
```

`props`

The props of a component provided in the options. For more information, check out [`props`](../data.md#props).

`data`

Generic data in a component. Check out [`data`](../data.md#data) for more details.

`methods`

Generic methods used in a component.  Check out [`methods`](../data.md#methods) for more details.

### Return Value

A promise that resolves to `undefined`.


## `insertComponents`

This method inserts `components` into [`scope`](component.md#scope).

### Syntax

```js
insertComponents(components)
```

### Parameters

`components`

An object containing components. For more details, check out [`components`](../data.md#components).

### Return Value

A promise that resolves to `undefined`.

## `insertElements`

This method inserts `elements` into [`scope`](component.md#scope).

### Syntax

```js
insertElements(elements)
```

### Parameters

`elements`

An object containing elements. For more details, check out [`elements`](../data.md#elements).

### Return Value

A promise that resolves to `undefined`.

## `insertMarkup`

This method inserts markup into [`scope`](component.md#scope).

### Syntax

```js
insertMarkup(markups)
```

### Parameters

`markups`

An object containing markup. For more details, check out [`markups`](../data.md#markups).

### Return Value

A promise that resolves to `undefined`.

## `insertText`

This method inserts text into [`scope`](component.md#scope).

### Syntax

```js
insertText(texts)
```

### Parameters

`texts`

An object containing text. For more details, check out [`texts`](../data.md#texts).

### Return Value

A promise that resolves to `undefined`.

## `insertSlots`

This method inserts `slots` into [`scope`](component.md#scope). For more details, check out [Slots](../data.md#slots).

### Syntax

```js
insertSlots(slots)
```

### Parameters

`slots`

An object containing slots. For more details, check out [`slots`](../data.md#slots).

### Return Value

A promise that resolves to `undefined`.

## `multiply`

This method inserts a collection of variants of an element into `scope`. Check out [`Multiple`](../collections.md#multiple) for more.

### Syntax

```js
multiply(param)
```

### Parameters

`param`

Sturcture:

```js
{
  props: Object,
  data: Object,
  methods: Object
}
```

`props`

The props of a component provided in the options. For more information, check out [`props`](../data.md#props).

`data`

Generic data in a component. Check out [`data`](../data.md#data) for more details.

`methods`

Generic methods used in a component.  Check out [`methods`](../data.md#methods) for more details.

### Return Value

A promise that resolves to `undefined`.

## `map`

This method inserts variants of the same element into `scope` by mapping an array of data to a collection of elements. Check out [`Map`](../collections.md#map) for more.

### Syntax

```js
map(param)
```

### Parameters

`param`

Sturcture:

```js
{
  props: Object,
  data: Object,
  methods: Object
}
```

`props`

The props of a component provided in the options. For more information, check out [`props`](../data.md#props).

`data`

Generic data in a component. Check out [`data`](../data.md#data) for more details.

`methods`

Generic methods used in a component.  Check out [`methods`](../data.md#methods) for more details.

### Return Value

A promise that resolves to `undefined`.

## `run`

This method perfom all the transformations.

### Syntax

```js
run(param)
```

### Parameters

`param`

Sturcture:

```js
{
  props: Object,
  data: Object,
  methods: Object,
  components: Object,
  elements: Object,
  markups: Object,
  texts: Object,
  slots: Object
}
```

`props`

The props of a component provided in the options. For more information, check out [`props`](../data.md#props).

`data`

Generic data in a component. Check out [`data`](../data.md#data) for more details.

`methods`

Generic methods used in a component.  Check out [`methods`](../data.md#methods) for more details.

`components`

An object containing components. For more details, check out [`components`](../data.md#components).

`elements`

An object containing elements. For more details, check out [`elements`](../data.md#elements).

`markups`

An object containing markup. For more details, check out [`markups`](../data.md#markups).

`slots`

An object containing slots. For more details, check out [`slots`](../data.md#slots).

### Return Value

A promise that resolves to `undefined`.

# Apply

- [Apply](#apply)
  - [Structure](#structure)
  - [`styles`](#styles)
    - [Syntax](#syntax)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
  - [`eventListeners`](#eventlisteners)
    - [Syntax](#syntax-1)
    - [Parameters](#parameters-1)
    - [Return Value](#return-value-1)
  - [`run`](#run)
    - [Syntax](#syntax-2)
    - [Parameters](#parameters-2)
    - [Return Value](#return-value-2)
  - [`custom`](#custom)
    - [Syntax](#syntax-3)
    - [Parameters](#parameters-3)
    - [Return Value](#return-value-3)

Styling and eventListeners are applied to a component vai `apply` a property of [`Component`](component.md). This is one of the functions performed by [`acom`](../exports.md#acom). Let us take a look at the structure and functionality of `apply`.

## Structure

```js
{
  styles: Function,
  eventListeners: Function,
  run: Function,
  custom: Function
}
```

## `styles`

This is used to apply styling to a component.

### Syntax

```js
styles(styles [, middleware])
```

### Parameters

`styles`

A `String` or `HTMLStyleElement` containing the styles of `scope`.

`middleware`

Functions used to transform [`styles`](../options.md#styles). Check out [`styles`](../options.md#styles-1) for more information.

### Return Value

A promise that resolves to `undefined`.

## `eventListeners`

Used to apply [`eventListeners`](../options.md#eventListeners) to a component.

### Syntax

```js
eventListeners(param)
```

### Parameters

`param`

An object containing eventListeners. For more information check out [`eventListeners`](../options.md#eventListeners).

### Return Value

No return value.

## `run`

Applies `styles` and `eventListeners` to `scope`.

### Syntax

```js
run(param)
```

### Parameters

`param`

__Structure__

```js
{
  styles: String | HTMLStyleElement,
  eventListeners: Object,
  stylesmiddleware: Object
}
```

`styles`

CSS `String` or `HTMLStyleElement` that contains styles for a component.

`eventListeners`

eventListeners for a component. Check out [`eventListeners`](../options.md#eventListeners) for more information.

`stylesmiddleware`

middleware used to transform [`styles`](../options.md#styles). Check out [`styles`](../options.md#styles-1) for more information.

### Return Value

A promise that resolves to `undefined`.

## `custom`

Used for selecting elements and performing actions on them. Through `custom`, you can map CSS selectors to data, then perform actions on each element matching the selector using the mapped data.

### Syntax

```js
custom(map, action)
```

### Parameters

`map`

An object for matching selectors to data. It has the following structure:

`action`

A function that runs processes using selected elements and matched data. It is called for each element selected.

__Syntax__

```js
action(element, data)
```

__Parameters__

`element`

An `Element` matched by a CSS selector provided in `map`.

`data`

Data (of any type) provided in `map`.

__Return Value__

A promise that resolves to `undefined`.

### Return Value

A promise that resolves to `undefined`.

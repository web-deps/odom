# Apply

- [Apply](#apply)
  - [Structure](#structure)
  - [`mutations`](#mutations)
    - [Description](#description)
    - [Syntax](#syntax)
    - [Parameters](#parameters)
      - [`map`](#map)
    - [Return Value](#return-value)
    - [Return Value](#return-value-1)
  - [`styles`](#styles)
    - [Syntax](#syntax-1)
    - [Parameters](#parameters-1)
    - [Return Value](#return-value-2)
  - [`eventListeners`](#eventlisteners)
    - [Syntax](#syntax-2)
    - [Parameters](#parameters-2)
    - [Return Value](#return-value-3)
  - [`run`](#run)
    - [Syntax](#syntax-3)
    - [Parameters](#parameters-3)
      - [`param`](#param)
    - [Return Value](#return-value-4)
  - [`custom`](#custom)
    - [Syntax](#syntax-4)
    - [Parameters](#parameters-4)
      - [`map`](#map-1)
      - [`action`](#action)
    - [Return Value](#return-value-5)

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

## `mutations`

### Description

Applying multiple changes to the DOM is usually costly. Acom provides performant ways to apply mutations to components. The method `mutations` is used to apply mutations to components.

### Syntax

```js
mutations(map)
```

### Parameters

#### `map`

An object that maps CSS selectors to options for mutating. Each property in `map` is a CSS selector for elements you want to apply mutations to. The corresponding values are options for mutating the selected elements. The options object has the following structure:

```js
{
  mutator: Function,
  preserve: Object,
  type: string
}
```

`mutator`

A function that applies mutations to elements in a component.

__Syntax__:

```js
mutator(subject)
```

__Parameters__:

- `subject`:
  - Type: `HTMLElement`
  - Required: Yes.
  - Usage: It is the element to which mutations are applied.

__Return Value__:

A promise that resolves to an `HTMLElement`. The element is the mutated version of `subject`. This is the value that ends up in the DOM.

`preserve`

An object used to specify how the element to be mutated should be removed from the DOM. It specifies what parts of that element should be kept when the element has been removed. It is used when `type` is set to `"major"`. It has the following structure:

```js
{
  observers: Boolean,
  subtree: Boolean
}
```

__Properties__:

- `observers`: Specifies whether or not observers like event listeners should be kept.
- `subtree`: Specifies whether the subtree of the element should be kept.

`type`

Indicates the type of mutation that is to be carried out. It can be set to either `"major"` or `"minor"`. Whether a mutation is major or minor is determined by the time complexity of the mutation operations, excluding the rendering process.

A mutation operation that takes a short period of time (typically less than 16.67ms) to be performed is considered to be a minor mutation. Acom uses element cloning for major mutations

A mutation operation that takes long (typically takes more than 16.67ms) to be performed is considered to be a major mutation. Acom uses `requestAnimationFrame` (thus the 16.67ms) for minor mutions.

### Return Value

A promise that resolves to `undefined`.

`middleware`

Functions used to transform [`styles`](../options.md#styles). Refer to [`styles`](../options.md#styles-1) for more information.

### Return Value

A promise that resolves to `undefined`.

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

Functions used to transform [`styles`](../options.md#styles). Refer to [`styles`](../options.md#styles-1) for more information.

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

An object containing eventListeners. For more information Refer to [`eventListeners`](../options.md#eventListeners).

### Return Value

No return value.

## `run`

Applies `styles` and `eventListeners` to `scope`.

### Syntax

```js
run(param)
```

### Parameters

#### `param`

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

eventListeners for a component. Refer to [`eventListeners`](../options.md#eventListeners) for more information.

`stylesmiddleware`

middleware used to transform [`styles`](../options.md#styles). Refer to [`styles`](../options.md#styles-1) for more information.

### Return Value

A promise that resolves to `undefined`.

## `custom`

Used for selecting elements and performing actions on them. Through `custom`, you can map CSS selectors to data, then perform actions on each element matching the selector using the mapped data.

### Syntax

```js
custom(map, action)
```

### Parameters

#### `map`

An object for matching selectors to data. It has the following structure:

#### `action`

A function that runs processes using selected elements and matched data. It is called for each element selected.

__Syntax__

```js
action(element, data)
```

__Parameters__:

- `element`:
  - Type: `Element`
  - Required: Yes.
  - Usage: It is the element on which an action is applied.
- `data`:
  - Type: `any`
  - Required: Yes
  - Usage: The data that is specific to the element on which an action is applied.

__Return Value__

A promise that resolves to `undefined`.

### Return Value

A promise that resolves to `undefined`.

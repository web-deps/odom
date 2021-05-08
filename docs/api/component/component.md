# Component

__Table of Contents__

- [Component](#component)
  - [Introduction](#introduction)
  - [API](#api)
    - [Structure](#structure)
    - [`apply`](#apply)
    - [dynamicData](#dynamicdata)
    - [`id`](#id)
    - [`parseMarkup`](#parsemarkup)
      - [Syntax](#syntax)
      - [Parameters](#parameters)
      - [Return Value](#return-value)
    - [`render`](#render)
      - [Syntax](#syntax-1)
      - [Parameters](#parameters-1)
      - [Return Value](#return-value-1)
    - [`scope`](#scope)
    - [`select`](#select)
      - [Syntax](#syntax-2)
      - [Parameters](#parameters-2)
      - [Return Value](#return-value-2)
    - [`transform`](#transform)


## Introduction

Acom uses components to build user interfaces. The components are instances of a class called `Component`. The class one of the utilities in the [`API`](../api.md). The API provides an alias `$A` for `Component`. The function [`createComponent`](../api.md#create-component) is only a wrapper for the class. It executes certain processes according to attributes of `options` and returns the class instance. Using `Component` directly means you will have to do all the work done by `createComponent` on your own. You can do this via the [API](#api).

## API

### Structure

```js
{
  dynamicData: Object,
  id: string,
  scope: Element | document,
  apply: Object,
  transform: Object,
  select: Function,
  parseMarkup: Function,
  insert: Function
}
```

### `apply`

Select nodes in the component and apply actions like styling, adding event listeners and the like. Refer to [`apply](./apply.md) for more information.

### dynamicData

The data that is linked to the DOM. This is the data specified in [`options.utils.data.dynamic`](../create-component/utils.md#dynamic-data). Changing the contents updates the data in the DOM.

### `id`

The ID of the component. In HTML components, it is set via the `id` attribute of a `<meta>` tag. In JS components, it is set on `options`. If you have not set this property, it is automatically generated. The ID is used for uniquely identifying `scope` of a component for styling and eventListeners purposes. It is also used for caching a component and `styles`.

> __Note__: If you have not set the `id` explicitly, it will not be used for caching purposes. Therefore, settiing `id` on a component guarantees caching.

### `parseMarkup`

This method parses markup and assigns the resulting `Element` to [`scope`](#scope).

#### Syntax

```js
parseMarkup(options)
```

#### Parameters

- `options`
  - Type: `Object`
  - Required: Yes.
  - Usage: Contains markup and options for processing markup.

`options`

_Structure_:

```js
{
  markup: string,
  markupMiddleware: Object,
  mltype: string,
  convertMarkup: boolean
}
```

_Properties_:

- `markup`: The markup to be parsed
- `mltype`: The markup type. Can be either `"html"` or `"xml"`. The default value is `"html"`.
- `markupMiddleware`: Utilities for processing markup. Refer to [`markup`](../create-component/middleware.md) for more information.
- `convertMarkup`: Indicates whether or not to convert the resulting `Element` (if not an HTMLElement) to an HTMLElement. The default value is true.

#### Return Value

A promise that resolves to `Element` or `HTMLElement`.

### `render`

This method inserts [`scope`](#scope) into the DOM or another component's `scope`.

#### Syntax

```js
render(element)
```

#### Parameters

- `element`
  - Type: `string` | `Node`
  - Required: Yes
  - Usage: If it is a node, it is replaced by [`scope`](#scope). If it is a CSS selector, it is used to select a node in the DOM to be replaced by `scope`.

#### Return Value

A promise that resolves to `undefined`.

### `scope`

The `scope` of a component is the `Element` inserted into the DOM.

### `select`

This method selects elements of [`scope`](#scope) using a CSS selector.

#### Syntax

```js
select(selector, selectAll)
```

#### Parameters

- `selector`:
  - Type: `string`
  - Required: Yes
  - Usage: Selecting an element specified

- `selectAll`:
  - Type: `boolean`
  - Required: Yes
  - Usage: Determines whether all matching elements or only the first matching element must be returned from the function. The default value is `true`.

#### Return Value

A promise that resolves to an `Element` if `selectAll` is set to `false` and an array of elements if `selectAll` is set to `true`. This includes all descendants including those added by child components.

### `transform`

Transformations like inserting components into `scope` are done via `transform`. Refer to [Transform](transform.md) for more details.

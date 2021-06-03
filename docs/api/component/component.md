# Component

**Table of Contents**

- [Component](#component)
  - [Introduction](#introduction)
  - [API](#api)
    - [Structure](#structure)
    - [`apply`](#apply)
    - [`dynamicData`](#dynamicdata)
      - [`addUpdater`](#addupdater)
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
    - [setID](#setid)
      - [Syntax](#syntax-3)
      - [Parameters](#parameters-3)
      - [Return Value](#return-value-3)
    - [`transform`](#transform)
  - [Order of Execution](#order-of-execution)

## Introduction

Acom uses components to build user interfaces. The components are instances of a class called `Component`. The class one of the utilities in the [`API`](../api.md). The API provides an alias `$A` for `Component`. The function [`createComponent`](../api.md#create-component) is only a wrapper for the class. It executes certain processes according to attributes of `options` and returns the class instance. Using `Component` directly means you will have to do all the work done by `createComponent` on your own. You can do this via the [API](#api).

## API

### Structure

```js
{
  apply: Object,
  dynamicData: Object,
  id: string,
  insert: Function,
  parseMarkup: Function,
  scope: Element,
  select: Function,
  setID: Function,
  transform: Object
}
```

### `apply`

Select nodes in the component and apply actions like styling, adding event listeners and the like. Refer to [`apply](./apply.md) for more information.

### `dynamicData`

Data that may change during the execution of the program. Usually, the data is linked to the DOM. This is the data specified in [`options.utils.data.dynamic`](../create-component/utils.md#dynamic-data). Changing the data triggers updates especially in the DOM.

#### `addUpdater`

A method of [dynamicData](#dynamicdata). Used to add a data updater.

**Syntax**:

```js
addUpdater(dataName, updater)
```

**Parameters**:

- `dataName`:
  - Type: `string`
  - Required: Yes.
  - Usage: The name of the data you want to add an updater to.
- `updater`:
  - Type: `Function`
  - Required: Yes.
  - Usage: Runs an update when the data is changed.

### `id`

The ID of the component. In HTML components, it is set via the `id` attribute of a `<meta>` tag. In JS components, it is set on `options`. If you have not set this property, it is automatically generated. The ID is used for uniquely identifying `scope` of a component for styling and eventListeners purposes. It is also used for caching a component and `styles`.

> **Note**: If you have not set the `id` explicitly, it will not be used for caching purposes. Therefore, settiing `id` on a component guarantees caching.

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

### setID

Used to set the ID of the component.

#### Syntax

```js
setID(id)
```

#### Parameters

- `id`:
  - Type: `string`
  - Required: No.
  - Usage: The ID that will be set on a component. If not provided, an ID is randomly generated.

#### Return Value

`undefined`.

### `transform`

Transformations like inserting components into `scope` are done via `transform`. Refer to [Transform](transform.md) for more details.

## Order of Execution

When using the `Component` directly, the order in which you use the API methods may matter. The following is the recommended order of execution:

1. Set ID: The ID is used for many purposes. As such, setting the ID should be the first thing to do. The ID is used for identifying the component element in the DOM, scoping and removing styles and more. The ID can be set directly or via [`setID`](#setid).
2. Set Props: The functions used with [`apply`](#apply) may depend on the props of the component. So, setting props has to done before such methods. Props are set using [`setProps`](#setprops).
3. set Scope: Properties [`apply`](#apply) and [`transform`](#transform) depend on [`scope`](#scope). So, the scope of the element has to set before the aforementioned properties are used. You can set the scope either by directly setting the property or via [`parseMarkup`](#parsemarkup).
4. Set Scope Attribute: If you have not used [`parseMarkup`](#parsemarkup) to set the scope of the component, you need to explicitly set the attribute `acom-scope` of [`scope`](#scope) to the ID of the component.
5. Set Attributes: A lot of the methods of the API interact with [`scope`](#scope). These methods may depend on the values of the attributes of `scope`. So, you need to set the attributes before invoking these methods. You set attributes via [`attributes`](./apply.md#attributes)
6. Set Classes: Methods of the API may have to use the classes of the elements of `scope`. So, you might have to set the classes of the elements before using these methods. Setting classes after attributes avoids overwriting of class values. You set classes via [`classes`](./apply.md#classes).
7. Set Inline Styles: Set inline styles be [`transformations`](#transform) to avoid colliding values with those used in [`conditionals`](../../conditionals.md).
8. Create Dynamic Data: The dynamic data of the element is used in [`transform`](#transform). So, if you used dynamic data, you must set the data before transformations.
9. Set Styles and Add Event Listeners: You can perform these tasks one after another or at once. None of the previous steps depend on these two steps. So, it is okay to perform them last.

# Collections

**Table of Contents**

- [Collections](#collections)
  - [Introduction](#introduction)
  - [Multiple](#multiple)
    - [Introduction](#introduction-1)
    - [Attribute Value](#attribute-value)
      - [`data`](#data)
      - [`range`](#range)
    - [Example](#example)
      - [Markup](#markup)
      - [JS](#js)
  - [Map](#map)
    - [Introduction](#introduction-2)
    - [Attribute Value](#attribute-value-1)
      - [`cache`](#cache)
      - [`createNode`](#createnode)
      - [`data`](#data-1)
      - [`getData`](#getdata)
      - [`range`](#range-1)
    - [Reactivity](#reactivity)
      - [`updateMap`](#updatemap)
    - [Example 1 - Using Template](#example-1---using-template)
      - [Markup](#markup-1)
      - [JS](#js-1)
    - [Example 2 - Using createNode](#example-2---using-createnode)
      - [Markup](#markup-2)
      - [JS](#js-2)

## Introduction

Odom provides a way for you to create collections of DOM nodes based on collections of data. You can populate tables or lists using these collections. There are two types of collections in Odom, multiple and map. The following sections dive deep into the nature of these collections.

## Multiple

### Introduction

Multiple is a collection of elements which are variants of one element. The original element acts as a template for all its variants. The original element references an array, and specifies how each item of the array will be used on each one of its variants. The original element uses the attribute `"odom-multiple"`. Each variant accesses the matching item of the array using a [data selector](./data.md#data-selectors) prefixed with `@datum` in its attribute values. If the item is an object its values can be accessed using the dot notation.

### Attribute Value

The attribute value can either be a data selector or a JSON string. A data selector references an array in any of the properties of [`generic utilities`](api/create-component/utils.md#generic-utilities).

The JSON string has the following structure:

```json
{
  "data": string,
  "range": array
}
```

#### `data`

A string that specifies the array containing the data that will be used to generate the variants of an element. It uses a data selector.

#### `range`

An array of numbers that indicates the range of the array over which the variants must be generated. It uses one-based indexing. The array has two values. The first value indicates the start of the range. The second value indicates the end of the range. If not specified, the entire data array will be used.

### Example

#### Markup

```html
<ul>
  <li odom-multiple="@data.users" title="@datum.username">
    <img src="@datum.avatar" class="avatar" />
    <span class="username">
      <span odom-text="@datum.username"></span>
    </span>
  </li>
</ul>
```

#### JS

```js
// ...

const data = {
  users: [
    {
      avatar: "/users/avatar-1.png",
      username: "user-1"
    },
    {
      avatar: "/users/avatar-2.png",
      username: "user-2"
    },
    {
      avatar: "/users/avatar-3.png",
      username: "user-3"
    }
  ]
};

const utils = { data };

// ...

const options = { ..., utils };
const List = await createComponent(options);

// ...
```

## Map

### Introduction

Map is an element whose children are variants of a template element or nodes created by a function based on a collection of data. Map uses the attribute `"odom-map"`. Map can use a template just like [Multiple](#multiple), with the exception that the attribute `odom-map` is set on the parent of the template.

### Attribute Value

Just like [Multiple](#multiple), the value of `odom-map` can either be a data selector or a JSON string. A data selector is used only when a template is used. The JSON string has the following structure:

```json
{
  "cache": object,
  "createNode": function,
  "data": string,
  "getData": function,
  "range": array,
  "reactive": boolean
}
```

#### `cache`

An object used to specify the options for caching. This is used for [Reactivity](#reactivity). The data is cached, and used every time the [`range`](#range) is changed via the element's attribute (`odom-map`) or when an update is done via [`updateMap`](#updatemap).

Structure

```json
"id": string,
"storage": string
```

`id`

Used to specify the id of the cache. It must be unique globally (all components).

`storage`

Used to specify which storage facility will be used for the caching. It has the following values:

- `"app"`: Means the cache is going to be stored in the global variable `$app`.
- `"session"`: Means the cache will be stored in session storage.

#### `createNode`

A data selector used to select a user defined function that creates a node based on an item in the data array. Let us look at the signature of this function.

**Syntax**:

```js
createNode(datum)
```

**Parameters**:

- `datum`
  - Type: `any`
  - Required: Yes.
  - Usage: Contains the information required to create a node. It is a member of the collection array.

**Return Value**:

A promise that resolves to a `Node` or markup. If the promise resolves to markup, the markup will be converted to an `Element`.

#### `data`

A data selector for an array containing data that will be used to create nodes or variants of a template element.

#### `getData`

A data selector for a function that returns an array or a promise that resolves to an array of data that is used to create nodes. Let us look at the signature of this function.

**Syntax**:

```js
getData()
```

**Parameters**:

None.

**Return Value**:

A an array or a promise that resolves to an array.

#### `range`

An array used to specify the range of the data over which nodes must be created. It has two values. The first value specifies the beginning of the range, and the second one specifies the end of the range. You specify the range using one-based indexing (i.e. [1, 5] means from first item to the fifth item).

### Reactivity

Map is can be reactive. Every time the range is changed via the attribute `odom-map`, the nodes generated are updated according to the range. To change the range, update the range in the JSON object in the `odom-map` attribute or use [`updateMap`](#updatemap).

#### `updateMap`

A function used to update the nodes for [Map](#map). It is accessed via the Map element (element with the attribute `odom-map`) as `element.odom.updateMap`.

**Syntax**:

```js
updateMap(options)
```

**Parameters**:

- `options`
  - Type: `Object`
  - Required: Yes.
  - Usage: Contains the options for updating Map.
  - Reference: Refer to the next section.

_updateMap Options_

Structure:

```js
{
  append: boolean,
  extension: number,
  newData: Array,
  prepend: boolean,
  range: Array,
  refresh: boolean
}
```

Properties:

- `append`: Indicates that the new nodes should be appended to the existing nodes.
- `extension`: Specifies the number of nodes to add to existing nodes when appending or pre-pending.
- `newData`: The data that should be used to create new nodes.
- `prepend`: Indicates that the new nodes should be pre-pended to the existing nodes.
- `range`: The new range of nodes.
- `refresh`: Indicates that the new nodes should be created from the new data gotten from [`getData`](#getdata).

**Return Value**:

A promise that resolves to `undefined`

### Example 1 - Using Template

#### Markup

```html
<table>
  <thead>
    <tr>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody odom-map="@data.users">
    <tr>
      <td>
        <img src="@datum.avatar" />
      </td>
      <td>
        <span odom-text="@datum.username"></span>
      </td>
    </tr>
  </tbody>
```

#### JS

```js
// ...

const data = {
  users: [
    {
      avatar: "/users/avatar-1.png",
      username: "user-1"
    },
    {
      avatar: "/users/avatar-2.png",
      username: "user-2"
    },
    {
      avatar: "/users/avatar-3.png",
      username: "user-3"
    }
  ]
};

const utils = { data };

// ...

const options = { ..., utils };
const Table = await createComponent(options);

// ...
```

### Example 2 - Using createNode

#### Markup

```html
<table>
  <thead>
    <tr>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody odom-map='{"data": "@data.users", "createNode": "@methods.createNode"}'></tbody>
```

#### JS

```js
// ...

const data = {
  users: [
    {
      avatar: "/users/avatar-1.png",
      username: "user-1"
    },
    {
      avatar: "/users/avatar-2.png",
      username: "user-2"
    },
    {
      avatar: "/users/avatar-3.png",
      username: "user-3"
    }
  ]
};

const createNode = user => {
  return `
    <tr>
      <td>
        <img src="${user.avatar}" />
      </td>
      <td>${user.username}</td>
    </tr>
  `;
};

const methods = { createNode };
const utils = { data, methods };

// ...

const options = { ..., utils };
const Table = await createComponent(options);

// ...
```

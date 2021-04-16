# Collections

__Table of Contents__

- [Collections](#collections)
  - [__Introduction__](#introduction)
  - [__Multiple__](#multiple)
    - [__Introduction__](#introduction-1)
    - [Attribute Value](#attribute-value)
      - [`data`](#data)
      - [`range`](#range)
    - [Example](#example)
      - [__Markup__](#markup)
      - [JS](#js)
  - [__Map__](#map)
    - [__Introduction__](#introduction-2)
    - [Attribute Value](#attribute-value-1)
      - [`mapper`](#mapper)
      - [`range`](#range-1)
      - [`cache`](#cache)
      - [`refresh`](#refresh)
    - [Mapper](#mapper-1)
      - [Parameters](#parameters)
      - [Return Value](#return-value)
    - [__Reactivity__](#reactivity)
    - [Example 1 - Using Template](#example-1---using-template)
      - [__Markup__](#markup-1)
      - [JS](#js-1)
    - [Example 2 - Using creator](#example-2---using-creator)
      - [__Markup__](#markup-2)
      - [JS](#js-2)

## __Introduction__

Collections are a way to reuse elements by using the same element to form a collection of variants of that element.

## __Multiple__

### __Introduction__

Multiple is a collection of elements which are variants of one element. The original elements acts as a template for all its variants. The original element references an array, and specifies how each item of the array will be used on each one of its variants. The original element uses the attribute `acom-markupltiple`. Each variant accesses the matching item of the array using `@datum` in its attribute values. If the item is an object its values can be accessed using dot notation.

### Attribute Value

The attribute value can either be a data selector or a JSON string. A data selector references an array in any of the properties of `utils` as described in [Data](data.md).

The JSON string has the following structure:

```json
{
  "data": string,
  "range": array<number>
}
```

#### `data`

A string that specifies the array containing the data that will be used to generate the variants of an element. It uses a data selector.

#### `range`

An array of numbers that indicates the range of the array over which the variants must be generated. It uses one-based indexing. The array has two values. The first value indicates the start of the range. The second value indicates the end of the range.

### Example

#### __Markup__

```html
<ul>
  <li acom-markupltiple="@data.users" title="@datum">
    <img src="@datum.avator" class="avator" />
    <span class="username">
      <span acom-text="@datum.username"></span>
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
      avator: "/users/avator-1.png",
      username: "user-1"
    },
    {
      avator: "/users/avator-2.png",
      username: "user-2"
    },
    {
      avator: "/users/avator-3.png",
      username: "user-3"
    }
  ]
};

const utils = { data };
// ...
const options = { ..., utils };
// ...
```

## __Map__

### __Introduction__

Map is an element whose children are variants of one element. Map uses the attribute `acom-map`. Map can use the a template just like Multiple. The template must be the child element of the element.

### Attribute Value

Just like [Multiple](#multiple), the value of `acom-map` can either be a data selector or a JSON string. The JSON string has the following structure:

```json
{
  "mapper": string,
  "range": array,
  "cache": object,
  "refresh": boolean
}
```

#### `mapper`

A data selector used to select a [Mapper](#mapper).

#### `range`

A one-based array used to specify the range of the data over which variants must be generated.

#### `cache`

An object used to specify the options for caching. This is used for [Reactivity](#reactivity). The data is cached, and used everytime the [`range`](#range) is changed.

Structure

```json
"id": string,
"storage": string
```

`id`

Used to specify the id of the cache. It must be unique globally (all components).

`storage`

Used to specify which storage facility will be used for the caching. It has the following values:

* "app": means the cache is going to be stored in the global variable `$createpp`.
* "session": means the cache will be stored in session storage.

#### `refresh`

Used for [Reactivity](#reactivity). Everytime the range is changed, [Mapper](#mapper) is called and the data returned is used for the range instead of cached values.

### Mapper

Map uses a function called `mapper` to create variants. The mapper is a function that either returns data or data and a variant.

#### Parameters

The mapper takes no parameters.

#### Return Value

A promise that resolves to an object containing and array or an array and a function that returns a variant. If a template has been used, the return value resolves to an object containing only data. Otherwise, the return value is an object containing data and a function called creator. The creator is used to create a single variant. The return value has the following structure:

```js
{
  data: Array<any>,
  creator: Function
}
```

`data`

An array containing data that will be used to create variants.

`creator`

A function that returns a variant.

Syntax

```js
creator(datum)
```

Parameters

`datum`

A single item in the array `data`.

Return Value

A string containing markup for a variant, or an `HTMLElement`. If markup is returned, it is parsed them added to the DOM. If you use XML for the markup, do not forget to add the attribute `acom-ml="xml"` to the root tag of the markup.

### __Reactivity__

Map is reactive. Every time the range is changed, the variants generated are updated according to the range. To change the range, change the range in the JSON object in the `acom-map` attribute directly or use `updataRange`.

### Example 1 - Using Template

#### __Markup__

```html
<table>
  <thead>
    <tr>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody acom-map='{"data": "@data.users", "mapper": "@methods.userMapper"}'>
    <tr>
      <td>
        <img src="@datum.avator" />
      </td>
      <td>
        <span acom-text="@datum.username"></span>
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
      avator: "/users/avator-1.png",
      username: "user-1"
    },
    {
      avator: "/users/avator-2.png",
      username: "user-2"
    },
    {
      avator: "/users/avator-3.png",
      username: "user-3"
    }
  ]
};

const methods = {
  userMapper: async () => { data };
};

const utils = { methods };
// ...
const options = { ..., utils };
// ...
```

### Example 2 - Using creator

#### __Markup__

```html
<table>
  <thead>
    <tr>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody acom-map="@methods.userMapper"></tbody>
```

#### JS

```js
// ...
const data = {
  users: [
    {
      avator: "/users/avator-1.png",
      username: "user-1"
    },
    {
      avator: "/users/avator-2.png",
      username: "user-2"
    },
    {
      avator: "/users/avator-3.png",
      username: "user-3"
    }
  ]
};

const userMapper = () => {
  const createVariant = user => {
    return `
      <tr>
        <td>
          <img src="${user.avator}" />
        </td>
        <td>${user.username}</td>
      </tr>
    `;
  };

  return { data, creator: createVariant };
};

const methods = { userMapper };
const utils = { methods };
// ...
const options = { ..., utils };
// ...
```

`updateRange`

A function used to update the of the data used for [Map](#map). It is accessed via the element as `element.acom.updateRange`.

Syntax

```js
updateRange(newRange)
```

Parameters

`newRange`

An array indicating the new range.

Return Value

A promise that resolves to `undefined`



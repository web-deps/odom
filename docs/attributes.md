# Attributes

__Table of Contents__

- [Attributes](#attributes)
  - [Introduction](#introduction)
  - [`acom-display`](#acom-display)
  - [`html`](#html)
  - [`acom-loading`](#acom-loading)
  - [`acom-markup`](#acom-markup)
  - [`acom-ml`](#acom-ml)
  - [`acom-node`](#acom-node)
  - [`acom-placeholder`](#acom-placeholder)
  - [`acom-presence`](#acom-presence)
  - [`acom-scope`](#acom-scope)
  - [`acom-slot`](#acom-slot)
  - [`acom-src`](#acom-src)
  - [`acom-text`](#acom-text)
  - [`acom-visibility`](#acom-visibility)
  - [`xml`](#xml)
  - [Combinations](#combinations)
  - [Precedence](#precedence)

## Introduction

Markup elements in Acom may contain special attribute names and values which have special meaning. Most of these attribute names are prefixed with `acom-`. Let us look at what these attributes mean and their use cases.

## `acom-display`

This is used to specify the conditional `display`. For more on how it works and the values it takes, Refer to [Conditionals](./conditionals.md).

## `html`

This is used in markup that is not HTML. It is used to specify which HTML element the element on which the attribute is set is supposed to be converted to. If not set, element is converted to `HTMLDivElement`.

## `acom-loading`

This is used to specify the conditional `loading`. Refer to [Conditionals](conditionals.md#loading) for more details.

## `acom-markup`

This is used to specify the URI of `markup` on a target element. For external markup, its value is a path to the file. If the markup is internal, the value is the name of the markup in [`markups`](./api/create-component/utils.md#specific-utilities). For more information on the supported file types and markup languages, checkout [Markup](./assets.md#markup).

## `acom-ml`

This is used to indicate what markup language has been used for the `markup`. This is set on the root element of the markup. The value can be "html" or "xml". The default value is "html".

## `acom-node`

This is used to specify the URI of a node. If the node is external, the URI is the path to the module containing the node. If the node is internal to a component, the URI is the name of the node as specified in [`utils.nodes`](./api/create-component/utils.md).

## `acom-placeholder`

Used on placeholder elements. [Placeholders](./conditionals.md#placeholders) are used for [Conditionals](./conditionals.md).

## `acom-presence`

This is used to specify the conditional [Presence](./conditionals.md#presence). For more details on how it works, Refer to [Conditionals](conditionals.md#presence).

## `acom-scope`

This is the attribute set on the [`scope`](api/create-component/utils.md#scope) of a component. If not set by the user, it is set after the markup has been parsed. The value is set to the ID of the component.

## `acom-slot`

Target elements for slots require this attribute in order to be identified. In the imported component, each slot target is replaced with the matching slot in [`props.slots`](./data.md#props). The slots, in the importing component, do not require this attribute. All children of component target elements are considered to be slots. For more information on how slots in exporting components work, Refer to [Slots](./data.md#slots).

## `acom-src`

Components are inserted using `acom-src`. If the component is external, its value is a URI. If the component is internal, the value is the name of the component as specified in `[utils.components`](./api/create-component/utils.md#specific-utilities).

## `acom-text`

Text is inserted via `acom-text`. If the text is external, its value is a URI. If the text is internal, the value is the name of the text in [`utils.texts`](api/create-component/utils.md#specific-utilities).

## `acom-visibility`

This is used to specify the conditional `visibility`. Refer to [Conditionals](conditionals.md) for more information.

## `xml`

This is not a user defined attribute. It is used to indicate that the element was defined in other kinds of markup other than HTML. Its value is the original tag name. It is set during conversion to `HTMLElement`.

## Combinations

Some attributes can be combined on the same element and some can not. Assets attributes (e.g acom-src and acom-node) can not be combined. Contitionals attributes (e.g acom-display and acom-loading) also can not be combined. Attributes from one of thes these groups can be combined with an attribute from the other. All other attributes can be combined with each other and attributes from these groups. In cases where the incompatible attributes are combined, the [Precedence](#precedence) will be followed to determine which attribute will take effect.

## Precedence

Some attributes have a higher precedence than others. So, when you combine special attributes, the precedence will be followed. As a result, attributes with lower precedences take effect after those with higher precedences, or are ignored completely. Conditionals attributes have the highest precedence. Assets attributes have the second highest precedence. Multiply attributes have the third highest precedence. The attribute `acom-slot` has the fourth highest precedence. All other attributes have the lowest precedence equally.

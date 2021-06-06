# Attributes

**Table of Contents**

- [Attributes](#attributes)
  - [Introduction](#introduction)
  - [`html`](#html)
  - [`odom-display`](#odom-display)
  - [`odom-loading`](#odom-loading)
  - [`odom-markup`](#odom-markup)
  - [`odom-ml`](#odom-ml)
  - [`odom-node`](#odom-node)
  - [`odom-placeholder`](#odom-placeholder)
  - [`odom-presence`](#odom-presence)
  - [`odom-scope`](#odom-scope)
  - [`odom-slot`](#odom-slot)
  - [`odom-src`](#odom-src)
  - [`odom-text`](#odom-text)
  - [`odom-visibility`](#odom-visibility)
  - [`xml`](#xml)
  - [Combinations](#combinations)
  - [Precedence](#precedence)

## Introduction

Markup nodes in Odom may contain special attribute names and values which have special meaning. Most of these attribute names are prefixed with `odom-`. Let us look at what these attributes mean and their use cases.

## `html`

This is used in markup that is not HTML. It is used to specify which HTML element the element on which the attribute is set is supposed to be converted to. If not set, the element is converted to `HTMLDivElement`.

## `odom-display`

This is used to specify the conditional `display`. For more on how it works and the values it takes, Refer to [Conditionals](./conditionals.md).

## `odom-loading`

This is used to specify the conditional `loading`. Refer to [Conditionals](conditionals.md#loading) for more details.

## `odom-markup`

This is used to specify the URL of `markup` on a target element. For external markup, its value is a path to the file. If the markup is internal, the value is the name of the markup in [`markups`](./api/create-component/utils.md#specific-utilities). For more information on the supported file types and markup languages, refer to [Markup](./assets.md#markup).

## `odom-ml`

This is used to indicate what markup language has been used for the `markup`. This is set on the root element of the markup. The value can be `html` or `xml`. The default value is `html`.

## `odom-node`

This is used to specify the URL of an ES module that exports a node or a node [constructor](./assets.md#constructor) if the node is external. If the node is internal to a component, the value is the name of the node as specified in [`utils.nodes`](./api/create-component/utils.md#specific-utilities).

## `odom-placeholder`

Used on placeholder nodes. [Placeholders](./conditionals.md#placeholders) are used for [Conditionals](./conditionals.md).

## `odom-presence`

This is used to specify the conditional [Presence](./conditionals.md#presence). For more details on how it works, Refer to [Conditionals](conditionals.md#presence).

## `odom-scope`

This is the attribute set on the [`scope`](api/create-component/create-component.md#scope) of a component. If not set by the user, it is set after the markup has been parsed. The value is set to the ID of the component.

## `odom-slot`

Target nodes for slots require this attribute in order to be identified. In the child component, each slot target is replaced with the matching slot in [`props.slots`](./data.md#props). The slots, in the parent component, do not require this attribute. All children of component [target elements](./assets.md#target-elements) are considered to be slots. For more information on how slots work, refer to [Slots](./data.md#slots).

## `odom-src`

Components are inserted using `odom-src`. If the component is external, its value is a URL. If the component is internal, the value is the name of the component as specified in [`utils.components`](./api/create-component/utils.md#specific-utilities).

## `odom-text`

Text is inserted via `odom-text`. If the text is external, its value is a URL. If the text is internal, the value is the name of the text in [`utils.texts`](api/create-component/utils.md#specific-utilities).

## `odom-visibility`

This is used to specify the conditional `visibility`. Refer to [Visibility](conditionals.md#visibility) for more information.

## `xml`

This is not a user defined attribute. It is set on all elements that were created from other markup languages apart from HTML. Its value is set to the tag name of the original element.

## Combinations

Some attributes can be combined on the same element and some can not. Assets attributes (e.g `odom-src` and `odom-node`) can not be combined with each other. The same goes for conditionals attributes (e.g `odom-presence` and `odom-loading`). An attribute from one of the aforementioned groups can be combined with an attribute from the other. All other attributes can be combined with each other and attributes from these groups. In cases where the incompatible attributes are combined, the [Precedence](#precedence) will be followed to determine how the attributes will take effect.

## Precedence

Some attributes have a higher precedence than others. So, when you combine special attributes, the precedence will be followed. As a result, attributes with lower precedences take effect after those with higher precedences, or are ignored completely. Conditionals attributes have the highest precedence. Assets attributes have the second highest precedence. Multiply attributes have the third highest precedence. The attribute `odom-slot` has the fourth highest precedence. All other attributes have the lowest precedence equally.

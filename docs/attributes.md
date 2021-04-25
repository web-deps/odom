# __Attributes__

__Table of Contents__

- [__Attributes__](#attributes)
  - [__Introduction__](#introduction)
  - [`html`](#html)
  - [`acom-display`](#acom-display)
  - [`acom-node`](#acom-node)
  - [`acom-loading`](#acom-loading)
  - [`acom-ml`](#acom-ml)
  - [`acom-markup`](#acom-markup)
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


## __Introduction__

Markup in Acom may contain special attribute names and values which have special meaning.


Most attribute names are prefixed with `acom-`.

## `html`

This is used in markup that is not HTML. It is used to specify which HTML element the element on which the attribute is set is supposed to be converted to. If not set, element is converted to `<div>`.

## `acom-display`

This is used to specify the conditional `display`. For more on how it works and the values it takes, Refer to [Conditionals](conditionals.md).

## `acom-node`

This is used to specify the URI of an element. If the element is external, the URI is the path to the file containing the element. If the element is internal to a component, the URI is the name of the element as specified in `options.utils.elements`.

## `acom-loading`

This is used to specify the conditional `loading`. For more on how it works and the values it takes, Refer to [Conditionals](conditionals.md#loading).

## `acom-ml`

This is used to indicate what markup language has been used for the `markup`. The value can be `html` or `xml`.

## `acom-markup`

This is used to specify the URI of `markup` on a target element. For external markup, its value is a path to the file. If the markup is internal, the vallue is the name of the markup in `options.utils.markups`. For more information on the supported file types and markup languages, checkout [Assets](assets.md#markup). 

## `acom-placeholder`

Used on placeholder elements. [Placeholders](conditionals.md#placeholders) are used for [Conditionals](conditionals.md).

## `acom-presence`

This is used to specify the conditional [Presence](conditionals.md#presence). For more on how it works and the values it takes, Refer to [Conditionals](conditionals.md#presence).

## `acom-scope`

This is the attribute set on the `scope` of a component. If not set by the user, it is set after the markup has been parsed. The value is set to the ID of the component.

## `acom-slot`

Target elements for slots require this attribute in order to be identified. In the imported component, each slot target is replaced with the matching slot in `props.slots`. The slots, in the importing component, do not require this attribute. All children of component target elements are considred to be slots. For more information on how slots in exporting components work, Refer to [Slots](data.md#props).

## `acom-src`

Components are inserted using `acom-src`. If the component is external, its value is a URI. If the component is internal, the value is the name of the component as specified in `options.utils.components`

## `acom-text`

Text is inserted via `acom-text`. If the text is external, its value is a URI. If the text is internal, the value is the name of the text in `options.utils.texts`.

## `acom-visibility`

This is used to specify the conditional `visibility`. For more on how it works and the values it takes, Refer to [Conditionals](conditionals.md).

## `xml`

This is not a user defined attribute. It is used to indicate that the element was defined in other kinds of markup other than HTML. Its value is the original tag name. It is set during conversion to `HTMLElement`.

## Combinations

Some attributes can be combined on the same element and some can not. Assets attributes can not be combined. Contitionals attributes also can not be combined. Attributes from these groups can be combined. All other attributes can be combined with each other and attributes from these groups. In cases where the incompatible attributes are combined, the precedence will be followed to determine which attribute will take effect.

## Precedence

Some attributes have a higher precedence than others. So, when you combine special attributes, the precedence will be followed. As a result, attributes with lower precedences take effect after those with higher precedences, or are ignored completely. Conditionals attributes have the highest precedence. Assets attributes have the second highest precedence. Multiply attributes have the third highest precedence. The attribute `acom-slot` has the fourth highest precedence. All other attributes have the lowest precedence equally.
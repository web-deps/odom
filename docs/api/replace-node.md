# replaceNode

## Introduction

Used to replace one DOM node with another.

## Syntax

```js
replaceNode(target, node[, replacer])
```

## Parameters

- `target`:
  - Type: `Node`
  - Required: Yes.
  - Usage: Replaced by another node.

- `node`:
  - Type: `Node`
  - Required: Yes.
  - Usage: Replaces another node.

- `replacer`:
  - Type: `Function`
  - Required: No.
  - Usage: Replaces `target` with `node`.
  - Reference: [`replacer`](#replacer).

## Return Value

`undefined`

## replacer

### Description

Used to replace a DOM node with another. Using replacer, you can decide how a node replaces its target. You can apply animations such as slide, fade and the like if you like. If not provided, [`replaceNode`](#replaceNode) uses `Node.replaceWith` method to replace the node.

### Syntax

```js
replacer(target, node)
```

### Parameters

- `target`:
  - Type: `Node`
  - Required: Yes
  - Usage: Gets replaced by another node
- `node`:
  - Type: `Node`
  - Required: Yes
  - Usage: Replaces another node

### Return Value

`undefined`

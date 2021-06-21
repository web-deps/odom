# Lifecycle Hooks

## Description

Lifecycle hooks are methods called at specific stages of the lifecycle of a component. They are called immediately after certain processes have occurred. The names of the methods describe the processes after which they are called. For example, [`onIDSet`](./create-component.md#onidset) is invoked immediately after the ID of the component has been set.

## Syntax

```js
lifecycleHook(component)
```

Replace `lifecycleHood` with a name for a lifecycle hook. For example the lifecycle hook `onIDSet` would have the following syntax:

```js
onIDSet(component)
```

## Parameters

- `compnent`:
  - Type: `Object`
  - Required: No.
  - Usage: The component whose lifecycle the method is called on.

## Return Value

`undefined` or a promise that resolves to `undefined`.

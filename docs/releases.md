# Releases

## Introduction

This is a documentation of upcoming releases. Only minor and major releases are included. Date and time are given in [GMT](https://greenwichmeantime.com/).

## Version 1.1.0

### Features

- Lifecycle Hooks: The parameter [`options`](api/create-component/create-component.md#options) of [`createComponent`](./api/create-component/create-component.md) will include lifecycle hooks. The hooks will be invoked at certain stages of the lifecycle of a component.
- Custom Component Initialization: At the moment, using [`Component`](api/component/component.md) directly requires you to execute the processes handled by [`createComponent`](api/create-component/create-component.md). This feature will enable `createComponent` to take second argument, a customized component. The customized component will be initialized by `createComponent`.

### Progress

- [x] Add lifecycle hooks.
- [x] Add customized component as a parameter to [`createComponent`](api/create-component/create-component.md).
- [ ] Released

### Release Date

| Year | Month | Day |
| ---- | ----- | --- |
| 2021 | June  | 22  |

---
title: API Reference
order: 7
category: roact
description: An API reference for the Roact library for roblox-ts.
---

# Methods
## Roact.createElement
```ts
function createElement(
	component: string | typeof Roact.Component,
	props?:
		| Dictionary<string, any>
		| Properties<Roact.Component>,
	children?:
		| Roact.Element[]
		| Dictionary<string, Roact.Element[]>,
): Roact.Element;
```
Creates a new Roact element representing the given `component`. Elements are lightweight descriptions about what a Roblox Instance should look like, like a blueprint!

The children argument should be specified as a dictionary of names to elements.

`component` can be a string, a function, or a component class created by `class MyComponentClass extends Roact.Component`.

> _⚠️ Once props or children are passed into the createElement, make sure not to modify them! ⚠️_

## Roact.mount
```ts
function mount(
    element: Roact.Element,
    parent?: Instance,
    key?: string,
): Roact.ComponentInstanceHandle;
```

Creates a Roblox Instance given a Roact element, and optionally a parent to put it in, and a key to use as the instance's `Name`.

The result is a `ComponentInstanceHandle`, which is an opaque handle that represents this specific instance of the root component. You can pass this to APIs like `Roact.unmount` and the future debug API.

## Roact.reconcile
```ts
function reconcile(
    instanceHandle: ComponentInstanceHandle,
    element: Roact.Element,
): ComponentInstanceHandle;
```
Updates an existing instance handle with a new element, returning a new handle. This can be used to update a UI created with `Roact.mount` by passing in a new element with new props.

`reconcile` can be used to change the props of a component instance created with `mount` and is useful for putting Roact content into non-Roact applications.

> _⚠️ `Roact.reconcile` takes ownership of the `instanceHandle` passed into it and may unmount it and mount a new tree!_
> _Make sure to use the handle that `reconcile` returns in any operations after reconcile, including `unmount`. ⚠️_

## Roact.unmount
```ts
function unmount(instanceHandle: ComponentInstanceHandle): void;
```
Destroys the given `ComponentInstanceHandle` and all of its descendents. Does not operate on a Roblox Instance -- this must be given a handle that was returned by `Roact.mount`.

## Roact.oneChild
```ts
function oneChild(
    children?: Roact.Element[],
): Roact.Element | undefined;
```
Given a dictionary of children, returns a single child element.

If `children` contains more than one child, `oneChild` function will throw an error. This is intended to denote an error when using the component using `oneChild`.

If `children` is `undefined` or contains no children, `oneChild` will return undefined.

> _⚠️ You should ensure that the returned result is not `undefined` before returning it via the `render()` method. ⚠️_

## Roact.createRef
```ts
// implictly defined as typeof Instance reference
function createRef(): Roact.Ref;
```
```ts
// explicit type reference
function createRef<T extends Rbx_Instance>: Roact.Ref<T>;
```



# Component Classes

## class Roact.Component
The base component instance that can be extended to make stateful components.

```ts
class MyComponent extends Roact.Component<P, S>
```
- `P` is the type of the `props`.
- `S` is the type of the `state`.

Both can be omitted if not required. If you want to use `props` but not `state`, simply omit `S`. If you want to use `state` but not `props`, set your props as `{}`.


## class Roact.PureComponent
Exactly like `Roact.Component` except `shouldUpdate` is handled differently.
```ts
class MyPureCompopnent extends Roact.PureComponent<P, S>
```


## class Roact.Portal
```ts
interface PortalProps { instance: Instance; }
class Roact.Portal extends Roact.Component<PortalProps>
```
Used in [Portals](Portals).
> ⚠️ This class cannot be inherited

# Component API
## defaultProps
```ts
interface DefaultProps {
	value?: number;
}
class DefaultPropsExample extends Roact.Component<DefaultProps> {
    static defaultProps: DefaultProps = {
        value: 10,
    };
}
```
If `defaultProps` is defined on a stateful component, any props that aren't specified when a component is created will be taken from there.

This is useful for setting props that can be `undefined` to a value.

## props[Roact.Children]
```ts
class SingleChildComponent extends Roact.Component {
    public render(): Roact.Element {
        return Roact.oneChild(this.props[Roact.Children]);
    }
}
```
This contains any child elements that have been passed to this component.
## constructor
```ts
class MyComponent extends Roact.Component {
    constructor(props: P) {
        super(props);
        // ...
    }
}
```
The constructor is called exactly once when a new instance of a component is created. It can be used to set up the initial `state` as well as any non-`render` related values directly on the component.

## render

{% capture code %}
```ts
class HelloWorldComponent extends Roact.Component {
    public render(): Roact.Element {
        return Roact.createElement("TextLabel", {Text: "Hello, World!"});
    }
}
```
***
```jsx
class HelloWorldComponent extends Roact.Component {
    public render(): Roact.Element {
        return <textlabel Text="Hello, World!"/>;
    }
}
```
{% endcapture %}
{% include tabs.html sync="jsx" tabs="Vanilla,JSX" content=code %}

`render` describes what a component should display at the current instant in time.

> ℹ️ Roact assumes that `render` act likes a pure function: the result of `render` must depend only on `props` and `state`, and it must not have side-effects.

> ⚠️ rbx-roact will not compile without `render` being defined.

## setState
```ts
class MyComponent extends Roact.Component<P, S>{
    public setState(
        stateFn: (prevState: Readonly<S>, props: P): AnyKeyValueOf<S>,
    ): void;
    public setState(
        state: AnyKeyValueOf<S>,
    ): void;
}
```

> ⚠️ `setState` can be called from anywhere except:
>
> Lifecycle hooks: `willUnmount`
> Pure functions: `render`, `shouldUpdate`
>
> Calling `setState` inside of `init` or `willUpdate` has special behavior. Because Roact is already going to update component in these cases, that update will be replaced instead of another being scheduled.
>
> Roact may support calling `setState` in currently-disallowed places in the future.

> ⚠️ `setState` **does not always resolve synchronously**! Roact may batch and reschedule state updates in order to reduce the number of total renders.
>
> When depending on the previous value of state, like when incrementing a counter, use the functional form to guarantee that all state updates occur!
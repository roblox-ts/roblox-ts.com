---
title: Components - Roact
order: 3
category: roact
description: A manual for using the view management library Roact with roblox-ts.
---
_( This is a typescript adapted version of https://roblox.github.io/roact/guide/components/ )_

----

Components are encapsulated, reusable pieces of UI that you can combine to build a complete UI.

Components accept inputs, known as props, and return elements to describe the UI that should represent those inputs.


# Functional and Stateful Components
Components come in two flavors in Roact, functional and stateful.

Functional components are the simplest: they're just functions that accept props as their only argument, and return some elements.


{% capture code %}
```ts
function MyComponent(props: {name: string}) {
	return Roact.createElement("TextLabel", {
		Text: `Hello, ${props.name}`
	});
}
```
***
```jsx
function MyComponent(props: {name: string}) {
	return <textlabel Text={`Hello, ${props.name}`}/>;
}
```
{% endcapture %}
{% include tabs.html sync="jsx" tabs="Vanilla,JSX" content=code %}


Roact also has stateful components, which have additional features, like lifecycle methods and state, that we'll talk about in a later section.

You can create a stateful component by creating a class and extending `Roact.Component`.



{% capture code %}
```ts
interface GreetingProps {
	name: string;
}

class Greeting extends Roact.Component<GreetingProps> {
	public render(): Roact.Element {
		return Roact.createElement("TextLabel", {
			Text: `Hello, ${this.props.name}`
		});
	}
}
```
***
```jsx
interface GreetingProps {
	name: string;
}

class Greeting extends Roact.Component<GreetingProps> {
	public render(): Roact.Element {
		return <textlabel Text={`Hello, ${this.props.name}`}/>;
	}
}
```
{% endcapture %}
{% include tabs.html sync="jsx" tabs="Vanilla,JSX" content=code %}
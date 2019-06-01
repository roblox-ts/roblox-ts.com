---
title: Components
order: 3
category: roact
description: A guide on how to use functional components using the Roact library with roblox-ts.
---
_TypeScript adaption of [Roact Components](https://roblox.github.io/roact/guide/components/)_

----

Components are encapsulated, reusable pieces of UI that you can combine to build a complete UI.

Components accept inputs, known as props, and return elements to describe the UI that should represent those inputs.


# Functional and Stateful Components
Components come in two flavors in Roact, functional and stateful.

Functional components are the simplest: they're just functions that accept props as their only argument, and return some elements.


{% capture code %}
```ts
function MyComponent(props: { name: string }) {
	return Roact.createElement("TextLabel", {
		Text: `Hello, ${props.name}`,
	});
}
```
***
```jsx
function MyComponent(props: { name: string }) {
	return <textlabel Text={`Hello, ${props.name}`} />;
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
			Text: `Hello, ${this.props.name}`,
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
		return <textlabel Text={`Hello, ${this.props.name}`} />;
	}
}
```
{% endcapture %}
{% include tabs.html sync="jsx" tabs="Vanilla,JSX" content=code %}

# Using Components
In our previous examples, we passed strings to `Roact.createElement` or element tags to create elements that represented Roblox Instances.

We can also pass our custom components to create elements that represent them:

{% capture code %}
```ts
const hello = Roact.createElement(Greeting, {
	name: "Rick James",
});
```
***
```jsx
const hello = <Greeting name="Rick James" />;
```
{% endcapture %}
{% include tabs.html sync="jsx" tabs="Vanilla,JSX" content=code %}

The `name` value is passed to our component as props, which we can reference as the `props` argument in our functional component or `this.props` in our stateful component.

# Components in Components
Components are designed to make it easy to re-use pieces of UI, so naturally, we can use components inside other components!

{% capture code %}
```ts
function Greeting(props: { name: string }) {
	return Roact.createElement("TextLabel", {
		Text: `Hello, ${props.name}`,
	});
}

function GreetEveryone() {
	return Roact.createElement(
		"ScreenGui",
		{},
		{
			Layout: Roact.createElement("UIListLayout"),
			HelloJoe: Roact.createElement(Greeting, {
				name: "Joe",
			}),
			HelloMary: Roact.createElement(Greeting, {
				name: "Mary",
			}),
		},
	);
}
```
***
```jsx
function Greeting(props: { name: string; Key?: string }) {
	return <textlabel Text={`Hello, ${props.name}`} />;
}

function GreetEveryone() {
	return (
		<screengui>
			<uilistlayout Key="Layout" />
			<Greeting Key="HelloJoe" name="Joe" />
			<Greeting Key="HelloMary" name="Mary" />
		</screengui>
	);
}
```
{% endcapture %}
{% include tabs.html sync="jsx" tabs="Vanilla,JSX" content=code %}


Applications built using Roact usually have one component at the top of the tree, and include all other pieces as children.

# Incrementing Counter, Part Two
We can revisit the incrementing counter example from the previous section, now using a functional component. Changed sections are highlighted.


{% capture code %}
```ts
import * as Roact from "roact";
const Players = game.GetService("Players");

function Clock(props: { currentTime: number }) {
	const { currentTime } = props;

	return Roact.createElement(
		"ScreenGui",
		{},
		{
			TimeLabel: Roact.createElement("TextLabel", {
				Size: new UDim2(1, 0, 1, 0),
				Text: `Time Elapsed: ${currentTime}`,
			}),
		},
	);
}

const PlayerGui = Players.LocalPlayer!.FindFirstChildOfClass(
	"PlayerGui",
);

let currentTime = 0;

const clockElement = Roact.createElement(Clock, {
	currentTime: currentTime,
});

let handle = Roact.mount(clockElement, PlayerGui, "Clock UI");

while (true) {
	wait(1);

	currentTime++;
	handle = Roact.reconcile(
		handle,
		Roact.createElement(Clock, {
			currentTime: currentTime,
		}),
	);
}
```
***
```jsx
import * as Roact from "roact";
const Players = game.GetService("Players");

function Clock(props: { currentTime: number }) {
	const { currentTime } = props;

	return (
		<screengui>
			<textlabel
				Key="TimeLabel"
				Size={new UDim2(1, 0, 1, 0)}
				Text={`Time Elapsed: ${currentTime}`}
			/>
		</screengui>
	);
}

const PlayerGui = Players.LocalPlayer!.FindFirstChildOfClass(
	"PlayerGui",
);

let currentTime = 0;

const clockElement = <Clock currentTime={currentTime} />;

let handle = Roact.mount(clockElement, PlayerGui, "Clock UI");

while (true) {
	wait(1);

	currentTime++;
	handle = Roact.reconcile(
		handle,
		<Clock currentTime={currentTime} />,
	);
}
```
{% endcapture %}
{% include tabs.html sync="jsx" tabs="Vanilla,JSX" content=code %}
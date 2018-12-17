---
title: State And Lifecycle
order: 4
category: roact
description: Guide on stateful components
---

_Typescript adaptation of (https://roblox.github.io/roact/guide/state-and-lifecycle/)_

-----

In the previous section, we talked about using components to create reusable chunks of state, and introduced functional and stateful components.

Stateful components do everything that functional components do, but have the addition of mutable state and lifecycle methods.

# State
**State** is the term we use to talk about values that are owned by a component itself.

Unlike **props**, which are passed to a component from above, state is created within a component and can only be updated by that component.

We can set up the initial state of a stateful component inside of the constructor:

```ts
interface MyComponentState {
	currentTime: number;
}
class MyComponent extends Roact.Component<
	{},
	MyComponentState
> {
	constructor() {
		super({});
		this.setState({
			currentTime: 0,
		});
	}
}
```

To update state, we use a special method named `setState`. `setState` will merge any values we give it into our state. It will overwrite any existing values, and leave any values we don't specify alone.

There's another form of `setState` we can use. When the new state we want our component to have depends on our current state, like incrementing a value, we use this form:

```ts
// ...
class MyComponent extends Roact.Component<
	{},
	MyComponentState
> {
	// ...
	public didMount() {
		self.setState(state => {
			return { currentTime: state.currentTime + 1 };
		});
	}
}
```

In this case, we're passing a function to `setState`. This function is called and passed the current state, and returns a new state. It can also return `undefined` to abort the state update, which lets Roact make some handy optimizations.

Right now, this version of setState works exactly the same way as the version that accepts an object. In the future, Roact will support optimizations that make this difference more important, like [asynchronous rendering](https://github.com/Roblox/roact/issues/18).

# Lifecycle Methods
Stateful components can provide methods to Roact that are called when certain things happen to a component instance.

Lifecycle methods are a great place to send off network requests, measure UI (with the help of refs), wrap non-Roact components, and produce other side-effects.

The most useful lifecycle methods are generally didMount and didUpdate. Most components that do things that are difficult to express in Roact itself will use these lifecycle methods.

Here's a chart of all of the methods available. You can also check out the Lifecycle Methods section of the API reference for more details.

![roact lifecycle diagram](https://roblox.github.io/roact/images/lifecycle.svg)

# Incrementing Counter, Part Three
Building on the previous two examples, we can expand the incrementing counter to move the counter state and loop inside Roact, and use `setState` to trigger a re-render instead of `Roact.reconcile`.

Generally, this ticking clock demonstrates how many stateful components are structured in Roact.

{% capture code %}
```ts
const Players = game.GetService("Players");

interface ClockState {
	currentTime: number;
}

class Clock extends Roact.Component<{}, ClockState> {
	private running: boolean = false;

	constructor() {
		super({});

		this.setState({
			currentTime: 0,
		});
	}

	public render(): Roact.Element {
		const { currentTime } = this.state;

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

	public didMount() {
		this.running = true;

		spawn(() => {
			while (this.running) {
				this.setState(state => {
					return {
						currentTime: state.currentTime + 1,
					};
				});

				wait(1);
			}
		});
	}

	public willUnmount() {
		this.running = false;
	}
}

const PlayerGui = Players.LocalPlayer!.FindFirstChildOfClass(
	"PlayerGui",
);
const handle = Roact.mount(<Clock />, PlayerGui, "Clock UI");

wait(10);
Roact.unmount(handle);
```
***
```jsx
const Players = game.GetService("Players");

interface ClockState {
	currentTime: number;
}

class Clock extends Roact.Component<{}, ClockState> {
	private running: boolean = false;

	constructor() {
		super({});

		this.setState({
			currentTime: 0,
		});
	}

	public render(): Roact.Element {
		const { currentTime } = this.state;

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

	public didMount() {
		this.running = true;

		spawn(() => {
			while (this.running) {
				this.setState(state => {
					return {
						currentTime: state.currentTime + 1,
					};
				});

				wait(1);
			}
		});
	}

	public willUnmount() {
		this.running = false;
	}
}

const PlayerGui = Players.LocalPlayer!.FindFirstChildOfClass(
	"PlayerGui",
);
const handle = Roact.mount(<Clock />, PlayerGui, "Clock UI");

wait(10);
Roact.unmount(handle);
```
{% endcapture %}
{% include tabs.html sync="jsx" tabs="Vanilla,JSX" content=code %}
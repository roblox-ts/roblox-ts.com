---
title: Portals
order: 5
category: roact
description: A guide on how to use portals using the Roact library with roblox-ts.
---

_TypeScript adaptation of [Roact Portals](https://roblox.github.io/roact/advanced/portals/)_

---

**Portals** are a special kind of component provided by Roact that enable components to render objects into a separate, non-Roact Instance.

To create a portal, use the `Roact.Portal` component with `createElement` or in JSX use `<Roact.Portal/>`.

Parts are not native JSX elements in `roblox-ts`. This is by design as Roact is intended for UI use. To get around that, you will have to use `Roact.createElement`.
{:.warn}

{% capture code %}

```ts
function PartInWorkspace() {
	return Roact.createElement(Roact.Portal, {
		target: Workspace;
	}, {
		SomePart: Roact.createElement("Part", {
			Anchored: true,
		}),
	})
}
```

---

```jsx
function PartInWorkspace() {
	return (
		<Roact.Portal target={Workspace}>
			{Roact.createElement("Part", {
				Anchored: true,
			})}
		</Roact.Portal>
	);
}
```

{% endcapture %}

{% include tabs.html sync="jsx" tabs="Vanilla,JSX" content=code %}

---

When we create `PartInWorkspace`, even if it's deep into our Roact tree, a `Part` Instance named SomePart will be created in Workspace.

Portals should only be created to objects that aren't managed by Roact!
{:.warn}

One particularly good use for portals is full-screen modal dialogs. When we render a modal dialog, we want it to take over the entire screen, but we want components deep in the tree to be able to create them!

{% capture code %}

```ts
const PlayerGui = game
	.GetService("Players")
	.LocalPlayer!.FindFirstChildOfClass("PlayerGui");

interface ModalProps {
	onClose: () => void;
}

function ModalTS(props: ModalProps) {
	return Roact.createElement(
		Roact.Portal,
		{
			target: PlayerGui,
		},
		{
			Modal: Roact.createElement(
				"ScreenGui",
				{},
				{
					Label: Roact.createElement("TextButton", {
						Size: new UDim2(1, 0, 1, 0),
						Text: "Click me to close!",

						[Roact.Event.Activated]: () => {
							props.onClose();
						},
					}),
				},
			),
		},
	);
}

interface ModalButtonState {
	dialogOpen: boolean;
}

class ModalButtonTS extends Roact.Component<
	{},
	ModalButtonState
> {
	constructor() {
		super();
		this.state = {
			dialogOpen: true,
		};
	}

	public render(): Roact.Element {
		let dialog: Roact.Element;

		if (this.state.dialogOpen) {
			dialog = Roact.createElement(ModalTS, {
				onClose: () => {
					this.setState({ dialogOpen: false });
				},
			});
		}

		return Roact.createElement(
			"TextButton",
			{
				Size: new UDim2(0, 400, 0, 300),
				Text: "Click me to open modal dialog!",

				[Roact.Event.Activated]: () => {
					this.setState({ dialogOpen: true });
				},
			},
			{
				Dialog: dialog,
			},
		);
	}
}
```

---
{% raw %}
```jsx
const PlayerGui = game
	.GetService("Players")
	.LocalPlayer!.FindFirstChildOfClass("PlayerGui");

interface ModalProps {
	onClose: () => void;
}

function ModalTSX(props: ModalProps) {
	return (
		<Roact.Portal target={PlayerGui}>
			<screengui Key="Modal">
				<textbutton
					Key="Label"
					Size={new UDim2(1, 0, 1, 0)}
					Text="Click me to close!"
					Event={{
						Activated: () => props.onClose(),
					}}
				/>
			</screengui>
		</Roact.Portal>
	);
}

interface ModalButtonState {
	dialogOpen: boolean;
}

class ModalButtonTSX extends Roact.Component<{}, ModalButtonState> {
	constructor() {
		super({});
		this.state = {
			dialogOpen: true,
		};
	}

	public render(): Roact.Element {
		let dialog: Roact.Element;

		if (this.state.dialogOpen) {
			dialog = (
				<ModalTSX
					onClose={() =>
						this.setState({ dialogOpen: false })
					}
				/>
			);
		}

		return (
			<textbutton
				Size={new UDim2(0, 400, 0, 300)}
				Text="Click me to open modal dialog!"
				Event={{
					Activated: () =>
						this.setState({
							dialogOpen: true,
						}),
				}}
			>
				{dialog!}
			</textbutton>
		);
	}
}
```
{% endraw %}
{% endcapture %}

{% include tabs.html sync="jsx" tabs="Vanilla,JSX" content=code %}

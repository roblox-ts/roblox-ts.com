---
title: Useful Packages
order: 4
description: A list of useful NPM packages created specifically for roblox-ts.
---

Here's a list of useful npm packages that are compatible with **roblox-ts**.

## [rbx-services](https://www.npmjs.com/package/rbx-services)
Exports most commonly used Roblox services. This makes them really easy to use.
```ts
import { Players } from "rbx-services";
Players.PlayerAdded.Connect(player =>
	print("Player was added!", player.Name),
);
```

## [rbx-event](https://www.npmjs.com/package/rbx-event)
A type safe implementation of BindableEvents written in TypeScript

```ts
import { Event } from "rbx-event";
const e = new Event<[number, string]>();
e.connect((a, b) => print(a, b));
let n = 0;
while (true) {
    wait(1);
    e.fire(++n, "test");
}
```

## [rbx-inspect](https://www.npmjs.com/package/rbx-inspect)
A copy of [kikito's inspect.lua library](https://github.com/kikito/inspect.lua) with type definitions.
```ts
import inspect = require("rbx-inspect");
print(inspect([1, 2, 3]));
```

## [rbx-datastore2](https://www.npmjs.com/package/rbx-datastore2)
A copy of [Kampfkarren's DataStore2 library](https://devforum.roblox.com/t/how-to-use-datastore2-data-store-caching-and-data-loss-prevention/136317) with type definitions.
```ts
import { ReplicatedStorage, Players } from "rbx-services";
import DataStore2 = require("rbx-datastore2");

Players.PlayerAdded.Connect(player => {
	const coinsStore = DataStore2<number>("coins", player);

	const remote = ReplicatedStorage.CoinAmount as RemoteEvent;
	function callRemote(value: number) {
		remote.FireClient(player, value);
	}

	// Fire a remote event to the player telling them how many coins they have.
	// If this is their first time playing the game, they'll start out with 100.
	callRemote(coinsStore.Get(100));

	// Everytime the coin store updates, we'll send the RemoteEvent again.
	coinsStore.OnUpdate(callRemote);
});
```

## [rbx-resources](https://www.npmjs.com/package/rbx-resources)
rbx-resources lets you easily access game assets and create named instances in your game.

```ts
const event = getResource(RemoteEvent, "SomeRemoteEvent");
const sword = getResource<Model>("Weapon", "Darkheart");
const bindable = getLocalResource(BindableEvent, "FooBarBaz");
```

## [rbx-roact](https://www.npmjs.com/package/rbx-roact)
TypeScript and JSX support for [Roact](https://github.com/Roblox/roact).
```tsx
import * as Roact from "rbx-roact";

const LocalPlayer = game.GetService("Players")
	.LocalPlayer as Player;
const PlayerGui = LocalPlayer.FindFirstChildOfClass(
	"PlayerGui",
);

const tree = (
	<screengui>
		<textlabel
			Key="Label"
			Text="Hello, World!"
			Size={new UDim2(1, 0, 1, 0)}
		/>
	</screengui>
);

Roact.mount(tree, PlayerGui, "HelloWorld");
```

## [rbx-cmdr](https://www.npmjs.com/package/rbx-cmdr)
Cmdr is a fully extensible and type safe command console for Roblox developers.

Great for admin commands, but does much more.
- Make commands that tie in specifically with your game systems.
- Intelligent autocompletion and instant validation.
- Run commands programmatically on behalf of the local user.
- Bind commands to user input.

## [rbx-t](https://github.com/osyrisrblx/rbx-t)
t enables you to write complex type definitions and use them either at runtime or statically.
Provides a robust set of tools to sanitize unknown data.
Useful for making sure your remote events give the right data!

```ts
// complex type definition
const tPlayer = t.interface({
    name: t.string,
    score: t.number,
    data: t.interface({
        inventory: t.array(t.number),
        inventorySize: t.number,
    })
});

// runtime usage
function bar(player: unknown) {
    if (tPlayer(player)) {
        print(player.data.inventorySize);
    }
}

// static usage
type tPlayer = t.static<typeof tPlayer>;
function foo(player: tPlayer) {
    print(player.data.inventorySize);
}
```

## [rbx-net](https://github.com/roblox-aurora/rbx-net)
Roblox Networking Library (rbx-net) is a useful library for abstracting Roblox networking.
Not only does it make networking simpler, it also adds more functionality to remotes such as asynchronous function calls, result caching, invoking/calling groups of clients and much more.

### Events

{% capture code %}
```ts
import Net from "rbx-net";

// Create an Event
const myRemote = Net.CreateEvent("EventName");

// Create an event OOP style
const myRemote = new Net.ServerEvent("EventName");

// Connect events to listeners
function onMyRemoteEvent(player: Player) {
	print(player, "called me! :D");
}
myRemote.Connect(onMyRemoteEvent);

// Fire an event to a client
myRemote.SendToPlayer(game.Players.Vorlias, "Hello, World!");

// Fire an event to multiple clients
myRemote.SendToPlayers([game.Players.Vorlias, game.Players.Osyris], "Hello, World!");

// Fire an event to all clients
myRemote.SendToAllPlayers("Hello, World!");
```
***
```ts
import Net from "rbx-net";

function onClientMyRemoteEvent() {
	print("The server called me!")
}

// await for client event, then connect
const myRemote = await Net.WaitForClientEventAsync("EventName");
myRemote.Connect(onClientMyRemoteEvent);

// Get an event OOP style (Will error if doesn't exist, use Async methods!)
const myRemote = new Net.ClientEvent("EventName");

// wait for event (promise), then connect or if timeout - display message
Net.WaitForClientEventAsync("EventName").then(event => {
	// connect the event
	event.Connect(onClientMyRemoteEvent);
}, failMsg => warn(failMsg));

// Send an event to the server!
myRemote.SendToServer("Hi server! :D");
```
{% endcapture %}
{% include tabs.html sync="ts" tabs="Server,Client" content=code %}

### Functions

{% capture code %}
```ts
import Net from "rbx-net";

// Create a function
const myFunction = Net.CreateFunction("FunctionName");

// Create a function OOP style
const myFunction = new Net.ServerFunction("FunctionName");

// Call a client (await)
const result = await myFunction.CallPlayerAsync("Hello?");

// Call a client (promise)
myFunction.CallPlayerAsync("Hello?").then(
	result => print(result), 
	errorMsg => warn(errorMsg)
);

// Create a callback for when clients call the server
myFunction.Callback = (player: Player) => {
	return player.Name:reverse(); // will return username reversed
};

// Set the amount of seconds the remote caches a return value when retrieved by client
myFunction.ClientCache = 10; // 10 seconds
```
***
```ts
import Net from "rbx-net";

// Get a function OOP style (Will error if doesn't exist, use Async methods!)
const myRemote = new Net.ClientFunction("EventName");

// Get function (await)
const myFunction = await Net.WaitForFunctionAsync("FunctionName");
myFunction.Callback = () => {
	return "Hi from the server!";
};

// Get function (promise)
const myFunction = Net.WaitForFunctionAsync("FunctionName").then(func => {
	// callback inside promise
	func.Callback = () => {
		return "Hi from the server!";
	};
}, errorMsg => warn(errorMsg));

// Create a callback for when the server calls the client
myFunction.Callback = () => {
	return "hi I'm the client " + game.Players.LocalPlayer!.Name;
};
```
{% endcapture %}
{% include tabs.html sync="ts" tabs="Server,Client" content=code %}
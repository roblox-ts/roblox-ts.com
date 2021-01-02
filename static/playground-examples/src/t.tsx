import { t } from "@rbxts/t";

// create a t type
const MyPlayer = t.interface({
	name: t.string,
	score: t.number,
	inventory: t.interface({
		size: t.number,
	}),
});

// create a TypeScript type from the t type
type MyPlayer = t.static<typeof MyPlayer>;

// this function uses MyPlayer as a typescript type
function takesPlayer(player: MyPlayer) {
	print(`${player.name} has a score of ${player.score}`);
}

// this function uses MyPlayer as a value which is a typecheck function
function takesUnknown(player: unknown) {
	if (MyPlayer(player)) {
		takesPlayer(player);
		print(player.inventory.size);
	}
}

takesUnknown({
	name: "Player",
	score: 123,
	inventory: {
		size: 999,
	},
});

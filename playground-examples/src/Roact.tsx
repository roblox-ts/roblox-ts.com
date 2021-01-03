import Roact from "@rbxts/roact";

interface GreetingProps {
	name: string;
}

class Greeting extends Roact.Component<GreetingProps> {
	public render(): Roact.Element {
		return (
			<textbutton
				Text={`Hello, ${this.props.name}`}
				TextSize={22}
				Font={Enum.Font.Gotham}
				Event={{ MouseButton1Click: () => print("Click!") }}
			/>
		);
	}
}

const greeting = <Greeting name="Player" />;

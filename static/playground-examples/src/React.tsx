import React from "@rbxts/react";

interface GreetingProps {
	name: string;
}

class Greeting extends React.Component<GreetingProps> {
	public render(): React.Element {
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

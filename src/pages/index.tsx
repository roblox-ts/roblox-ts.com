import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import CodeBlock from "@theme/CodeBlock";

interface TextLinkProps {
	url: string;
}

const TextLink: React.FunctionComponent<TextLinkProps> = props => (
	<a href={props.url} target="_blank">
		{props.children}
	</a>
);

interface FeatureProps {
	title: string;
	description: JSX.Element;
}

const features: Array<FeatureProps> = [
	{
		title: "Type Safety",
		description: (
			<>
				With static types, you'll never run into errors caused by typos, indexing an undefined value, or passing
				the wrong type of value into a function ever again.
			</>
		),
	},
	{
		title: "Community & Ecosystem",
		description: (
			<>
				An active community with an ecosystem consisting of a growing number of community-made{" "}
				<a href="https://www.npmjs.com/org/rbxts">packages</a>. Many popular modules for Roblox already have
				typings written for roblox-ts.
			</>
		),
	},
	{
		title: "Unparalleled Tooling",
		description: (
			<>
				Allows access to a large number of existing tools made for TypeScript. Use industry standard tools like{" "}
				<TextLink url="https://eslint.org/">ESLint</TextLink>,{" "}
				<TextLink url="https://code.visualstudio.com/">VSCode</TextLink>,{" "}
				<TextLink url="https://prettier.io/">Prettier</TextLink>, and more!
			</>
		),
	},
];

const EXAMPLE_CODE = `
import { CollectionService } from "@rbxts/services";

for (const obj of CollectionService.GetTagged("Lava")) {
    if (obj.IsA("BasePart")) {
        obj.Touched.Connect(part =>
            part
                .Parent
                ?.FindFirstChildOfClass("Humanoid")
                ?.TakeDamage(100)
        );
    }
}
`.trim();

function Feature({ title, description }: FeatureProps) {
	return (
		<div className={`col col--4`}>
			<div className={`card ${styles.feature}`}>
				<div className="card__header">
					<h3>{title}</h3>
				</div>
				<div className="card__body">
					<p>{description}</p>
				</div>
			</div>
		</div>
	);
}

export default () => {
	const context = useDocusaurusContext();
	const { siteConfig = {} } = context;
	return (
		<Layout noFooter>
			<header className={`hero ${styles.heroBanner}`}>
				<div className="container">
					<h1 className={`hero__title ${styles.title}`}>{siteConfig.title}</h1>
					<p className="hero__subtitle">
						A <TextLink url="https://www.typescriptlang.org/">TypeScript</TextLink>
						-to-
						<TextLink url="https://roblox.github.io/luau/">Luau</TextLink> Compiler for{" "}
						<TextLink url="https://www.roblox.com/">Roblox</TextLink>
					</p>
					<div className={styles.buttons}>
						<Link
							className={`button button--outline button--primary button--lg ${styles.getStarted}`}
							to={useBaseUrl("docs/")}
						>
							Get Started
						</Link>
						<Link
							className={`button button--outline button--secondary button--lg ${styles.getStarted}`}
							to={useBaseUrl("playground/")}
						>
							Playground
						</Link>
					</div>
				</div>
			</header>
			<main>
				<section className={styles.codeExample}>
					<div className="container">
						<div className="row row--no-gutters">
							<div className="col col--2" />
							<div className="col col--8">
								<CodeBlock className="ts">{EXAMPLE_CODE}</CodeBlock>
							</div>
							<div className="col col--2" />
						</div>
					</div>
				</section>
				<section className={styles.features}>
					<div className="container">
						<div className="row">
							{features.map((props, idx) => (
								<Feature key={idx} {...props} />
							))}
						</div>
					</div>
				</section>
			</main>
		</Layout>
	);
};

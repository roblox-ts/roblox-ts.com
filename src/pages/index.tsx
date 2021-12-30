import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import CodeBlock from "@theme/CodeBlock";

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

interface FeatureCardProps {
	title: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, children }) => (
	<div className={`col col--4 ${styles.featureWrapper}`}>
		<div className={`card ${styles.feature}`}>
			<div className="card__header">
				<h3>{title}</h3>
			</div>
			<div className="card__body">{children}</div>
		</div>
	</div>
);

export default () => {
	const context = useDocusaurusContext();
	const { siteConfig } = context;
	return (
		<Layout noFooter>
			<header className={`hero ${styles.heroBanner}`}>
				<div className="container">
					<h1 className={`hero__title ${styles.title}`}>{siteConfig.title}</h1>
					<p className="hero__subtitle">
						A{" "}
						<a href="https://www.typescriptlang.org/" target="_blank">
							TypeScript
						</a>
						-to-
						<a href="https://luau-lang.org/" target="_blank">
							Luau
						</a>{" "}
						Compiler for{" "}
						<a href="https://www.roblox.com/" target="_blank">
							Roblox
						</a>
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
							<FeatureCard title="Type Safety">
								With static types, you'll never run into errors caused by typos, indexing an undefined
								value, or passing the wrong type of value into a function ever again.
							</FeatureCard>
							<FeatureCard title="Community & Ecosystem">
								An active community with an ecosystem consisting of a growing number of community-made{" "}
								<a href="https://www.npmjs.com/org/rbxts" target="_blank">
									packages
								</a>
								. Many popular modules for Roblox already have typings written for roblox-ts.
							</FeatureCard>
							<FeatureCard title="Unparalleled Tooling">
								Allows access to a large number of existing tools made for TypeScript. Use industry
								standard tools like{" "}
								<a href="https://eslint.org/" target="_blank">
									ESLint
								</a>
								,{" "}
								<a href="https://code.visualstudio.com/" target="_blank">
									VSCode
								</a>
								,{" "}
								<a href="https://prettier.io/" target="_blank">
									Prettier
								</a>
								, and more!
							</FeatureCard>
						</div>
					</div>
				</section>
			</main>
		</Layout>
	);
};

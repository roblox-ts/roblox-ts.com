import BrowserOnly from "@docusaurus/BrowserOnly";
import Layout from "@theme/Layout";
import React, { Suspense } from "react";

const Playground = React.lazy(() => import("../../components/Playground"));

export default () => {
	return (
		<div style={{ overflow: "hidden" }}>
			<Layout noFooter>
				<BrowserOnly>
					{() => (
						<Suspense fallback={<div />}>
							<Playground />
						</Suspense>
					)}
				</BrowserOnly>
			</Layout>
		</div>
	);
};

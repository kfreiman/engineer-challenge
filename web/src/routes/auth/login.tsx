import { handleFlowError, loginUrl } from "@ory/client-fetch";
import { Login } from "@ory/elements-react/theme";
import {
	createFileRoute,
	redirect as routerRedirect,
} from "@tanstack/react-router";
import { AuthCard } from "@/components/auth/Card";
import { oryCli, oryClientConfig } from "@/lib/auth";
import { router } from "@/main";


export const Route = createFileRoute("/auth/login")({
	component: RouteComponent,
	validateSearch: (search) =>
		search as {
			flow: string;
		},
	loaderDeps: ({ search: { flow } }) => ({
		flow,
	}),
	loader: async ({ deps: { flow } }) => {
		const flowID = flow;
		const onRestartFlow = () => {
			throw routerRedirect({
				href: loginUrl(oryClientConfig as { sdk: { url: string } }),
			});
		};

		const onValidationError = (body: any) => {
			console.log(body);
		};

		const onRedirect = (url: string) => {
			router.history.push(url);
		};

		if (!flowID) {
			onRestartFlow();
			return { flow: null };
		}

		const flowEntity = await oryCli
			.getLoginFlowRaw({ id: flowID })
			.then((res) => res.value())
			.catch(
				handleFlowError({
					onValidationError,
					onRestartFlow,
					onRedirect,
				}),
			);

		return { flow: flowEntity };
	},
});

function RouteComponent() {
	const data = Route.useLoaderData();
	if (!data.flow) {
		return <div>loading</div>;
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<Login
				flow={data.flow}
				config={oryClientConfig}
				components={{
					Card: { Root: AuthCard },
				}}
			/>
		</div>
	);
}

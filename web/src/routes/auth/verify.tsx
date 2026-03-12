import { handleFlowError, verificationUrl } from "@ory/client-fetch";
import { Verification } from "@ory/elements-react/theme";
import {
	createFileRoute,
	redirect as routerRedirect,
} from "@tanstack/react-router";
import { AuthCard } from "@/components/auth/Card";
import { oryCli, oryClientConfig } from "@/lib/auth";
import { router } from "@/main";

export const Route = createFileRoute("/auth/verify")({
	component: RouteComponent,
	validateSearch: (search: Record<string, unknown>) => ({
		flow: search.flow as string | undefined,
		return_to: search.return_to as string | undefined,
	}),
	loaderDeps: ({ search: { flow, return_to } }) => ({
		flow,
		return_to,
	}),
	loader: async ({ deps: { flow, return_to } }) => {
		const onRestartFlow = () => {
			throw routerRedirect({
				to: "/auth/verify",
				search: {
					flow,
					return_to,
				},
				replace: true,
			});
		};

		const onValidationError = (body: any) => {
			console.error("Verification validation error:", body);
		};

		const onRedirect = (url: string) => {
			router.history.push(url);
		};

		if (!flow) {
			try {
				const flowEntity = await oryCli
					.createBrowserVerificationFlow({ returnTo: return_to })
					.then((res) => res.value());

				throw routerRedirect({
					to: "/auth/verify",
					search: {
						flow: flowEntity.id,
						return_to,
					},
					replace: true,
				});
			} catch (err: any) {
				if (err instanceof Error && "status" in err && err.status === 400) {
					throw routerRedirect({ to: "/" });
				}

				if (err?.status === 303 || err?.status === 302) {
					throw err;
				}

				return handleFlowError({
					onValidationError,
					onRestartFlow,
					onRedirect,
				})(err);
			}
		}

		const flowEntity = await oryCli
			.getVerificationFlowRaw({ id: flow })
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
			<Verification
				flow={data.flow}
				config={oryClientConfig}
				components={{
					Card: { Root: AuthCard },
				}}
			/>
		</div>
	);
}

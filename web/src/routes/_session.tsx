import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { oryCli } from "@/lib/auth";
import { TooltipProvider } from "@/components/ui/tooltip"
import { NavUser } from "#/components/nav-user";

export const Route = createFileRoute("/_session")({
	beforeLoad: async ({ location }) => {
		try {
			const session = await oryCli.toSession();
			return { session };
		} catch (err) {
			console.log("err beforeLoad", err);
		}

		throw redirect({
			to: "/auth/login",
			search: {
				redirect: location.href,
			},
		});
	},
	component: RouteComponent,
	pendingComponent: () => {
		return <div>Loading...</div>;
	},
});

function RouteComponent() {
	const { session } = Route.useRouteContext();

	const user = {
		name: (session?.identity?.traits as any)?.name?.first || "",
		email: (session?.identity?.traits as any)?.email || "",
		avatar: `https://avatar.vercel.sh/${session?.identity.id}.png`, // Default avatar as in AppSidebar
	};

	return (
		<TooltipProvider>
			<header className="flex h-16 shrink-0 items-center justify-between px-4 gap-2">
				<div className="flex items-center gap-4">
					{/* Left side - can add logo or other items here */}
				</div>
				<div className="flex items-center gap-4">
					<NavUser user={user} />
				</div>
			</header>
			<div className="flex flex-1 flex-col gap-4 p-4">
				<Outlet />
			</div>
		</TooltipProvider>
	);
}

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { oryCli } from "@/lib/auth";
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "#/components/ui/sidebar";
import { AppSidebar } from "#/components/app-sidebar";
import { Separator } from "#/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "#/components/ui/breadcrumb";
import { NavUser } from "#/components/nav-user";
import { Badge } from "#/components/ui/badge";

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
		name: (session?.identity?.traits as any)?.name?.first || "User",
		email: (session?.identity?.traits as any)?.email || "",
		avatar: "/avatars/shadcn.jpg", // Default avatar as in AppSidebar
	};

	return (
		<TooltipProvider>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2  px-4">
						<Separator orientation="vertical" className="mr-2 h-4" />

						<div className="ml-auto flex items-center gap-4">
							<Badge>Free-plan</Badge>

							<NavUser user={user} />
						</div>
					</header>
					<Outlet />
				</SidebarInset>
			</SidebarProvider>
		</TooltipProvider>
	);
}

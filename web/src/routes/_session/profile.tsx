import { useLogout } from "#/hooks/use-logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item"
import { createFileRoute } from "@tanstack/react-router";
import { ChevronRightIcon, LogOutIcon, Plus } from "lucide-react"


export const Route = createFileRoute("/_session/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const { session } = Route.useRouteContext();
	const logout = useLogout();

	// Extract user info from session
	const user = {
		name: (session?.identity?.traits as any)?.name?.first || "",
		email: (session?.identity?.traits as any)?.email || "",
		avatar: "/avatars/shadcn.jpg",
	};

	return (
		<div className="flex flex-col items-center ">
			<div className="flex w-full max-w-lg flex-col gap-6">
				<Item variant="outline">
					<ItemMedia>
						<Avatar className="size-10">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>ER</AvatarFallback>
						</Avatar>
					</ItemMedia>
					<ItemContent>
						<ItemTitle>{user.name}</ItemTitle>
						<ItemDescription>{user.email}</ItemDescription>
					</ItemContent>

				</Item>
				<Item variant="outline" size="sm" asChild>
					<a href={logout?.logout_url || "/"} data-testid="orbitto/auth/logout_link">
						<ItemMedia>
							<LogOutIcon className="size-5" />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Logout</ItemTitle>
						</ItemContent>
						<ItemActions>
							<ChevronRightIcon className="size-4" />
						</ItemActions>
					</a>
				</Item>
			</div>

		</div>

	);
}

import { useLogout } from "#/hooks/use-logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
					{/* <ItemActions>
						<Button
							size="icon-sm"
							variant="outline"
							className="rounded-full"
							aria-label="Invite"
						>
							<Plus />
						</Button>
					</ItemActions> */}
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

// <div className="flex justify-center items-start pt-8">
// 	<Card className="w-full max-w-md">
// 		<CardHeader>
// 			<div className="flex items-center gap-4">
// 				<Avatar className="h-16 w-16">
// 					<AvatarImage src={user.avatar} alt={user.name} />
// 					<AvatarFallback className="text-lg">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
// 				</Avatar>
// 				<div>
// 					<CardTitle className="text-xl">{user.name}</CardTitle>
// 					<CardDescription>Profile Settings</CardDescription>
// 				</div>
// 			</div>
// 		</CardHeader>
// 		<Separator />
// 		<CardContent className="pt-6 space-y-6">
// 			<div className="space-y-4">
// 				<h3 className="text-sm font-medium text-muted-foreground">Personal Information</h3>
// 				<div className="grid gap-4">
// 					<div className="flex items-center gap-4">
// 						<div className="flex items-center gap-2 text-muted-foreground w-32">
// 							<UserIcon size={18} />
// 							<span className="text-sm">Name</span>
// 						</div>
// 						<span className="text-sm">{user.name}</span>
// 					</div>
// 					<div className="flex items-center gap-4">
// 						<div className="flex items-center gap-2 text-muted-foreground w-32">
// 							<MailIcon size={18} />
// 							<span className="text-sm">Email</span>
// 						</div>
// 						<span className="text-sm">{user.email}</span>
// 					</div>
// 				</div>
// 			</div>
// 			<Separator />
// 			<div className="space-y-4">
// 				<h3 className="text-sm font-medium text-muted-foreground">Account Actions</h3>
// 				<a href={logout?.logout_url || "/"}>
// 					<Button variant="destructive" className="w-full">
// 						<LogOutIcon className="mr-2 h-4 w-4" />
// 						Log out
// 					</Button>
// 				</a>
// 			</div>
// 		</CardContent>
// 	</Card>
// </div>
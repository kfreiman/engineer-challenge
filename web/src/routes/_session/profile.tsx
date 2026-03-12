import { GetMeDocument, GetMeQuery } from "@/gql/graphql";
import { graphqlQueryOptions } from "@/lib/graphql-query";
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
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronRightIcon, Loader2Icon, LogOutIcon, CrownIcon, ClockIcon } from "lucide-react"

export const Route = createFileRoute("/_session/profile")({
	component: RouteComponent,
});

type UserFromQuery = Extract<GetMeQuery['me'], { __typename?: 'User' }>;

function UserProfile({ user }: { user: UserFromQuery }) {
	const logout = useLogout();
	const fullName = user.fullName ?? "Guest User";
	const initials = fullName
		.split(" ")
		.filter(Boolean)
		.map((n) => n[0] || "")
		.join("")
		.toUpperCase() || "??";

	return (
		<div className="flex flex-col items-center">
			<div className="flex w-full max-w-lg flex-col gap-6">
				<Item variant="outline">
					<ItemMedia>
						<Avatar className="size-10">
							<AvatarImage src={`https://avatar.vercel.sh/${user.id}.png`} alt={fullName} />
							<AvatarFallback>{initials}</AvatarFallback>
						</Avatar>
					</ItemMedia>
					<ItemContent>
						<ItemTitle>{fullName}</ItemTitle>
						<ItemDescription>{user.email}</ItemDescription>
					</ItemContent>
				</Item>
				<SubscriptionSection subscription={user.subscription} />
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

function SubscriptionSection({
	subscription,
}: {
	subscription: UserFromQuery['subscription'];
}) {
	if (!subscription) {
		return null;
	}

	const formatPlan = (plan: string) => {
		switch (plan) {
			case "FREE":
				return "Free";
			case "PRO":
				return "Pro";
			default:
				return plan;
		}
	};

	const formatStatus = (status: string) => {
		switch (status) {
			case "ACTIVE":
				return "Active";
			case "INACTIVE":
				return "Inactive";
			default:
				return status;
		}
	};

	const formatDate = (dateString: string | null | undefined) => {
		if (!dateString) return "N/A";
		return new Date(dateString).toLocaleDateString();
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="text-sm font-medium text-muted-foreground">Subscription</div>
			<Item variant="outline">
				<ItemMedia>
					<CrownIcon className="size-5 text-yellow-500" />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>{formatPlan(subscription.plan)}</ItemTitle>
					<ItemDescription>
						{formatStatus(subscription.status)}{' '}
						{subscription.expiresAt && (
							<span className="flex items-center gap-1">
								<ClockIcon className="size-3" />
								{formatDate(subscription.expiresAt)}
							</span>
						)}
					</ItemDescription>
				</ItemContent>
			</Item>
		</div>
	);
}

function RouteComponent() {
	const { data, isLoading, error } = useQuery(graphqlQueryOptions<GetMeQuery>(GetMeDocument));

	if (isLoading) {
		return (
			<div className="flex h-32 items-center justify-center">
				<Loader2Icon className="size-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (error || !data?.me) {
		return (
			<div className="flex flex-col items-center gap-4 py-8">
				<p className="text-destructive">Failed to load profile</p>
			</div>
		);
	}

	const { me } = data;

	switch (me.__typename) {
		case "User":
			return <UserProfile user={me} />;
		case "UnauthenticatedError":
			return (
				<div className="flex flex-col items-center gap-4 py-8">
					<p className="text-destructive">Unauthenticated</p>
					<p className="text-sm text-muted-foreground">{me.message}</p>
				</div>
			);
		default: {
			const _exhaustiveCheck: never = me as never;
			return (
				<div className="flex flex-col items-center gap-4 py-8">
					<p className="text-destructive">Unknown Error</p>
				</div>
			);
		}
	}
}

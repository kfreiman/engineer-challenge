import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_session/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>inner</div>
	)
}

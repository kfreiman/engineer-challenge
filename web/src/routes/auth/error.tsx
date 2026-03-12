import { Error } from "@ory/elements-react/theme";
import type { FlowError, GenericError } from "@ory/client-fetch";
import { createFileRoute } from "@tanstack/react-router";
import { AuthCard } from "@/components/auth/Card";
import { oryClientConfig } from "@/lib/auth";

export const Route = createFileRoute("/auth/error")({
	component: RouteComponent,
	validateSearch: (search) =>
		search as {
			error?: string;
			error_description?: string;
			id?: string;
		},
});

function RouteComponent() {
	const { error, error_description, id } = Route.useSearch();

	// Build the error object based on the available error information
	let errorObject: FlowError | { error: string; error_description: string } | { error: GenericError };

	if (id) {
		// FlowError case - error with ID
		errorObject = {
			id,
			error: error_description ? { message: error_description, id } : undefined,
		} as FlowError;
	} else if (error && error_description) {
		// OAuth2-style error case
		errorObject = {
			error,
			error_description,
		};
	} else if (error) {
		// GenericError case
		const genericError: GenericError = {
			id: error,
			message: error_description || error,
		};
		errorObject = {
			error: genericError,
		};
	} else {
		// Default generic error
		const genericError: GenericError = {
			id: "unknown_error",
			message: "An unknown error occurred",
		};
		errorObject = {
			error: genericError,
		};
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<Error
				error={errorObject}
				config={oryClientConfig}
				components={{
					Card: { Root: AuthCard },
				}}
			/>
		</div>
	);
}

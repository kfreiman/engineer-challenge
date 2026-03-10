import type { LogoutFlow } from "@ory/client-fetch";
import { useCallback, useEffect, useState } from "react";
import { oryCli } from "@/lib/auth";

export function useLogout() {
	const [logoutFlow, setLogoutFlow] = useState<LogoutFlow | undefined>();

	const fetchLogoutFlow = useCallback(async () => {
		const flow = await oryCli.createBrowserLogoutFlow();

		setLogoutFlow(flow);
	}, []);

	useEffect(() => {
		void fetchLogoutFlow();
	}, [fetchLogoutFlow]);

	return logoutFlow;
}

import { Configuration, FrontendApi } from "@ory/client-fetch";
import type { OryClientConfiguration } from "@ory/elements-react";
import { env } from "@/env";
const baseURL = env.VITE_APP_AUTH_BASEURL;

const oryConfig = new Configuration({
	headers: {
		Accept: "application/json",
	},
	basePath: baseURL,
	credentials: "include",
});

const oryClientConfig: OryClientConfiguration = {
	project: {
		default_redirect_url: baseURL,
		registration_enabled: true,
		verification_enabled: true,
		recovery_enabled: true,
		name: "orbitto",
		default_locale: "ru",
		locale_behavior: "force_default",

		recovery_ui_url: `${baseURL}/auth/recovery`,
		registration_ui_url: `${baseURL}/auth/registration`,
		verification_ui_url: `${baseURL}/auth/verify`,
		login_ui_url: `${baseURL}/auth/login`,
		error_ui_url: `${baseURL}/auth/error`,
		settings_ui_url: `${baseURL}/auth/settings`,
	},
	sdk: {
		url: oryConfig.basePath,
		options: oryConfig,
	},
};

const oryCli = new FrontendApi(oryConfig);

export { oryCli, oryConfig, oryClientConfig };

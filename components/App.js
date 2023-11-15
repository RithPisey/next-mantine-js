"use client";

import { theme } from "@/config/themes";
import { MantineProvider } from "@mantine/core";
import PagloadLoading from "./Loading/PagloadLoading";
import { Language } from "@/config/lang";
import { AuthContext, AuthContextWrapper } from "@/context/AuthContext";
import Authentication from "./Authentication/Authentication";
import { useEffect } from "react";
import { NavigationProgress } from "@mantine/nprogress";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Notifications } from "@mantine/notifications";

export default function App({ lang, children }) {
	return (
		<MantineProvider theme={theme}>
			<Provider store={store}>
				<AuthContextWrapper>
					<Authentication>
						<Language.Provider value={lang}>
							<Notifications position='top-right' />
							<PagloadLoading>{children}</PagloadLoading>
						</Language.Provider>
					</Authentication>
				</AuthContextWrapper>
			</Provider>
		</MantineProvider>
	);
}

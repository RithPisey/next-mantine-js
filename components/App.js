"use client";

import { theme } from "@/config/themes";
import { MantineProvider } from "@mantine/core";
import PagloadLoading from "./Loading/PagloadLoading";
import { Language } from "@/config/lang";
import { AuthContext, AuthContextWrapper } from "@/context/AuthContext";
import Authentication from "./Authentication/Authentication";
import { useEffect } from "react";
import { NavigationProgress } from "@mantine/nprogress";

export default function App({ lang, children }) {
	return (
		<MantineProvider theme={theme}>
			<AuthContextWrapper>
				<Authentication>
					<Language.Provider value={lang}>
						<PagloadLoading>{children}</PagloadLoading>
					</Language.Provider>
				</Authentication>
			</AuthContextWrapper>
		</MantineProvider>
	);
}

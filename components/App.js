"use client";

import { theme } from "@/config/themes";
import { MantineProvider } from "@mantine/core";
import PagloadLoading from "./Loading/PagloadLoading";
import { Language } from "@/config/lang";
import { AbilityContextWrapper } from "./AbilityContextWrapper";
import MainLayout from "./MainLayout";
import { useEffect } from "react";

export default function App({ lang, children }) {
	return (
		<MantineProvider theme={theme}>
			<Language.Provider value={lang}>
				<PagloadLoading>
					<AbilityContextWrapper>
						<MainLayout lang={lang}>{children}</MainLayout>
					</AbilityContextWrapper>
				</PagloadLoading>
			</Language.Provider>
		</MantineProvider>
	);
}

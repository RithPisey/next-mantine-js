"use client";
import { theme } from "@/config/themes";
import { MantineProvider } from "@mantine/core";

export default function MantineDefaultWrapper({ children }) {
	return (
		<MantineProvider theme={theme} defaultColorScheme='auto'>
			{children}
		</MantineProvider>
	);
}

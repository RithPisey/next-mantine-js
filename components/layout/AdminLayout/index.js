"use client";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import { Navbar } from "./Navbar";
import NavHeader from "./NavHeader";

export function AdminLayout({ children, lang }) {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
	return (
		<AppShell
			header={{ height: 85, offset: true }}
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
			}}
			padding='md'
			withBorder={true}
		>
			<NavHeader
				lang={lang}
				toggleDesktop={toggleDesktop}
				toggleMobile={toggleMobile}
			/>
			<Navbar
				lang={lang}
				mobileOpened={mobileOpened}
				desktopOpened={desktopOpened}
			/>
			<AppShell.Main maw={"95%"} mx={"auto"}>
				{children}
			</AppShell.Main>
		</AppShell>
	);
}

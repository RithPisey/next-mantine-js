"use client";
import {
	Group,
	ScrollArea,
	AppShell,
	ActionIcon,
	NavLink,
} from "@mantine/core";
import {
	IconGauge,
	IconLogout,
	IconMinus,
	IconSettings,
} from "@tabler/icons-react";
import { paths } from "../../module_path";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Can, ability, field, subject } from "@/config/Abilities";
import { v4 } from "uuid";
import { useEffect } from "react";
import { useGetCurrentLocale } from "@/config/lang";

const linkLeftBorderStyle = {
	// borderLeft: "1px solid",
	// borderLeftColor: "gainsboro",
};

export function Navbar({ mobileOpend, desktopOpened, lang }) {
	const [locale] = useGetCurrentLocale();
	return (
		<AppShell.Navbar
			pt={0}
			style={{
				boxShadow: desktopOpened ? "-16px 30px 20px 1px black" : "none",
			}}
			withBorder={false}
		>
			<AppShell.Section grow component={ScrollArea}>
				<RenderNavigation lang={locale} paths={paths} />
			</AppShell.Section>
			<AppShell.Section>
				<Group p={15} justify='center'>
					<ActionIcon variant='outline' color='error'>
						<IconLogout />
					</ActionIcon>
					<ActionIcon variant='outline' color='gray.7'>
						<IconSettings />
					</ActionIcon>
				</Group>
			</AppShell.Section>
		</AppShell.Navbar>
	);
}

const RenderNavigation = ({ paths, lang }) => {
	const pathName = usePathname();
	return renderNavLinks(paths, lang, pathName);
};

const renderNavLinks = (navItems, lang, pathName, isGroup) => {
	const langPath = `/${lang}`;
	return navItems.map((item, index) => {
		const itemPath = item.link === "/" ? langPath : `${langPath}${item.link}`;
		const isActive = pathName === itemPath;

		if (item.isGroup) {
			const isOpened = item.child.some((child) => {
				if (child.child) {
					return child.child.some(
						(nextChild) =>
							pathName ===
							(nextChild.link === "/"
								? langPath
								: `${langPath}${nextChild.link}`)
					);
				} else
					return (
						pathName ===
						(child.link === "/" ? langPath : `${langPath}${child.link}`)
					);
			});

			return (
				<NavLink
					key={v4()}
					style={linkLeftBorderStyle}
					mb={10}
					leftSection={
						<ActionIcon variant='light' color={isActive ? "secondary" : "gray"}>
							{item?.icon ? (
								<item.icon size={"16px"} />
							) : (
								<IconMinus size={"12px"} />
							)}
						</ActionIcon>
					}
					label={item.name}
					childrenOffset={0}
					defaultOpened={isOpened}
				>
					{renderNavLinks(item.child, lang, pathName, item.isGroup)}
				</NavLink>
			);
		} else {
			return (
				<NavLink
					key={v4()}
					style={linkLeftBorderStyle}
					leftSection={
						<ActionIcon
							variant={isGroup ? "transparent" : "light"}
							color={isActive ? "secondary" : "gray"}
						>
							{item?.icon ? (
								<item.icon size={"16px"} />
							) : (
								<IconMinus size={"12px"} />
							)}
						</ActionIcon>
					}
					mb={10}
					label={item.name}
					active={isActive}
					color='secondary'
					childrenOffset={0}
					component={Link}
					href={langPath + item.link}
				/>
			);
		}
	});
};

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
import { paths } from "./path";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Can, ability, field, subject } from "@/config/Abilities";

const linkLeftBorderStyle = {
	// borderLeft: "1px solid",
	// borderLeftColor: "gainsboro",
};

export function Navbar({ mobileOpend, desktopOpened, lang }) {
	return (
		<AppShell.Navbar
			pt={0}
			style={{
				boxShadow: desktopOpened ? "-16px 30px 20px 1px black" : "none",
			}}
			withBorder={false}
		>
			<AppShell.Section grow component={ScrollArea}>
				<RenderNavigation lang={lang} paths={paths} />
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

const renderNavLinks = (navItems, lang, pathName) => {
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
				<Can
					key={index}
					I={ability.SEE}
					this={subject.NAV_GROUP}
					field={item.field}
				>
					<NavLink
						style={linkLeftBorderStyle}
						leftSection={
							<ActionIcon
								variant='transparent'
								color={isActive ? "secondary" : "gray"}
							>
								{item?.icon ? <item.icon /> : <IconMinus size={"12px"} />}
							</ActionIcon>
						}
						label={item.name}
						childrenOffset={0}
						defaultOpened={isOpened}
					>
						{renderNavLinks(item.child, lang, pathName)}
					</NavLink>
				</Can>
			);
		} else {
			return (
				<Can
					key={index}
					I={ability.SEE}
					this={subject.NAV_LINK}
					field={item.field}
				>
					<NavLink
						style={linkLeftBorderStyle}
						leftSection={
							<ActionIcon
								variant='transparent'
								color={isActive ? "secondary" : "gray"}
							>
								{item?.icon ? <item.icon /> : <IconMinus size={"12px"} />}
							</ActionIcon>
						}
						label={item.name}
						active={isActive}
						color='secondary'
						childrenOffset={0}
						component={Link}
						href={item.link}
					/>
				</Can>
			);
		}
	});
};

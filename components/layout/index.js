"use client";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  Group,
  Menu,
  NavLink,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconBellFilled,
  IconGauge,
  IconLanguage,
  IconLogout,
  IconMenu,
  IconMenu2,
  IconNotification,
  IconNotificationOff,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { Navbar } from "./Navbar";
import NavHeader from "./NavHeader";

export function MainLayout({ children }) {
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
      padding="md"
      withBorder={true}
    >
      <NavHeader toggleDesktop={toggleDesktop} toggleMobile={toggleMobile} />
      <Navbar mobileOpened={mobileOpened} desktopOpened={desktopOpened} />
      <AppShell.Main maw={"85%"} mx={"auto"}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

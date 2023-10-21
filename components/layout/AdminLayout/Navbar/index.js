"use client";
import {
  Group,
  ScrollArea,
  AppShell,
  ActionIcon,
  NavLink,
} from "@mantine/core";
import { IconGauge, IconLogout, IconSettings } from "@tabler/icons-react";
import { paths } from "./path";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const linkLeftBorderStyle = {
  borderLeft: "1px solid",
  borderLeftColor: "gainsboro",
};

export function Navbar({ mobileOpend, desktopOpened }) {
  return (
    <AppShell.Navbar
      pt={0}
      style={{
        boxShadow: desktopOpened ? "-16px 30px 20px 1px black" : "none",
      }}
    >
      <AppShell.Section grow component={ScrollArea}>
        <RenderNavigation paths={paths} />
      </AppShell.Section>
      <AppShell.Section>
        <Group p={15} justify="center">
          <ActionIcon variant="outline" color="error">
            <IconLogout />
          </ActionIcon>
          <ActionIcon variant="outline" color="gray.7">
            <IconSettings />
          </ActionIcon>
        </Group>
      </AppShell.Section>
    </AppShell.Navbar>
  );
}

const RenderNavigation = function ({ paths }) {
  const childOffset = 25;
  const pathName = usePathname();
  return paths.map((value, index) => {
    return value.isGroup ? (
      <NavLink
        key={Date.now() + index}
        leftSection={
          <ActionIcon color="secondary">
            <value.icon />
          </ActionIcon>
        }
        label={value.name}
        childrenOffset={childOffset}
        defaultOpened={value.child.some((item) => {
          if (item.isGroup) {
            return item.child.some((i) => i.link === pathName);
          } else {
            return item.link === pathName;
          }
        })}
        mb={12}
      >
        {value.child.map((first_child, index) => {
          return first_child.isGroup ? (
            <NavLink
              style={linkLeftBorderStyle}
              label={first_child.name}
              childrenOffset={childOffset}
              key={index + first_child.name}
              defaultOpened={first_child.child.some(
                (item) => item.link === pathName
              )}
            >
              {first_child.child.map((second_child, index) => {
                return (
                  <NavLink
                    key={second_child.name + index}
                    style={linkLeftBorderStyle}
                    label={second_child.name}
                    childrenOffset={28}
                    component={Link}
                    href={second_child.link}
                    active={pathName === second_child.link ? true : false}
                    color="secondary"
                  />
                );
              })}
            </NavLink>
          ) : (
            <NavLink
              key={index + first_child.name}
              style={linkLeftBorderStyle}
              label={first_child.name}
              childrenOffset={childOffset}
              component={Link}
              href={first_child.link}
              color="secondary"
              active={pathName === first_child.link ? true : false}
            />
          );
        })}
      </NavLink>
    ) : (
      <NavLink
        active={pathName === value.link ? true : false}
        key={Date.now() + index}
        leftSection={
          <ActionIcon color="secondary">
            <value.icon />
          </ActionIcon>
        }
        color="secondary"
        label={value.name}
        childrenOffset={childOffset}
        component={Link}
        href={value.link}
        mb={12}
      />
    );
  });
};

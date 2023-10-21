import { i18n } from "@/i18n.config";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Group,
  Menu,
  Stack,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconBellFilled,
  IconLanguage,
  IconMenu2,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
export default function NavHeader({ toggleDesktop, toggleMobile }) {
  const { setColorScheme, clearColorScheme, colorScheme } =
    useMantineColorScheme();
  const pathName = usePathname();
  const redirectedPathName = (locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };
  return (
    <AppShell.Header
      withBorder={false}
      style={{
        boxShadow: "1px -18px 20px 1px black",
      }}
    >
      <Group h="100%" px="md" w={"100%"} justify="space-between">
        <Group>
          <ActionIcon
            onClick={() => {
              toggleDesktop();
              toggleMobile();
            }}
            color="primary"
            variant="subtle"
          >
            <IconMenu2 />
          </ActionIcon>
          <Text>Logo</Text>
        </Group>
        <Group>
          <Menu>
            <Menu.Target>
              <ActionIcon color="gray.6" variant="transparent">
                <IconLanguage />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {i18n.locales.map((locale) => {
                return (
                  <Menu.Item
                    component="a"
                    key={Date.now() + locale}
                    href={redirectedPathName(locale)}
                  >
                    <span
                      class={
                        locale === "kh"
                          ? "flag flag-country-kh"
                          : "flag flag-country-us"
                      }
                    ></span>{" "}
                    {locale === "kh" ? "Khmer" : "English"}
                  </Menu.Item>
                );
              })}
            </Menu.Dropdown>
          </Menu>

          <ActionIcon color="gray.6" variant="transparent">
            <IconBellFilled />
          </ActionIcon>
          {colorScheme === "dark" ? (
            <ActionIcon
              color="gray.6"
              variant="transparent"
              onClick={() => setColorScheme("light")}
            >
              <IconSun />
            </ActionIcon>
          ) : (
            <ActionIcon
              color="gray.6"
              variant="transparent"
              onClick={() => setColorScheme("dark")}
            >
              <IconMoon />
            </ActionIcon>
          )}

          <Group style={{ cursor: "pointer" }}>
            <Avatar />
            <Stack gap={0} visibleFrom="sm">
              <Text size="sm">Jack Manson</Text>
              <Text size="xs" fw={"bold"}>
                Admin
              </Text>
            </Stack>
          </Group>
        </Group>
      </Group>
    </AppShell.Header>
  );
}

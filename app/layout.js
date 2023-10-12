import "@/assets/css/globals.css";
import "@mantine/core/styles.css";
import { MainLayout } from "@/components/layout";
import { LoadingOverlay, MantineProvider, Stack } from "@mantine/core";
import { theme } from "@/config/themes";
import { ClientRenderWrapper } from "@/components/ClientRenderWrapper";
import PagloadLoading from "@/components/Loading/PagloadLoading";

export const metadata = {
  title: "Next Mantine",
  description: "Next Mantine Template",
  link: [""],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/core@1.0.0-beta17/dist/css/tabler-flags.min.css"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <ClientRenderWrapper>
            <PagloadLoading>
              <MainLayout>{children}</MainLayout>
            </PagloadLoading>
          </ClientRenderWrapper>
        </MantineProvider>
      </body>
    </html>
  );
}

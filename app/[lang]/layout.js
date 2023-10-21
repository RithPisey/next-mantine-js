import "@/assets/css/globals.css";
import "@mantine/core/styles.css";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { MantineProvider } from "@mantine/core";
import { i18n } from "@/i18n.config";
import { theme } from "@/config/themes";
import { ClientRenderWrapper } from "@/components/ClientRenderWrapper";
import PagloadLoading from "@/components/Loading/PagloadLoading";

export const metadata = {
  title: "Next Mantine",
  description: "Next Mantine Template",
  link: [""],
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.lang}>
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
              <AdminLayout lang={params.lang}>{children}</AdminLayout>
            </PagloadLoading>
          </ClientRenderWrapper>
        </MantineProvider>
      </body>
    </html>
  );
}

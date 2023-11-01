import "@/assets/css/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { i18n } from "@/i18n.config";
import PagloadLoading from "@/components/Loading/PagloadLoading";
import { AbilityContextWrapper } from "@/components/AbilityContextWrapper";
import { AdminLayout } from "@/components/layout/AdminLayout";
import MantineDefaultWrapper from "@/components/MantineDefaultWrapper";
import { theme } from "@/config/themes";
import MainLayout from "@/components/MainLayout";
import { Language, lang } from "@/config/lang";
import App from "@/components/App";

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
        <ColorSchemeScript />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/core@1.0.0-beta17/dist/css/tabler-flags.min.css"
        />
      </head>
      <body>
        <App lang={params.lang}>{children}</App>
      </body>
    </html>
  );
}

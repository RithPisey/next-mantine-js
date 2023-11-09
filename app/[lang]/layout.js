import "@/assets/css/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "cropperjs/dist/cropper.css";

import { ColorSchemeScript } from "@mantine/core";
import { i18n } from "@/i18n.config";
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
					rel='stylesheet'
					href='https://cdn.jsdelivr.net/npm/@tabler/core@1.0.0-beta17/dist/css/tabler-flags.min.css'
				/>
			</head>
			<body>
				<App lang={params.lang}>{children}</App>
			</body>
		</html>
	);
}

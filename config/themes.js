"use client";
import { Button, Input, Loader, Select, createTheme, rem } from "@mantine/core";

export const theme = createTheme({
	scale: 0.9,
	primaryColor: "primary",
	colors: {
		error: [
			"#ffe9e9",
			"#ffd1d1",
			"#fba0a1",
			"#f76d6d",
			"#f34141",
			"#f22625",
			"#f21616",
			"#d8070b",
			"#c10008",
			"#a90003",
		],
		success: [
			"#e5feee",
			"#d2f9e0",
			"#a8f1c0",
			"#7aea9f",
			"#53e383",
			"#3bdf70",
			"#2bdd66",
			"#1ac455",
			"#0caf49",
			"#00963c",
		],
		warning: [
			"#fff8e1",
			"#ffefcc",
			"#ffdd9b",
			"#ffca64",
			"#ffba38",
			"#ffb01b",
			"#ffab09",
			"#e39500",
			"#ca8500",
			"#af7100",
		],
		info: [
			"#e5f4ff",
			"#cde2ff",
			"#9bc2ff",
			"#64a0ff",
			"#3984fe",
			"#1d72fe",
			"#0969ff",
			"#0058e4",
			"#004ecc",
			"#0043b5",
		],
		primary: [
			"#fff3e4",
			"#ffe6cf",
			"#facaa1",
			"#f6ac6e",
			"#f39443",
			"#f28427",
			"#f17b18",
			"#d7690c",
			"#c05c06",
			"#a74e00",
		],
		secondary: [
			"#e6f5ff",
			"#d0e5ff",
			"#a1c8fa",
			"#6fa9f6",
			"#458ff1",
			"#2c7ef1",
			"#1c76f1",
			"#0c64d7",
			"#0059c1",
			"#004dab",
		],
	},

	components: {
		Button: Button.extend({
			defaultProps: {
				color: "primary",
				variant: "filled",
			},
		}),
		Loader: Loader.extend({
			defaultProps: {
				loaders: { ...Loader.defaultLoaders },
			},
		}),
		Select: Select.extend({
			defaultProps: {
				withCheckIcon: false,
			},
		}),
	},
	shadows: {
		md: "1px 1px 3px rgba(0, 0, 0, .25)",
		xl: "5px 5px 3px rgba(0, 0, 0, .25)",
	},

	lineHeights: {
		xs: "1.4",
		sm: "1.45",
		md: "1.55",
		lg: "1.6",
		xl: "1.65",
	},
	headings: {
		fontFamily: "Roboto, sans-serif",
	},
});

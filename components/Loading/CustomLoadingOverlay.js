"use client";
import { Box, Overlay } from "@mantine/core";

export default function CustomLoadingOverlay({ children }) {
	return (
		<Box
			style={{
				zIndex: 2000,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
			pos={"absolute"}
			w={"100%"}
			h={"100%"}
		>
			{" "}
			{children}
			<Overlay zIndex={-2000} color='#000' backgroundOpacity={0.3} blur={7} />
		</Box>
	);
}

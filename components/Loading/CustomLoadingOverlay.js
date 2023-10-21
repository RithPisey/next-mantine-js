import { Box } from "@mantine/core";

export default function CustomLoadingOverlay({ children }) {
  return (
    <Box
      style={{
        background: "white",
        zIndex: 2000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      pos={"absolute"}
      w={"100%"}
      h={"100%"}
    >
      {children}
    </Box>
  );
}

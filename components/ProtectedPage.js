import { Box, Stack, Text, Title } from "@mantine/core";
import { IconLock } from "@tabler/icons-react";

export default function ProtectedPage() {
  return (
    <Box h={"70vh"}>
      <Stack justify="center" align="center" h={"100%"}>
        <Title order={1}>401</Title>
        <Title order={3}>UNAUTHORIZED</Title>
        <Text>Access denied due to invalid roles.</Text>
      </Stack>
    </Box>
  );
}

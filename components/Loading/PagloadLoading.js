"use client";

import { Box, LoadingOverlay, Stack, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { ClockLoader, PropagateLoader } from "react-spinners";
import CustomLoadingOverlay from "./CustomLoadingOverlay";

export default function PagloadLoading({ children }) {
  const [isLoad, setIsLoad] = useState(true);
  const theme = useMantineTheme();
  useEffect(() => {
    return () => {
      setIsLoad(false);
    };
  });
  return (
    <>
      {isLoad && (
        <CustomLoadingOverlay>
          {" "}
          <Stack justify="center" align="center">
            <ClockLoader loading={true} color={theme.colors.secondary[5]} />
            <PropagateLoader loading={true} color={theme.colors.secondary[5]} />
          </Stack>
        </CustomLoadingOverlay>
      )}
      {children}
    </>
  );
}

"use client";

import { theme } from "@/config/themes";
import { MantineProvider } from "@mantine/core";
import PagloadLoading from "./Loading/PagloadLoading";
import { Language } from "@/config/lang";
import { AbilityContextWrapper } from "./AbilityContextWrapper";

export default function App({ lang, children }) {
  return (
    <MantineProvider theme={theme}>
      <Language.Provider value={lang}>
        <PagloadLoading>
          <AbilityContextWrapper>{children}</AbilityContextWrapper>
        </PagloadLoading>
      </Language.Provider>
    </MantineProvider>
  );
}

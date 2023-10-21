"use client";

import { AblilityContext, defineRulesFor } from "@/config/Abilities";

export function ClientRenderWrapper({ children }) {
  return (
    <AblilityContext.Provider value={defineRulesFor("ROLE_ADMIN")}>
      {children}
    </AblilityContext.Provider>
  );
}

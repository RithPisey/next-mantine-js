"use client";
import { AbilityContext, defineRulesFor } from "@/config/Abilities";

export function AbilityContextWrapper({ children }) {
	return (
		<AbilityContext.Provider value={defineRulesFor("ROLE_ADMIN")}>
			{children}
		</AbilityContext.Provider>
	);
}

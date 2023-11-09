"use client";
import CheckPermissionWrapper from "@/components/Permission/CheckPermissionWrapper";
import { field } from "@/config/Abilities";

export default function BranchProtected({ children }) {
	return (
		<CheckPermissionWrapper field={field.ONLY_ADMIN}>
			{children}
		</CheckPermissionWrapper>
	);
}

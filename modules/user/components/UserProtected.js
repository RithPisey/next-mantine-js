"use client";
import CheckPermissionWrapper from "@/components/CheckPermissionWrapper";
import { field } from "@/config/Abilities";

export default function UserProtected({ children }) {
	return (
		<CheckPermissionWrapper field={field.ONLY_USER}>
			{children}
		</CheckPermissionWrapper>
	);
}

"use client";
import CheckPermissionWrapper from "@/components/CheckPermissionWrapper";
import { field } from "@/config/Abilities";
import AdminComponent from "./AdminComponent";

export default function AdminProtected({ children }) {
	return (
		<CheckPermissionWrapper field={field.ONLY_ADMIN}>
			{children}
		</CheckPermissionWrapper>
	);
}

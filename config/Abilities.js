"use client";
import { defineAbility } from "@casl/ability";
import { createContextualCan } from "@casl/react";
import { createContext } from "react";

const AuthContext = createContext();

export const AbilityContext = createContext();
export const Can = createContextualCan(AbilityContext.Consumer);

export function defineRulesFor(role) {
	return defineAbility((can, cannot) => {
		if (role === roles.ROLE_DEV) {
			can(ability.MANAGE, subject.ALL);
			cannot(ability.MANAGE, subject.ALL, [field.ONLY_ADMIN, field.ONLY_USER]);
		} else if (role === roles.ROLE_ADMIN) {
			can(ability.MANAGE, subject.ALL, [
				field.ADMIN_USER,
				field.DEV_ADMIN,
				field.DEV_USER_ADMIN,
				field.ONLY_ADMIN,
			]);
			cannot(ability.MANAGE, subject.ALL, [field.ONLY_DEV, field.ONLY_USER]);
		} else if (role === roles.ROLE_USER) {
			can(ability.MANAGE, subject.ALL, [
				field.ADMIN_USER,
				field.DEV_USER,
				field.DEV_USER_ADMIN,
				field.ONLY_USER,
			]);
			cannot(ability.MANAGE, subject.ALL, [field.ONLY_DEV, field.ONLY_ADMIN]);
		}
	});
}

export const roles = {
	ROLE_DEV: "ROLE_DEV",
	ROLE_ADMIN: "ROLE_ADMIN",
	ROLE_USER: "ROLE_USER",
};

export const field = {
	ADMIN_USER: "admin-user",
	DEV_ADMIN: "dev-admin",
	DEV_USER: "dev-user",
	DEV_USER_ADMIN: "dev-admin-user",
	ONLY_USER: "only-user",
	ONLY_ADMIN: "only-admin",
	ONLY_DEV: "only-dev",
};

export const ability = {
	MANAGE: "manage",
	SEE: "see",
};

export const subject = {
	COMPONENT: "component",
	NAV_GROUP: "nav-group",
	NAV_LINK: "nav-link",
	PAGE: "page",
	ALL: "all",
};

export async function getField() {
	return field;
}

export async function getRoles() {
	return roles;
}

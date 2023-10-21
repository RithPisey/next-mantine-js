"use client";
import { defineAbility } from "@casl/ability";
import { createContextualCan } from "@casl/react";
import { createContext } from "react";

const AuthContext = createContext();

export const AblilityContext = createContext();
export const Can = createContextualCan(AblilityContext.Consumer);

export function defineRulesFor(role) {
  return defineAbility((can, cannot) => {
    if (role === roles.ROLE_DEV) {
      can(ablility.MANAGE, subject.ALL);
    } else if (role === roles.ROLE_ADMIN) {
      can(ablility.MANAGE, subject.ALL, [
        field.ADMIN_USER,
        field.DEV_ADMIN,
        field.DEV_USER_ADMIN,
        field.ONLY_ADMIN,
      ]);
    } else if (role === roles.ROLE_USER) {
      can(ablility.MANAGE, subject.ALL, [
        field.ADMIN_USER,
        field.DEV_USER,
        field.DEV_USER_ADMIN,
        field.ONLY_USER,
      ]);
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

const ablility = {
  MANAGE: "manage",
  SEE: "see",
};

const subject = {
  COMPONENT: "component",
  NAV_GROUP: "nav-group",
  NAV_LINK: "nav-link",
  PAGE: "page",
  ALL: "all",
};

import { roles } from "@/config/Abilities";

const { IconDeviceDesktop, IconUser } = require("@tabler/icons-react");

export const paths = [
  {
    name: "main",
    icon: IconDeviceDesktop,
    isGroup: true,
    field: [roles.ROLE_DEV, roles.ROLE_ADMIN, roles.ROLE_USER],
    child: [
      {
        name: "home",
        isGroup: false,
        link: "/",
      },
      {
        name: "dashboard",
        isGroup: true,
        child: [
          { name: "e-commerce", link: "/e-commerce" },
          { name: "analysis", link: "/analysis" },
        ],
      },
    ],
  },
  {
    name: "User",
    icon: IconUser,
    isGroup: false,
    field: [roles.ROLE_USER],
    link: "/user",
  },

  {
    name: "Admin",
    icon: IconUser,
    isGroup: false,
    field: [roles.ROLE_ADMIN],
    link: "/user",
  },
  {
    name: "Admin-User",
    icon: IconUser,
    isGroup: false,
    field: [roles.ROLE_ADMIN],
    link: "/user",
  },
];

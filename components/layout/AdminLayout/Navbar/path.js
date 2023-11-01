import { field, roles } from "@/config/Abilities";
import {
  IconLayoutDashboard,
  IconList,
  IconUserCircle,
  IconUsersGroup,
} from "@tabler/icons-react";

const {
  IconDeviceDesktop,
  IconUser,
  IconBuilding,
  IconBuildingCommunity,
  IconTool,
  IconDashboard,
} = require("@tabler/icons-react");

export const paths = [
  {
    name: "dashboard",
    icon: IconLayoutDashboard,
    isGroup: false,
    key: "dashboard",
    link: "/",
  },
  {
    name: "user-page",
    icon: IconUserCircle,
    isGroup: false,
    key: "user-page",
    link: "/user-page",
  },
  {
    name: "admin-page",
    icon: IconUserCircle,
    isGroup: false,
    key: "admin-page",
    link: "/admin-page",
  },
  {
    name: "dev-page",
    icon: IconUserCircle,
    isGroup: false,
    key: "admin-page",
    link: "/dev-page",
  },
  {
    name: "admin",
    icon: IconBuilding,
    isGroup: false,
    key: "admin",
    link: "/admin",
  },

  {
    name: "branch",
    icon: IconBuildingCommunity,
    isGroup: false,
    key: "branch",
    link: "/branch",
  },
  {
    name: "user",
    icon: IconUsersGroup,
    isGroup: true,
    key: "user",
    child: [
      {
        name: "user-lists",
        isGroup: false,
        key: "",
        link: "/user/list",
      },
      {
        name: "user-roles",
        isGroup: false,
        key: "",
        link: "/user/role",
      },
    ],
  },
  {
    name: "developer",
    icon: IconTool,
    isGroup: true,
    key: "developer",
    child: [
      {
        name: "modules",
        isGroup: false,
        key: "developer-modules",
        link: "/dev/modules",
      },
    ],
  },
];

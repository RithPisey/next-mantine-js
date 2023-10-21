const { IconDeviceDesktop, IconUser } = require("@tabler/icons-react");

export const paths = [
  {
    name: "main",
    icon: IconDeviceDesktop,
    isGroup: true,
    acl: ["admin", "user"],
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
    acl: ["admin", "user"],
    link: "/user",
  },
];

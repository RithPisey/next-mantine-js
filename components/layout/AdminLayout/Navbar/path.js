import { field, roles } from "@/config/Abilities";

const { IconDeviceDesktop, IconUser } = require("@tabler/icons-react");

export const paths = [
	{
		name: "main",
		icon: IconDeviceDesktop,
		isGroup: true,
		field: field.DEV_USER_ADMIN,
		child: [
			{
				name: "home",
				isGroup: false,
				link: "/",
				field: field.DEV_USER_ADMIN,
			},
			{
				name: "dashboard",
				isGroup: true,
				field: field.DEV_USER_ADMIN,
				child: [
					{
						name: "e-commerce",
						link: "/e-commerce",
						field: field.DEV_USER_ADMIN,
					},
					{ name: "analysis", link: "/analysis", field: field.DEV_USER_ADMIN },
					{ name: "Graphic", link: "/graphic", field: field.ONLY_USER },
				],
			},
		],
	},
	{
		name: "User",
		icon: IconUser,
		isGroup: false,
		field: field.ONLY_USER,
		link: "/user",
	},

	{
		name: "Admin",
		icon: IconUser,
		isGroup: false,
		field: field.ONLY_ADMIN,
		link: "/admin",
	},
	{
		name: "Admin-User",
		icon: IconUser,
		isGroup: false,
		field: field.ADMIN_USER,
		link: "/admin-user",
	},
];

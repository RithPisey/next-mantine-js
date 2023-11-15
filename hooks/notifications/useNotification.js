import { notifications } from "@mantine/notifications";
import { useGetTranslate } from "../useGetDictionary";
import { IconCheck, IconExclamationMark, IconX } from "@tabler/icons-react";
const { t } = require("i18next");

export default function useNotification() {
	const [t] = useGetTranslate();
	let id_current;
	function createNotification({ color, title, message, icon }) {
		const notificationProps = {
			color,
			title,
			message,
			icon,
		};

		return {
			show: () => {
				id_current = notifications.show(notificationProps);
				return id_current;
			},
			update: (newProps) => {
				notifications.update({
					...notificationProps,
					...newProps,
					id: id_current,
				});
			},
		};
	}

	function NSuccess(message) {
		return createNotification({
			color: "green",
			title: t("success"),
			message,
			icon: <IconCheck />,
		});
	}

	function NError(message) {
		return createNotification({
			color: "red",
			title: t("error"),
			message,
			icon: <IconX />,
		});
	}

	function NWarning(message) {
		return createNotification({
			color: "yellow",
			title: t("warning"),
			message,
			icon: <IconExclamationMark />,
		});
	}

	function NLoading(message) {
		return createNotification({
			title: t("loading"),
			message,
			color: "blue",
			loading: true,
			autoClose: false,
		});
	}

	return { NLoading, NSuccess, NWarning, NError };
}

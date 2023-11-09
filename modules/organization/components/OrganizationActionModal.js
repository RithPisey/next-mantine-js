import UploadSingleImage from "@/components/Features/UploadImage/UploadSingleImage";
import IComboBox from "@/components/UI/IComboBox";
import statusEnum from "@/config/enum/statusEnum";
import { useGetTranslate, useGett } from "@/hooks/useGetDictionary";
import {
	Box,
	Button,
	Combobox,
	Group,
	InputBase,
	Modal,
	Select,
	SimpleGrid,
	Stack,
	TextInput,
	Textarea,
	Title,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
export default function OrganizationActionModal({ open, close }) {
	const scheme = yup.object({
		name: yup.string().required().max(150),
		latin_name: yup.string().required().max(150),
	});
	const [t] = useGetTranslate();
	const form = useForm({
		initialValues: {
			name: null,
			latin_name: null,
			phone: null,
			alt_phone: null,
			status: statusEnum.active,
			address: null,
		},
		validateInputOnBlur: true,
		validate: yupResolver(scheme),
	});

	return (
		<Modal.Root opened={open} onClose={close} fullScreen>
			<Modal.Overlay />
			<Modal.Content>
				<Modal.Header bg={"primary"}>
					<Modal.Title>
						<Title c={"white"} order={3}>
							{t("organization")}
						</Title>
					</Modal.Title>
					<Modal.CloseButton
						onClick={() => {
							form.reset();
						}}
					/>
				</Modal.Header>
				<Modal.Body mt={20} px={50}>
					<SimpleGrid
						cols={{ base: 1, sm: 2 }}
						spacing={{ base: 10, sm: "xl" }}
						verticalSpacing={{ base: "md", sm: "xl" }}
					>
						<Stack>
							<TextInput
								{...form.getInputProps("name")}
								onBlur={form.getInputProps("name").onBlur}
								label={t("name")}
								placeholder={t("name")}
							/>
							<TextInput
								{...form.getInputProps("latin_name")}
								onBlur={form.getInputProps("latin_name").onBlur}
								label={t("latin_name")}
								placeholder={t("latin_name")}
							/>
							<TextInput
								{...form.getInputProps("phone")}
								label={t("phone")}
								placeholder={t("phone")}
							/>
							<TextInput
								{...form.getInputProps("alt_phone")}
								label={t("alt_phone")}
								placeholder={t("alt_phone")}
							/>
							<Select
								{...form.getInputProps("status")}
								label={t("status")}
								placeholder={t?.status}
								data={statusEnum.list}
							/>

							<Textarea
								{...form.getInputProps("address")}
								label={t("address")}
								placeholder={t("address")}
							/>
						</Stack>
						<Group justify='center'>
							<UploadSingleImage />
						</Group>
					</SimpleGrid>
					<Group justify='start' mt={15}>
						<Button
							onClick={() => {
								console.log(form.values);
							}}
						>
							{t("save")}
						</Button>
						<Button
							onClick={() => {
								const value = {
									name: "test",
									latin_name: "test",
									phone: "0000",
									alt_phone: "11111",
									status: statusEnum.active,
									address: "abc",
								};
								form.setValues(value);
							}}
						>
							{t("save_new")}
						</Button>
					</Group>
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	);
}

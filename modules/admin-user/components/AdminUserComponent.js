"use client";
import { Box, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { v4 } from "uuid";

export default function AdminUserComponent() {
	const columns = [
		{
			field: "actions",
			header: "Actions",
			type: "actions",
			getAction: (params) => {
				return [
					<ICommonDataTable.ActionsMenuItem
						icon={<IconTrash />}
						label={"Delete"}
						onActionClick={(params) => {
							alert("delete");
						}}
					/>,
					<ICommonDataTable.ActionsMenuItem
						icon={<IconEdit />}
						label={"Edit"}
						onActionClick={(params) => {
							alert("edit");
						}}
					/>,
				];
			},
		},
		{
			field: "name",
			header: "Name",
			hideable: false,
		},
		{
			field: "latin_name",
			header: "Latin Name",
			hideable: false,
		},
		{
			field: "phone",
			header: "Phone",
			hideable: true,
		},
		{
			field: "alt_phone",
			header: "Alternative Phone",
			hideable: true,
		},
		{
			field: "address",
			header: "Address",
			hideable: true,
		},
	];

	const rows = [
		{
			id: 1,
			name: "John",
			latin_name: "John",
			phone: "123989121",
			alt_phone: "012334556",
			address: "home test",
		},
		{
			id: 2,
			name: "Mike",
			latin_name: "Mike",
			phone: "123989121",
			alt_phone: "012334556",
			address: "elephant test",
		},
	];

	const handleActionAdd = function () {
		alert("add");
	};

	const handleActionRefresh = function () {
		alert("refresh");
	};

	const fi = useForm({
		initialValues: {
			name: "",
			date: "",
		},
	});

	return (
		<Box>
			<TextInput
				{...fi.getInputProps("name")}
				label='Name'
				placeholder='Name'
			/>
		</Box>
	);
}

"use client";
import { IDatatable } from "@/components/Features/IDatatable/IDatatable";
import { Box, Button, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";
import { v4 } from "uuid";
import OrganizationActionModal from "./OrganizationActionModal";

export default function OrganizationComponent({ module }) {
	const columns = [
		{
			field: "actions",
			header: "actions",
			type: "actions",
			getAction: (params) => {
				return [
					<IDatatable.ActionsMenuItem
						icon={<IconTrash size={13} />}
						label={"Delete"}
						onActionClick={(params) => {
							alert("delete");
						}}
					/>,
					<IDatatable.ActionsMenuItem
						icon={<IconEdit size={13} />}
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
			header: "name",
			hideable: false,
		},
		{
			field: "latin_name",
			header: "latin_name",
			hideable: false,
		},
		{
			field: "phone",
			header: "phone",
			hideable: true,
		},
		{
			field: "alt_phone",
			header: "alt_phone",
			hideable: true,
		},
		{
			field: "address",
			header: "address",
			hideable: true,
		},
		{
			field: "status",
			header: "status",
			// type: "status",
			renderCell: ({ value }) => {
				return <p>{value}</p>;
			},
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
			status: 1,
		},
		{
			id: 2,
			name: "Mike",
			latin_name: "Mike",
			phone: "123989121",
			alt_phone: "012334556",
			address: "elephant test",
			status: 1,
		},
	];
	const filterInputs = useForm({
		initialValues: {
			name: "",
			date: "",
		},
	});
	const [
		openedActionModal,
		{ open: openActionModal, close: closeActionModal },
	] = useDisclosure(false);
	const handleActionAdd = function () {
		openActionModal();
	};

	const handleActionRefresh = function () {
		alert("refresh");
	};

	return (
		<Box>
			<IDatatable
				module={module}
				columns={columns}
				rows={rows}
				onFilterChange={(filters) => {
					console.log(filters);
				}}
				onActionAdd={handleActionAdd}
				onActionRefresh={handleActionRefresh}
				enableActionAdd={true}
				title={"Organization"}
				enableActionExport={false}
				enableFilters={true}
				enableSearchInput={true}
				onSearchInputChange={(text) => {
					console.log(text);
				}}
				onActionExport={(exportType) => {
					console.log(exportType);
				}}
				onFilterInputSubmit={() => {
					console.log("onFilterInputSubmit");
					console.log(filterInputs.values);
				}}
				filterInputs={[
					<DateInput
						{...filterInputs.getInputProps("date")}
						label='Date input'
						placeholder='Date input'
					/>,
					<TextInput
						{...filterInputs.getInputProps("name")}
						label='Name'
						placeholder='Name'
					/>,
				]}
				totalPages={2}
				onStatusChange={(row) => {
					console.log(row);
				}}
			/>
			<OrganizationActionModal
				open={openedActionModal}
				close={closeActionModal}
			/>
		</Box>
	);
}

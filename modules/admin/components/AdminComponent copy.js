"use client";
import { ICommonDataTable } from "@/components/ICommonDatatable/ICommonDatatable";
import { Box, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";
import { v4 } from "uuid";

export default function AdminComponent() {
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

	const filterInputs = useForm({
		initialValues: {
			name: "",
			date: "",
		},
	});

	return (
		<Box>
			<TextInput
				{...filterInputs.getInputProps("name")}
				label='Name'
				placeholder='Name'
				key={v4()}
			/>
			<ICommonDataTable
				columns={columns}
				rows={rows}
				onFilterChange={(filters) => {
					console.log(filters);
				}}
				onActionAdd={handleActionAdd}
				onActionRefresh={handleActionRefresh}
				enableActionAdd={true}
				title={"Page Admin"}
				enableActionExport={true}
				enableFilters={true}
				onSearchInputChange={(text) => {
					console.log(text);
				}}
				onActionExport={(exportType) => {
					console.log(exportType);
				}}
				onFilterInputSubmit={() => {
					console.log("onFilterInputSubmit");
				}}
				filterInputs={[
					<DateInput
						{...filterInputs.getInputProps("date")}
						label='Date input'
						placeholder='Date input'
						key={v4()}
					/>,
				]}
				totalPages={2}
			/>
		</Box>
	);
}
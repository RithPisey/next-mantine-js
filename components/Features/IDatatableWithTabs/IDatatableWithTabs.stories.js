import { IconEdit, IconList, IconTrash } from "@tabler/icons-react";
import { IDataTableWithTabs } from "./IDatatableWithTabsSample";

export default {
	component: IDataTableWithTabs,
	title: "DataTable/IDatatableWithTabsSample",
	tags: ["common"],
	tags: ["autodocs"],
};
const columns = [
	{
		field: "actions",
		header: "Actions",
		type: "actions",
		getAction: (params) => {
			return [
				<IDataTableWithTabs.ActionsMenuItem
					icon={<IconTrash />}
					label={"Delete"}
					onActionClick={(params) => {
						alert("delete");
					}}
				/>,
				<IDataTableWithTabs.ActionsMenuItem
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
	{
		field: "status",
		header: "Status",
		type: "status",
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
		status: false,
	},
	{
		id: 2,
		name: "Mike",
		latin_name: "Mike",
		phone: "123989121",
		alt_phone: "012334556",
		address: "elephant test",
		status: true,
	},
];
export const FullOptions = {
	args: {
		columns: columns,
		rows: rows,
		onFilterChange: (filters) => {},
		onActionAdd: () => {},
		onActionRefresh: () => {},
		enableActionAdd: true,
		title: "IDatatableWithTabsSample",
		enableActionExport: true,
		enableFilters: true,
		enableSearchInput: true,
		onSearchInputChange: (text) => {},
		onActionExport: (exportType) => {},
		filterInputs: [],
		totalPages: 0,
		currentPage: 0,
		onFilterInputSubmit: () => {},
		slots: <></>,
		onStatusChange: (callback) => {},
		showRowNumber: false,
		onFilterInputSubmit: (filters) => {},
		tabListValues: [
			{
				key: "default",
				name: "Default",
				icon: IconList,
			},
			{
				key: "delete",
				name: "Deleted",
				icon: IconTrash,
			},
		],
		onTabChange: (value) => {},
	},
};

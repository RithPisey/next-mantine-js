"use client";
import {
	ActionIcon,
	Box,
	Button,
	Combobox,
	Grid,
	Group,
	Input,
	Modal,
	Pagination,
	Paper,
	Space,
	Table,
	Text,
	TextInput,
	Title,
	useCombobox,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import {
	IconEdit,
	IconEye,
	IconEyeClosed,
	IconEyeOff,
	IconFileExport,
	IconFilter,
	IconPlus,
	IconRefresh,
	IconSearch,
	IconSelector,
	IconSettings,
	IconSortAscending,
	IconSortDescending,
	IconTableExport,
	IconTool,
	IconTools,
	IconTrash,
	IconUpload,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
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
							console.log(params);
						}}
					/>,
					<ICommonDataTable.ActionsMenuItem
						icon={<IconEdit />}
						label={"Edit"}
						onActionClick={(params) => {
							console.log(params);
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

	const handleActionAdd = function () {};

	const handleActionRefresh = function () {};

	return (
		<Box>
			<DatePickerInput
				label='Pick date'
				placeholder='Pick date'
				onChange={(e) => {
					console.log(e);
				}}
			/>
			<ICommonDataTable columns={columns} rows={rows}>
				<ICommonDataTable.Header
					onActionAdd={handleActionAdd}
					onActionRefresh={handleActionRefresh}
					enableActionAdd={true}
					title={"Page Admin"}
				/>
				<ICommonDataTable.Filters
					enableActionExport={true}
					onFilterChange={(filter) => {
						console.log(filter);
					}}
					handleFilterInputSubmit={(params) => {}}
				>
					<ICommonDataTable.Filters.FilterModalInput>
						<TextInput name='filter_name' label='Name' placeholder='Name' />
						<TextInput name='filter_phone' label='Phone' placeholder='Phone' />
						<TextInput
							name='filter_address'
							label='Phone'
							placeholder='Address'
						/>
						<TextInput name='filter_email' label='Phone' placeholder='Email' />
						<DatePickerInput
							label='Pick date'
							placeholder='Pick date'
							name='filter_dp'
						/>
					</ICommonDataTable.Filters.FilterModalInput>
				</ICommonDataTable.Filters>
				<ICommonDataTable.DataTable />
			</ICommonDataTable>
		</Box>
	);
}

ICommonDataTable.Header = function ({
	title,
	onActionRefresh,
	onActionAdd,
	enableActionAdd,
	columns = [],
}) {
	// console.log(title);
	return (
		<Box py={"md"}>
			<Grid>
				<Grid.Col span={6} style={{ color: "gray" }}>
					<Title size={"h3"}>{title}</Title>
				</Grid.Col>
				<Grid.Col span={6}>
					<Group justify='end'>
						<Button variant='outline' leftSection={<IconRefresh />}>
							Refresh
						</Button>
						{enableActionAdd && <Button leftSection={<IconPlus />}>Add</Button>}
					</Group>
				</Grid.Col>
			</Grid>
		</Box>
	);
};
ICommonDataTable.Filters = function ({
	columns = [],
	children,
	onFilterChange = (callback) => callback(filterData),
	onSearchChange,
	onActionExport,
	enableActionExport,
	filterData,
	setFilterData,
	handleFilterInputSubmit,
}) {
	const [
		openedFilterModal,
		{ open: openFilterModal, close: closeFilterModal },
	] = useDisclosure(false);

	const rowsPerPageCB = useCombobox({
		onDropdownClose: () => rowsPerPageCB.resetSelectedOption(),
	});
	const sortByCB = useCombobox({
		onDropdownClose: () => sortByCB.resetSelectedOption(),
	});
	const sortTypeCB = useCombobox({
		onDropdownClose: () => sortTypeCB.resetSelectedOption(),
	});
	const hideColumnsCB = useCombobox({
		onDropdownClose: () => hideColumnsCB.resetSelectedOption(),
	});

	const actionExportCB = useCombobox({
		onDropdownClose: () => actionExportCB.resetSelectedOption(),
	});

	const rowsPerPageOptions = filterData.rowsPerPage.map((item) => (
		<Combobox.Option value={item} key={Date.now() + item}>
			{item}
		</Combobox.Option>
	));

	const sortByOptions = [
		<Combobox.Option value={"reset"} key={Date.now() + "reset"}>
			reset
		</Combobox.Option>,
		...filterData.sortBy.map(
			(item) =>
				item.field !== "actions" && (
					<Combobox.Option value={item.field} key={Date.now() + item.field}>
						{item.header}
					</Combobox.Option>
				)
		),
	];

	const sortTypeOptions = filterData.sortType.map((item) => (
		<Combobox.Option value={item} key={Date.now() + item}>
			{item}
		</Combobox.Option>
	));
	const hideColumnOptions = filterData.hideColumns.map((item) => (
		<Combobox.Option value={item.field} key={Date.now() + item.field}>
			{item.hideable && item.header}
		</Combobox.Option>
	));
	const actionExportOptions = filterData.actionExports.map((item) => (
		<Combobox.Option value={item.text} key={Date.now() + item.text}>
			<Group>
				<item.icon size={14} /> {item.text}
			</Group>
		</Combobox.Option>
	));

	function FilterModal({
		opened = false,
		handleClose,
		filterData,
		onFilterInputSubmit,
	}) {
		return (
			<Modal opened={opened} onClose={handleClose} title='Filters'>
				<Grid>
					{React.Children.map(children.props.children, (child, index) => {
						let com = (
							<Grid.Col span={6} key={v4()}>
								{child}
							</Grid.Col>
						);
						return React.cloneElement(com);
					})}
				</Grid>
				<Group justify='end' mt={15}>
					<Button onClick={onFilterInputSubmit}>Filter</Button>
				</Group>
			</Modal>
		);
	}

	return (
		<Paper withBorder shadow='sm' p='md' radius={"md"}>
			<Grid>
				<Grid.Col span={6}>
					<Group justify='start'>
						<Combobox
							store={rowsPerPageCB}
							position='bottom-center'
							onOptionSubmit={(val) => {
								let fd = {
									...filterData,
									values: { ...filterData.values, rowPerPage: val },
								};
								setFilterData(fd);
								onFilterChange(fd.values);

								rowsPerPageCB.closeDropdown();
							}}
						>
							<Combobox.Target>
								<Button
									color='gray'
									variant='light'
									rightSection={<IconSelector size={16} />}
									onClick={() => rowsPerPageCB.toggleDropdown()}
								>
									{filterData.values.rowPerPage}
								</Button>
							</Combobox.Target>
							<Combobox.Dropdown>
								<Combobox.Options>{rowsPerPageOptions}</Combobox.Options>
							</Combobox.Dropdown>
						</Combobox>
						<Combobox
							store={sortByCB}
							width={180}
							position='bottom-center'
							onOptionSubmit={(val) => {
								let sb = val;
								if (val === "reset") {
									sb = "";
								}
								let fd = {
									...filterData,
									values: { ...filterData.values, sortBy: sb },
								};
								setFilterData(fd);
								onFilterChange(fd.values);
								sortByCB.closeDropdown();
							}}
						>
							<Combobox.Target>
								<Button
									color='gray'
									variant='light'
									rightSection={<IconSelector size={16} />}
									onClick={() => sortByCB.toggleDropdown()}
								>
									Sort By {filterData.values.sortBy}
								</Button>
							</Combobox.Target>
							<Combobox.Dropdown>
								<Combobox.Options> {sortByOptions}</Combobox.Options>
							</Combobox.Dropdown>
						</Combobox>
						<Combobox
							store={sortTypeCB}
							width={180}
							position='bottom-center'
							onOptionSubmit={(val) => {
								let fd = {
									...filterData,
									values: { ...filterData.values, sortType: val },
								};
								setFilterData(fd);
								onFilterChange(fd.values);
								sortTypeCB.closeDropdown();
							}}
						>
							<Combobox.Target>
								<ActionIcon
									size={"lg"}
									color='gray'
									variant='light'
									onClick={() => sortTypeCB.toggleDropdown()}
								>
									{filterData.values.sortType === "asc" ? (
										<IconSortDescending size={16} />
									) : (
										<IconSortAscending size={16} />
									)}
								</ActionIcon>
							</Combobox.Target>
							<Combobox.Dropdown>
								<Combobox.Options>{sortTypeOptions}</Combobox.Options>
							</Combobox.Dropdown>
						</Combobox>
						<Combobox
							store={hideColumnsCB}
							width={180}
							position='bottom-center'
							onOptionSubmit={(val) => {
								let hideColumn = val;
								if (!filterData.values.hideColumn.includes(hideColumn)) {
									let fd = {
										...filterData,
										values: {
											...filterData.values,
											hideColumn: [...filterData.values.hideColumn, hideColumn],
										},
									};
									setFilterData(fd);
									onFilterChange(fd.values);
								} else {
									let fd = {
										...filterData,
										values: {
											...filterData.values,
											hideColumn: filterData.values.hideColumn.filter(
												(v) => v !== hideColumn
											),
										},
									};
									setFilterData(fd);
									onFilterChange(fd.values);
								}

								hideColumnsCB.closeDropdown();
							}}
						>
							<Combobox.Target>
								<ActionIcon
									size={"lg"}
									color='gray'
									variant='light'
									onClick={() => hideColumnsCB.toggleDropdown()}
								>
									<IconEyeOff size={16} />
								</ActionIcon>
							</Combobox.Target>
							<Combobox.Dropdown>
								<Combobox.Options>{hideColumnOptions}</Combobox.Options>
							</Combobox.Dropdown>
						</Combobox>
					</Group>
				</Grid.Col>
				<Grid.Col span={6}>
					<Group justify='end'>
						{enableActionExport && (
							<Combobox
								store={actionExportCB}
								position='bottom-center'
								onOptionSubmit={(val) => {
									actionExportCB.closeDropdown();
								}}
							>
								<Combobox.Target>
									<Button
										color='gray'
										variant='light'
										rightSection={<IconUpload size={16} />}
										onClick={() => actionExportCB.toggleDropdown()}
									>
										Export
									</Button>
								</Combobox.Target>
								<Combobox.Dropdown>
									<Combobox.Options>{actionExportOptions}</Combobox.Options>
								</Combobox.Dropdown>
							</Combobox>
						)}

						<Input
							placeholder='Search'
							leftSection={<IconSearch size={"16"} />}
						/>
						<ActionIcon onClick={openFilterModal} size={"lg"}>
							<IconFilter />
						</ActionIcon>
					</Group>
				</Grid.Col>
			</Grid>
			<FilterModal
				filterData={filterData}
				opened={openedFilterModal}
				handleClose={closeFilterModal}
				onFilterInputSubmit={handleFilterInputSubmit}
			/>
		</Paper>
	);
};
ICommonDataTable.Filters.FilterModalInput = function ({ children }) {
	return children;
};

ICommonDataTable.DataTable = function ({
	columns = [],
	rows = [],
	currentPage = 0,
	totalPage = 0,
	onPageChange,
	eventOnRowsAction,
	showRowNumber = true,
	filterData,
	setFilterData,
}) {
	const [columnsFromProp, setColumnsFromProp] = useState([]);

	useEffect(() => {
		setColumnsFromProp(columns);
		if (columns.some((col) => col.type === "actions")) {
			let colAction = columns.filter((col) => col.type === "actions");
			let noColAction = columns.filter((col) => col.type !== "actions");

			if (showRowNumber) {
				setColumnsFromProp([
					...colAction,
					{
						header: "Nº",
						field: "irow_index",
					},

					...noColAction,
				]);
			} else {
				setColumnsFromProp([...colAction, ...noColAction]);
			}
		} else if (showRowNumber) {
			setColumnsFromProp([
				{
					header: "Nº",
					field: "irow_index",
				},
				...columns,
			]);
		}
	}, []);

	const RenderActionMenu = ({ row }) => {
		const actionMenuCB = useCombobox({
			onDropdownClose: () => actionMenuCB.resetSelectedOption(),
		});
		return (
			<Table.Td align='center' width={80}>
				<Combobox
					width={150}
					store={actionMenuCB}
					position='bottom-center'
					onOptionSubmit={() => {}}
				>
					<Combobox.Target>
						<ActionIcon
							variant='transparent'
							onClick={() => actionMenuCB.toggleDropdown()}
						>
							<IconTool size={14} />
						</ActionIcon>
					</Combobox.Target>
					<Combobox.Dropdown>
						<Combobox.Options>
							{columnsFromProp.map((col, index) => {
								if (col.type === "actions") {
									const Opt = col.getAction;
									return Opt().map((child, index) => {
										return React.cloneElement(child, {
											key: v4(),
											row: row,
										});
									});

									// return <Opt key={Date.now() + index * 5} />;
								}
							})}
						</Combobox.Options>
					</Combobox.Dropdown>
				</Combobox>
			</Table.Td>
		);
	};

	return (
		<Paper withBorder shadow='sm' p='md' radius={"md"} mt={16}>
			<Table.ScrollContainer minWidth={390}>
				<Table>
					<Table.Thead>
						<Table.Tr>
							{/* {showRowNumber && <Table.Th w={30}>Nº</Table.Th>} */}
							{columnsFromProp.map((col) => {
								return (
									!filterData.values.hideColumn.includes(col.field) && (
										<Table.Th
											key={v4()}
											ta={
												col.type === "actions" || col.field === "irow_index"
													? "center"
													: "left"
											}
										>
											{col.header}
										</Table.Th>
									)
								);
							})}
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{rows.map((row, index) => (
							<Table.Tr key={v4()}>
								{[
									<RenderActionMenu key={v4()} row={row} />,
									columnsFromProp.map((col, colIndex) => {
										return (
											col.type !== "actions" &&
											!filterData.values.hideColumn.includes(col.field) && (
												<Table.Td
													key={v4()}
													ta={col.field === "irow_index" && "center"}
												>
													{col.field === "irow_index"
														? index + 1
														: row[col.field]}
												</Table.Td>
											)
										);
									}),
								]}
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
			<Space h={"md"} />
			<Grid>
				<Grid.Col span={6}>
					<Text fw={"bold"} c={"gray"}>
						{currentPage} of {totalPage}
					</Text>
				</Grid.Col>
				<Grid.Col span={6}>
					<Group justify='end'>
						<Pagination
							total={totalPage}
							boundaries={1}
							siblings={1}
							withEdges
						/>
					</Group>
				</Grid.Col>
			</Grid>
		</Paper>
	);
};

ICommonDataTable.ActionsMenuItem = function ({
	icon,
	onActionClick = (e) => {},
	label,
	row,
}) {
	return (
		<Combobox.Option onClick={() => onActionClick(row)}>
			<Group>
				{React.cloneElement(icon)} {label}
			</Group>
		</Combobox.Option>
	);
};

function ICommonDataTable({
	children,
	title,
	columns = [],
	rows,
	currentPage = 0,
	totalPage = 0,
}) {
	const [filterData, setFilterData] = useState({
		rowsPerPage: [5, 10, 20],
		sortBy: columns,
		sortType: ["asc", "desc"],
		hideColumns: columns.filter((item) => item.hideable),
		actionExports: [
			{ icon: IconTableExport, text: "excel" },
			{ icon: IconFileExport, text: "print" },
		],
		values: {
			rowPerPage: 5,
			sortBy: null,
			sortType: "asc",
			hideColumn: [],
			filterForm: {},
		},
	});
	const handleSetFilterData = function (value) {
		setFilterData(value);
	};
	return React.Children.map(children, (child, index) => {
		return React.cloneElement(child, {
			columns: columns,
			rows: rows,
			currentPage: currentPage,
			totalPage: totalPage,
			setFilterData: handleSetFilterData,
			filterData: filterData,
		});
	});
}

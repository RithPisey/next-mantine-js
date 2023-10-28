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
	SimpleGrid,
	Space,
	Table,
	Tabs,
	Text,
	Title,
	useCombobox,
} from "@mantine/core";
import { useDisclosure, usePagination } from "@mantine/hooks";
import {
	IconEyeOff,
	IconFileExport,
	IconFilter,
	IconList,
	IconPlus,
	IconRefresh,
	IconSearch,
	IconSelector,
	IconSortAscending,
	IconSortDescending,
	IconTableExport,
	IconTool,
	IconTrash,
	IconUpload,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
CommonDataTable.Header = function ({
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
						<Button
							variant='outline'
							onClick={onActionRefresh}
							leftSection={<IconRefresh />}
						>
							Refresh
						</Button>
						{enableActionAdd && (
							<Button onClick={onActionAdd} leftSection={<IconPlus />}>
								Add
							</Button>
						)}
					</Group>
				</Grid.Col>
			</Grid>
		</Box>
	);
};
CommonDataTable.Filters = function ({
	children,
	onFilterChange = (callback) => callback(filterData),
	onSearchInputChange,
	onActionExport,
	enableActionExport,
	enableFilters,
	enableSearchInput = true,
	filterData,
	setFilterData,
	filterInputs,
	onFilterInputSubmit,
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
		<Combobox.Option
			onClick={() => onActionExport(item.text)}
			value={item.text}
			key={Date.now() + item.text}
		>
			<Group>
				<item.icon size={14} /> {item.text}
			</Group>
		</Combobox.Option>
	));

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

						{enableSearchInput && (
							<Input
								placeholder='Search'
								leftSection={<IconSearch size={"16"} />}
								onChange={(e) => onSearchInputChange(e.target.value)}
							/>
						)}
						{enableFilters && (
							<ActionIcon onClick={openFilterModal} size={"lg"}>
								<IconFilter />
							</ActionIcon>
						)}
					</Group>
				</Grid.Col>
			</Grid>
			<FilterModal
				filterData={filterData}
				opened={openedFilterModal}
				handleClose={closeFilterModal}
				onFilterInputSubmit={onFilterInputSubmit}
				filterInputs={filterInputs}
			/>
		</Paper>
	);
};

function FilterModal({
	opened = false,
	handleClose,
	filterData,
	onFilterInputSubmit,
	filterInputs,
}) {
	return (
		<Modal opened={opened} onClose={handleClose} title='Filters'>
			<SimpleGrid cols={2}>
				{React.Children.map(filterInputs, (child, index) => {
					return React.cloneElement(child, {
						key: index * new Date().getFullYear(),
					});
				})}
			</SimpleGrid>
			<Group justify='end' mt={15}>
				<Button onClick={onFilterInputSubmit}>Filter</Button>
			</Group>
		</Modal>
	);
}

CommonDataTable.DataTable = function ({
	columns = [],
	rows = [],
	currentPage = 0,
	totalPages = 0,
	eventOnRowsAction,
	showRowNumber = true,
	filterData,
	setFilterData,
	onFilterChange = (callback) => callback(filterData),
	tabListValues = [
		{
			key: "default",
			name: "Default",
			icon: IconList,
		},
	],
	onTabChange = (value) => {},
}) {
	const [columnsFromProp, setColumnsFromProp] = useState([]);
	const [tabValue, setTabValue] = useState(tabListValues[0].key);

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

	const TableCom = function ({ tab }) {
		return (
			<Box>
				{" "}
				<Table.ScrollContainer minWidth={390}>
					<Table>
						<Table.Thead>
							<Table.Tr>
								{/* {showRowNumber && <Table.Th w={30}>Nº</Table.Th>} */}
								{columnsFromProp.map((col) => {
									return (
										!filterData.values.hideColumn.includes(col.field) &&
										(col.tab ? (
											col.tab === tab && (
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
										) : (
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
										))
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
												!filterData.values.hideColumn.includes(col.field) &&
												(col.tab ? (
													col.tab === tab && (
														<Table.Td
															key={v4()}
															ta={col.field === "irow_index" && "center"}
														>
															{col.field === "irow_index"
																? index + 1
																: row[col.field]}
														</Table.Td>
													)
												) : (
													<Table.Td
														key={v4()}
														ta={col.field === "irow_index" && "center"}
													>
														{col.field === "irow_index"
															? index + 1
															: row[col.field]}
													</Table.Td>
												))
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
							{currentPage} of {totalPages}
						</Text>
					</Grid.Col>
					<Grid.Col span={6}>
						<Group justify='end'>
							<Pagination
								total={totalPages}
								boundaries={1}
								siblings={1}
								withEdges
								onChange={(val) => {
									let fd = {
										...filterData,
										values: { ...filterData.values, page: val },
									};
									setFilterData(fd);
									onFilterChange(fd.values);
								}}
							/>
						</Group>
					</Grid.Col>
				</Grid>
			</Box>
		);
	};

	return (
		<Paper withBorder shadow='sm' p='md' radius={"md"} mt={16}>
			{tabListValues.length > 0 ? (
				<Tabs
					variant='outline'
					defaultValue={tabListValues[0].key}
					onChange={(value) => {
						setTabValue(value);
						onTabChange(value);
					}}
				>
					<Tabs.List key={v4()}>
						{tabListValues.map((value) => {
							return (
								<Tabs.Tab
									key={v4()}
									value={value.key}
									leftSection={<value.icon size={13} />}
								>
									{value.name}
								</Tabs.Tab>
							);
						})}
					</Tabs.List>
					{tabListValues.map((value) => {
						return (
							<Tabs.Panel key={v4()} value={value.key} py={"sm"}>
								<TableCom tab={tabValue} />
							</Tabs.Panel>
						);
					})}
				</Tabs>
			) : (
				<TableCom />
			)}
		</Paper>
	);
};

function CommonDataTable({
	children,

	columns = [],
	rows,
	currentPage = 1,
	totalPage = 0,
	onFilterChange = (callback) => callback(filterData),
	tabListValues,

	tab,
	onTabChange = (value) => {},
}) {
	useEffect(() => {
		console.log(tab);
	}, [tab]);
	const [filterData, setFilterData] = useState({
		rowsPerPage: [5, 10, 20],
		sortBy: columns,
		sortType: ["asc", "desc"],
		hideColumns: columns.filter((item) =>
			item.tab ? item.tab === tab && item.hideable : item.hideable
		),
		actionExports: [
			{ icon: IconTableExport, text: "excel" },
			{ icon: IconFileExport, text: "print" },
		],
		values: {
			rowPerPage: 5,
			sortBy: "",
			sortType: "asc",
			hideColumn: [],
			page: currentPage,
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
			onFilterChange: onFilterChange,
			onTabChange: onTabChange,
		});
	});
}

export function IDataTableWithTabs({
	columns = [],
	rows = [],
	onFilterChange = (callback) => callback(filterData),
	onActionAdd,
	onActionRefresh,
	enableActionAdd = true,
	title = "",
	enableActionExport,
	enableFilters,
	enableSearchInput,
	onSearchInputChange,
	onActionExport,
	filterInputs = [],
	totalPages = 0,
	currentPage = 1,
	onFilterInputSubmit,
	tabListValues = [
		{
			key: "default",
			name: "Default",
			icon: IconList,
		},
	],
	onTabChange = (value) => {},
}) {
	return (
		<CommonDataTable
			columns={columns}
			rows={rows}
			onFilterChange={onFilterChange}
			tabListValues={tabListValues}
			onTabChange={onTabChange}
		>
			<CommonDataTable.Header
				onActionAdd={onActionAdd}
				onActionRefresh={onActionRefresh}
				enableActionAdd={enableActionAdd}
				title={title}
			/>
			<CommonDataTable.Filters
				enableActionExport={enableActionExport}
				enableFilters={enableFilters}
				enableSearchInput={enableSearchInput}
				onSearchInputChange={onSearchInputChange}
				onActionExport={(exportType) => onActionExport(exportType)}
				filterInputs={filterInputs}
				onFilterInputSubmit={onFilterInputSubmit}
			/>

			<CommonDataTable.DataTable
				totalPages={totalPages}
				currentPage={currentPage}
				tabListValues={tabListValues}
			/>
		</CommonDataTable>
	);
}

IDataTableWithTabs.ActionsMenuItem = function ({
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

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
import { useDisclosure } from "@mantine/hooks";
import {
  IconEye,
  IconEyeClosed,
  IconEyeOff,
  IconFileExport,
  IconFilter,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconSelector,
  IconSortAscending,
  IconSortDescending,
  IconTableExport,
  IconUpload,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

export default function AdminComponent() {
  const columns = [
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

  return (
    <Box>
      <ICommonDataTable columns={columns}>
        <ICommonDataTable.Header enableActionAdd={true} title={"Page Admin"} />
        <ICommonDataTable.Filters enableActionExport={true}>
          <ICommonDataTable.Filters.FilterModalInput>
            <TextInput key="filter_name" label="Name" placeholder="Name" />
            <TextInput key="filter_phone" label="Phone" placeholder="Phone" />
            <TextInput key="filter_phone" label="Phone" placeholder="Phone" />
            <TextInput key="filter_phone" label="Phone" placeholder="Phone" />
          </ICommonDataTable.Filters.FilterModalInput>
        </ICommonDataTable.Filters>
        <ICommonDataTable.DataTable />
      </ICommonDataTable>
    </Box>
  );
}

ICommonDataTable.Header = function Header({
  title,
  onActionRefresh,
  onActionAdd,
  enableActionAdd,
  columns = [],
}) {
  console.log(title);
  return (
    <Box py={"md"}>
      <Grid>
        <Grid.Col span={6} style={{ color: "gray" }}>
          <Title size={"h3"}>{title}</Title>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group justify="end">
            <Button variant="outline" leftSection={<IconRefresh />}>
              Refresh
            </Button>
            {enableActionAdd && <Button leftSection={<IconPlus />}>Add</Button>}
          </Group>
        </Grid.Col>
      </Grid>
    </Box>
  );
};
ICommonDataTable.Filters = function Filters({
  columns = [],
  children,
  onFilterChange = (value) => value,
  onSearchChange,
  onActionExport,
  enableActionExport,
  filterData,
  setFilterData,
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
    ...filterData.sortBy.map((item) => (
      <Combobox.Option value={item.field} key={Date.now() + item.field}>
        {item.header}
      </Combobox.Option>
    )),
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

  const handleFilterChange = function () {
    onFilterChange(filterData);
  };

  function FilterModal({ opened = false, handleClose, filterData }) {
    return (
      <Modal opened={opened} onClose={handleClose} title="Filters">
        <Grid>
          {React.Children.map(children.props.children, (ch, index) => {
            let com = (
              <Grid.Col span={6} key={Date.now() + index}>
                {ch}
              </Grid.Col>
            );
            return React.cloneElement(com, {});
          })}
        </Grid>
        <Group justify="end" mt={15}>
          <Button
            onClick={() => {
              console.log(filterData);
            }}
          >
            Filter
          </Button>
        </Group>
      </Modal>
    );
  }

  useEffect(() => {
    console.log(children);
  });

  return (
    <Paper withBorder shadow="sm" p="md" radius={"md"}>
      <Grid>
        <Grid.Col span={6}>
          <Group justify="start">
            <Combobox
              store={rowsPerPageCB}
              position="bottom-center"
              onOptionSubmit={(val) => {
                setFilterData((prev) => ({
                  ...prev,
                  values: { ...prev.values, rowPerPage: val },
                }));
                handleFilterChange();
                rowsPerPageCB.closeDropdown();
              }}
            >
              <Combobox.Target>
                <Button
                  color="gray"
                  variant="light"
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
              position="bottom-center"
              onOptionSubmit={(val) => {
                let sb = val;
                if (val === "reset") {
                  sb = "";
                }
                setFilterData((prev) => ({
                  ...prev,
                  values: { ...prev.values, sortBy: sb },
                }));
                handleFilterChange();
                sortByCB.closeDropdown();
              }}
            >
              <Combobox.Target>
                <Button
                  color="gray"
                  variant="light"
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
              position="bottom-center"
              onOptionSubmit={(val) => {
                setFilterData((prev) => ({
                  ...prev,
                  values: { ...prev.values, sortType: val },
                }));
                handleFilterChange();
                sortTypeCB.closeDropdown();
              }}
            >
              <Combobox.Target>
                <ActionIcon
                  size={"lg"}
                  color="gray"
                  variant="light"
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
              position="bottom-center"
              onOptionSubmit={(val) => {
                let hideColumn = val;
                if (!filterData.values.hideColumn.includes(hideColumn)) {
                  setFilterData((prev) => ({
                    ...prev,
                    values: {
                      ...prev.values,
                      hideColumn: [...filterData.values.hideColumn, hideColumn],
                    },
                  }));
                } else {
                  setFilterData((prev) => ({
                    ...prev,
                    values: {
                      ...prev.values,
                      hideColumn: filterData.values.hideColumn.filter(
                        (v) => v !== hideColumn
                      ),
                    },
                  }));
                }

                handleFilterChange();
                hideColumnsCB.closeDropdown();
              }}
            >
              <Combobox.Target>
                <ActionIcon
                  size={"lg"}
                  color="gray"
                  variant="light"
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
          <Group justify="end">
            {enableActionExport && (
              <Combobox
                store={actionExportCB}
                position="bottom-center"
                onOptionSubmit={(val) => {
                  actionExportCB.closeDropdown();
                }}
              >
                <Combobox.Target>
                  <Button
                    color="gray"
                    variant="light"
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
              placeholder="Search"
              leftSection={<IconSearch size={"16"} />}
            />
            <ActionIcon onClick={openFilterModal} size={"lg"}>
              <IconFilter />
            </ActionIcon>
          </Group>
        </Grid.Col>
      </Grid>
      {/* <FilterModal opened={openedFilterModal} handleClose={closeFilterModal} /> */}
      <FilterModal
        filterData={filterData}
        opened={openedFilterModal}
        handleClose={closeFilterModal}
      />
    </Paper>
  );
};
ICommonDataTable.Filters.FilterModalInput = function FilterModalInput({
  children,
}) {
  return children;
};

ICommonDataTable.DataTable = function DataTable({
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
  return (
    <Paper withBorder shadow="sm" p="md" radius={"md"} mt={16}>
      <Table.ScrollContainer minWidth={390}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              {showRowNumber && <Table.Th>Nº</Table.Th>}
              {columns.map((col) => {
                return (
                  !filterData.values.hideColumn.includes(col.field) && (
                    <Table.Th key={Date.now() + col.header}>
                      {col.header}
                    </Table.Th>
                  )
                );
              })}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.map((row, index) => (
              <Table.Tr key={Date.now() + row[col.field]}>
                <Table.Td>{showRowNumber && index + 1}</Table.Td>
                {columns.map((col) => {
                  return <Table.Td>{row[col.field]}</Table.Td>;
                })}
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
          <Group justify="end">
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

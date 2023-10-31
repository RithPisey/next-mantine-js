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
  Switch,
  Table,
  Text,
  Title,
  useCombobox,
} from "@mantine/core";
import { useDisclosure, usePagination } from "@mantine/hooks";
import {
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
  IconTool,
  IconUpload,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import { useGetTranslate } from "../../../hooks/useGetDictionary";
CommonDataTable.Header = function ({
  title,
  onActionRefresh,
  onActionAdd,
  enableActionAdd,
  columns = [],
  translate,
}) {
  console.log(translate);
  return (
    <Box py={"md"}>
      <Grid>
        <Grid.Col span={6} style={{ color: "gray" }}>
          <Title size={"h3"}>{title}</Title>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group justify="end">
            <Button
              variant="outline"
              onClick={onActionRefresh}
              leftSection={<IconRefresh />}
            >
              {translate?.datatable.refresh}
            </Button>
            {enableActionAdd && (
              <Button onClick={onActionAdd} leftSection={<IconPlus />}>
                {translate?.datatable.add}
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
  translate,
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
      {translate?.datatable[item]}
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
        <item.icon size={14} /> {translate?.datatable[item.text]}
      </Group>
    </Combobox.Option>
  ));

  return (
    <Paper withBorder shadow="sm" p="md" radius={"md"}>
      <Grid>
        <Grid.Col span={6}>
          <Group justify="start">
            <Combobox
              store={rowsPerPageCB}
              position="bottom-center"
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
                  color="gray"
                  variant="light"
                  rightSection={<IconSelector size={16} />}
                  onClick={() => sortByCB.toggleDropdown()}
                >
                  {translate?.datatable.sortby} {filterData.values.sortBy}
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
                width={140}
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

            {enableSearchInput && (
              <Input
                placeholder={translate?.datatable.search}
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
        translate={translate}
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
  translate,
}) {
  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={translate?.datatable.filters}
    >
      <SimpleGrid cols={2}>
        {React.Children.map(filterInputs, (child, index) => {
          return React.cloneElement(child, {
            key: index * new Date().getFullYear(),
          });
        })}
      </SimpleGrid>
      <Group justify="end" mt={15}>
        <Button onClick={onFilterInputSubmit}>
          {translate?.datatable.filter}
        </Button>
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
  onStatusChange = (callback) => {},
  translate,
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
            header: translate?.datatable["n0"],
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
          header: translate?.datatable["n0"],
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
      <Table.Td align="center" width={80}>
        <Combobox
          width={150}
          store={actionMenuCB}
          position="bottom-center"
          onOptionSubmit={() => {}}
        >
          <Combobox.Target>
            <ActionIcon
              variant="transparent"
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
  const RenderRowData = () => {
    const RenderTableData = ({ col, row, index }) => {
      const [status, setStatus] = useState(row[col.field]);
      return (
        <Table.Td ta={col.field === "irow_index" && "center"}>
          {col.field === "irow_index" ? (
            index + 1
          ) : col.type === "status" ? (
            <>
              <Switch
                checked={status}
                onChange={(event) => {
                  let updateStatus = event.currentTarget.checked;
                  setStatus(event.currentTarget.checked);
                  let newRow = { ...row, status: updateStatus };
                  onStatusChange(newRow);
                }}
              />
            </>
          ) : (
            row[col.field]
          )}
        </Table.Td>
      );
    };
    return rows.map((row, index) => (
      <Table.Tr key={v4()}>
        {[
          columnsFromProp.some((col) => col.type === "actions") && (
            <RenderActionMenu key={v4()} row={row} />
          ),
          columnsFromProp.map((col, colIndex) => {
            return (
              col.type !== "actions" &&
              !filterData.values.hideColumn.includes(col.field) && (
                <RenderTableData key={v4()} col={col} row={row} index={index} />
              )
            );
          }),
        ]}
      </Table.Tr>
    ));
  };
  const ITableScrollContainer = () => {
    return (
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
            <RenderRowData />
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    );
  };

  return (
    <Paper withBorder shadow="sm" p="md" radius={"md"} mt={16}>
      <ITableScrollContainer />
      <Space h={"md"} />
      <Grid>
        <Grid.Col span={6}>
          <Text fw={"bold"} c={"gray"}>
            {currentPage} {translate?.datatable.of} {totalPages}
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group justify="end">
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
    </Paper>
  );
};

function CommonDataTable({
  children,
  columns = [],
  rows,
  currentPage = 1,
  totalPage = 0,
  translate,
  onFilterChange = (callback) => callback(filterData),
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
      translate: translate,
    });
  });
}

CommonDataTable.Slot = function ({ slots }) {
  return <Box mt={15}>{slots}</Box>;
};
export function ICommonDataTable({
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
  slots = <></>,
  onStatusChange = (callback) => {},
  translate = {},
  module = "",
}) {
  // const lang = useGetLanguage();
  // const [translate] = useGetTranslate();

  // const { user } = await getDictionary(lang);

  return (
    <CommonDataTable
      translate={translate}
      columns={columns}
      rows={rows}
      onFilterChange={onFilterChange}
      module={module}
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
      <CommonDataTable.Slot slots={slots} />
      <CommonDataTable.DataTable
        totalPages={totalPages}
        currentPage={currentPage}
        onStatusChange={onStatusChange}
      />
    </CommonDataTable>
  );
}

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

ICommonDataTable.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      header: PropTypes.string,
      type: PropTypes.string,
      getAction: PropTypes.func,
      hideable: PropTypes.bool,
    })
  ),
  rows: PropTypes.array,
  onFilterChange: PropTypes.func,
  onActionAdd: PropTypes.func,
  onActionRefresh: PropTypes.func,
  enableActionAdd: PropTypes.bool,
  title: PropTypes.string,
  enableActionExport: PropTypes.bool,
  enableFilters: PropTypes.bool,
  enableSearchInput: PropTypes.bool,
  onSearchInputChange: PropTypes.func,
  onActionExport: PropTypes.func,
  filterInputs: PropTypes.arrayOf(PropTypes.element),
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  onFilterInputSubmit: PropTypes.func,
  slots: PropTypes.element,
  onStatusChange: PropTypes.func,
  showRowNumber: PropTypes.bool,
  translate: PropTypes.object,
  module: PropTypes.string,
};

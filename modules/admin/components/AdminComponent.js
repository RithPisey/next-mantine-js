"use client";
import {
  ActionIcon,
  Box,
  Button,
  Combobox,
  Grid,
  Group,
  Input,
  Pagination,
  Paper,
  Select,
  Space,
  Table,
  Text,
  Title,
  useCombobox,
} from "@mantine/core";
import {
  IconAddressBook,
  IconArrowDown,
  IconArrowsSort,
  IconDropletDown,
  IconEye,
  IconFileExport,
  IconFilter,
  IconPlus,
  IconPrinter,
  IconRefresh,
  IconSearch,
  IconSelector,
  IconSortAscending,
  IconSortDescending,
  IconTable,
  IconTableExport,
  IconUpload,
} from "@tabler/icons-react";
import { useState } from "react";

export default function AdminComponent() {
  const groceries = [
    "🍎 Apples",
    "🍌 Bananas",
    "🥦 Broccoli",
    "🥕 Carrots",
    "🍫 Chocolate",
  ];
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = groceries.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Box>
      <Box py={"md"}>
        <Grid>
          <Grid.Col span={6} style={{ color: "gray" }}>
            <Title size={"h3"}>Page Admin</Title>
          </Grid.Col>
          <Grid.Col span={6}>
            <Group justify="end">
              <Button variant="outline" leftSection={<IconRefresh />}>
                Refresh
              </Button>
              <Button leftSection={<IconPlus />}>Add</Button>
            </Group>
          </Grid.Col>
        </Grid>
      </Box>
      <Filters />
      <Paper withBorder shadow="sm" p="md" radius={"md"}>
        <Grid>
          <Grid.Col span={6}>
            <Group justify="start">
              <Combobox
                store={combobox}
                width={180}
                position="bottom-center"
                onOptionSubmit={(val) => {
                  combobox.closeDropdown();
                }}
              >
                <Combobox.Target>
                  <Button
                    color="gray"
                    variant="light"
                    rightSection={<IconSelector size={16} />}
                    onClick={() => combobox.toggleDropdown()}
                  >
                    5
                  </Button>
                </Combobox.Target>
                <Combobox.Dropdown>
                  <Combobox.Options>{options}</Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>
              <Combobox
                store={combobox}
                width={180}
                position="bottom-center"
                onOptionSubmit={(val) => {
                  combobox.closeDropdown();
                }}
              >
                <Combobox.Target>
                  <Button
                    color="gray"
                    variant="light"
                    rightSection={<IconSelector size={16} />}
                    onClick={() => combobox.toggleDropdown()}
                  >
                    Sort By
                  </Button>
                </Combobox.Target>
                <Combobox.Dropdown>
                  <Combobox.Options>{options}</Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>
              <Combobox
                store={combobox}
                width={180}
                position="bottom-center"
                onOptionSubmit={(val) => {
                  combobox.closeDropdown();
                }}
              >
                <Combobox.Target>
                  <ActionIcon
                    size={"lg"}
                    color="gray"
                    variant="light"
                    onClick={() => combobox.toggleDropdown()}
                  >
                    <IconSortAscending size={16} />
                  </ActionIcon>
                </Combobox.Target>
                <Combobox.Dropdown>
                  <Combobox.Options>{options}</Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>
              <Combobox
                store={combobox}
                width={180}
                position="bottom-center"
                onOptionSubmit={(val) => {
                  combobox.closeDropdown();
                }}
              >
                <Combobox.Target>
                  <ActionIcon
                    size={"lg"}
                    color="gray"
                    variant="light"
                    onClick={() => combobox.toggleDropdown()}
                  >
                    <IconEye size={16} />
                  </ActionIcon>
                </Combobox.Target>
                <Combobox.Dropdown>
                  <Combobox.Options>{options}</Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <Group justify="end">
              <Combobox
                store={combobox}
                width={180}
                position="bottom-center"
                onOptionSubmit={(val) => {
                  combobox.closeDropdown();
                }}
              >
                <Combobox.Target>
                  <Button
                    color="gray"
                    variant="light"
                    rightSection={<IconUpload size={16} />}
                    onClick={() => combobox.toggleDropdown()}
                  >
                    Export
                  </Button>
                </Combobox.Target>
                <Combobox.Dropdown>
                  <Combobox.Options>{options}</Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>
              <Input
                placeholder="Search"
                leftSection={<IconSearch size={"16"} />}
              />
              <ActionIcon size={"lg"}>
                <IconFilter />
              </ActionIcon>
            </Group>
          </Grid.Col>
        </Grid>
      </Paper>
      <Space h={"md"} />
      <Paper withBorder shadow="sm" p="md" radius={"md"}>
        <Table.ScrollContainer minWidth={390}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Element position</Table.Th>
                <Table.Th>Element name</Table.Th>
                <Table.Th>Symbol</Table.Th>
                <Table.Th>Atomic mass</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>test</Table.Td>
                <Table.Td>test</Table.Td>
                <Table.Td>test</Table.Td>
                <Table.Td>test</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>test</Table.Td>
                <Table.Td>test</Table.Td>
                <Table.Td>test</Table.Td>
                <Table.Td>test</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>test</Table.Td>
                <Table.Td>test</Table.Td>
                <Table.Td>test</Table.Td>
                <Table.Td>test</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
        <Space h={"md"} />
        <Grid>
          <Grid.Col span={6}>
            <Text fw={"bold"} c={"gray"}>
              1 of 6
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Group justify="end">
              <Pagination total={10} boundaries={1} siblings={1} withEdges />
            </Group>
          </Grid.Col>
        </Grid>
      </Paper>
    </Box>
  );
}

function ICommonDataTable() {}

function Header({ title }) {
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
            <Button leftSection={<IconPlus />}>Add</Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
function Filters({ columns = [] }) {
  const groceries = [
    "🍎 Apples",
    "🍌 Bananas",
    "🥦 Broccoli",
    "🥕 Carrots",
    "🍫 Chocolate",
  ];

  const [filterData, setFilterData] = useState({
    rowsPerPage: [5, 10, 20],
    sortBy: columns,
    sortType: ["asc", "desc"],
    hideColumns: columns,
    values: {
      rowPerPage: 5,
      sortBy: null,
      sortType: "asc",
      hideColumn: null,
    },
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

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

  const options = groceries.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const rowsPerPageOptions = filterData.rowsPerPage.map((item) => (
    <Combobox.Option value={item} key={Date.now() + item}>
      {item}
    </Combobox.Option>
  ));

  const sortByOptions = filterData.sortBy.map((item) => (
    <Combobox.Option value={item} key={Date.now() + item}>
      {item}
    </Combobox.Option>
  ));

  const sortTypeOptions = filterData.sortType.map((item) => (
    <Combobox.Option value={item} key={Date.now() + item}>
      {item}
    </Combobox.Option>
  ));
  const hideColumnOptions = filterData.hideColumns.map((item) => (
    <Combobox.Option value={item} key={Date.now() + item}>
      {item}
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
                setFilterData((prev) => ({
                  ...prev,
                  values: { ...prev.values, rowPerPage: val },
                }));
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
                setFilterData((prev) => ({
                  ...prev,
                  values: { ...prev.values, sortBy: val },
                }));
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
                <Combobox.Options>{sortByOptions}</Combobox.Options>
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
              store={combobox}
              width={180}
              position="bottom-center"
              onOptionSubmit={(val) => {
                combobox.closeDropdown();
              }}
            >
              <Combobox.Target>
                <ActionIcon
                  size={"lg"}
                  color="gray"
                  variant="light"
                  onClick={() => combobox.toggleDropdown()}
                >
                  <IconEye size={16} />
                </ActionIcon>
              </Combobox.Target>
              <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
          </Group>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group justify="end">
            <Combobox
              store={combobox}
              width={180}
              position="bottom-center"
              onOptionSubmit={(val) => {
                combobox.closeDropdown();
              }}
            >
              <Combobox.Target>
                <Button
                  color="gray"
                  variant="light"
                  rightSection={<IconUpload size={16} />}
                  onClick={() => combobox.toggleDropdown()}
                >
                  Export
                </Button>
              </Combobox.Target>
              <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
            <Input
              placeholder="Search"
              leftSection={<IconSearch size={"16"} />}
            />
            <ActionIcon size={"lg"}>
              <IconFilter />
            </ActionIcon>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
function table() {}

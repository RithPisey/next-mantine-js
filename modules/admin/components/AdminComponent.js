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
	IconFilter,
	IconPlus,
	IconRefresh,
	IconSearch,
	IconSelector,
} from "@tabler/icons-react";

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
			<Paper shadow='xs' p='xl' radius={"md"}>
				<Grid>
					<Grid.Col span={6} style={{ color: "gray" }}>
						<Title size={"h3"}>Page Admin</Title>
					</Grid.Col>
					<Grid.Col span={6}>
						<Group justify='end'>
							<Button variant='outline' leftSection={<IconRefresh />}>
								Refresh
							</Button>
							<Button leftSection={<IconPlus />}>Add</Button>
						</Group>
					</Grid.Col>
				</Grid>
				<Space h={"md"} />
				<Grid>
					<Grid.Col span={6}>
						<Group justify='start'>
							<Combobox
								store={combobox}
								width={180}
								position='bottom-center'
								onOptionSubmit={(val) => {
									combobox.closeDropdown();
								}}
							>
								<Combobox.Target>
									<ActionIcon
										size={"lg"}
										color='gray'
										variant='light'
										onClick={() => combobox.toggleDropdown()}
									>
										<IconEye size={16} />
									</ActionIcon>
								</Combobox.Target>
								<Combobox.Dropdown>
									<Combobox.Options>{options}</Combobox.Options>
								</Combobox.Dropdown>
							</Combobox>
							<Combobox
								store={combobox}
								width={180}
								position='bottom-center'
								onOptionSubmit={(val) => {
									combobox.closeDropdown();
								}}
							>
								<Combobox.Target>
									<Button
										color='gray'
										variant='light'
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
								position='bottom-center'
								onOptionSubmit={(val) => {
									combobox.closeDropdown();
								}}
							>
								<Combobox.Target>
									<Button
										color='gray'
										variant='light'
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
								position='bottom-center'
								onOptionSubmit={(val) => {
									combobox.closeDropdown();
								}}
							>
								<Combobox.Target>
									<ActionIcon
										size={"lg"}
										color='gray'
										variant='light'
										onClick={() => combobox.toggleDropdown()}
									>
										<IconArrowsSort size={16} />
									</ActionIcon>
								</Combobox.Target>
								<Combobox.Dropdown>
									<Combobox.Options>{options}</Combobox.Options>
								</Combobox.Dropdown>
							</Combobox>
						</Group>
					</Grid.Col>
					<Grid.Col span={6}>
						<Group justify='end'>
							<Input
								placeholder='Search'
								leftSection={<IconSearch size={"16"} />}
							/>
							<ActionIcon size={"lg"}>
								<IconFilter />
							</ActionIcon>
						</Group>
					</Grid.Col>
				</Grid>
				<Space h={"xl"} />
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
						<Group justify='end'>
							<Pagination total={10} boundaries={1} siblings={1} withEdges />
						</Group>
					</Grid.Col>
				</Grid>
			</Paper>
		</Box>
	);
}

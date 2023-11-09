import { Combobox, InputBase, useCombobox } from "@mantine/core";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";

function IComboBox({ lists = [], label, formInputProps }) {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});
	const [value, setValue] = useState("");
	const [key, setKey] = useState("");
	useEffect(() => {
		// we need to wait for options to render before we can select first one
		combobox.selectFirstOption();
	}, []);
	return (
		<Combobox
			store={combobox}
			onOptionSubmit={(optionValue) => {
				setValue(optionValue.value);
				setKey(optionValue.key);
				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<InputBase
					readOnly
					pointer
					rightSection={<Combobox.Chevron />}
					onClick={() => combobox.toggleDropdown()}
					{...formInputProps}
					label={label}
					value={value}
					placeholder={key}
				/>
			</Combobox.Target>
			<Combobox.Dropdown>
				<Combobox.Options>
					{lists.map((value) => (
						<Combobox.Option value={value} key={v4()}>
							{value.key}
						</Combobox.Option>
					))}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}

IComboBox.prototype = {
	lists: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.any,
			value: PropTypes.any,
		})
	),
	label: PropTypes.any,
};

export default IComboBox;

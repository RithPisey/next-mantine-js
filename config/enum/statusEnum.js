import { createEnum } from "../createEnum";

const value = [
	{ label: "inactive", value: "0" },
	{ label: "active", value: "1" },
];

const statusEnum = createEnum(value);
export default statusEnum;

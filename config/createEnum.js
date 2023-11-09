export function createEnum(objectsArray) {
	const enumObject = {};

	for (const obj of objectsArray) {
		const { label, value } = obj;
		enumObject[label] = value;
	}

	enumObject.list = Object.keys(enumObject).map((label) => ({
		value: enumObject[label],
		label: label,
	}));

	enumObject.getlabel = function (value) {
		return Object.keys(enumObject).find((label) => enumObject[label] === value);
	};

	return enumObject;
}

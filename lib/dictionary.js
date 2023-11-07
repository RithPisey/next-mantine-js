const dictionaries = {
	en: () =>
		import("../constant/dictionaries/en.json").then((module) => module.default),
	kh: () =>
		import("../constant/dictionaries/kh.json").then((module) => module.default),
};

export const getDictionary = async (locale) => {
	const dictionary = await dictionaries[locale]();
	return dictionary;
};

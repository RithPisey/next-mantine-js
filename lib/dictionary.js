const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  kh: () => import("@/dictionaries/kh.json").then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();

"use client";
import { getDictionary } from "../lib/dictionary";
import { createContext, useContext, useState } from "react";

export const Language = createContext();

export async function useGetLanguage() {
	const local = useContext(Language);
	const lang = await getDictionary(local);
	return lang;
}
export const currentLocale = () => {
	const local = useContext(Language);
	return local;
};

export const useGetCurrentLocale = function () {
	const locale = useContext(Language);
	return [locale];
};

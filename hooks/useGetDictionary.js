"use client";
import { useGetLanguage } from "../config/lang";
import { useEffect, useState } from "react";
export function useGetTranslate() {
	const [translate, setTranslate] = useState(null);
	const trans = useGetLanguage();

	function t(key) {
		if (translate) {
			return translate[key];
		} else {
			return "";
		}
	}

	useEffect(() => {
		trans.then((t) => {
			setTranslate(t);
		});
	}, [trans]);
	return [t];
}

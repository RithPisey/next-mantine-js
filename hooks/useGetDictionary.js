"use client";
import { useGetLanguage } from "../config/lang";
import { useEffect, useState } from "react";
export function useGetTranslate() {
	const [translate, setTranslate] = useState(null);
	const trans = useGetLanguage();

	useEffect(() => {
		trans.then((t) => {
			setTranslate(t);
		});
	}, [trans]);
	return [translate];
}

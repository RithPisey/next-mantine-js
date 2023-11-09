"use client";
import UploadSingleImage from "@/components/Features/UploadImage/UploadSingleImage";
import { useState } from "react";

export default function Dashboard() {
	const [imageFile, setImagefile] = useState(null);
	return (
		<>
			<UploadSingleImage
				image={imageFile}
				getFileImage={(value) => {
					setImagefile(value);
				}}
			/>
			<button onClick={() => setImagefile(null)}>clear image</button>
		</>
	);
}

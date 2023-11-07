"use client";
import CustomLoadingOverlay from "@/components/Loading/CustomLoadingOverlay";
import PagloadLoading from "@/components/Loading/PagloadLoading";
import {
	LoadingOverlay,
	Skeleton,
	Stack,
	useMantineTheme,
} from "@mantine/core";
import { ClockLoader, PropagateLoader } from "react-spinners";

export default function Loading() {
	const theme = useMantineTheme();
	return (
		<MainLayout>
			<Stack>
				<Skeleton visible={true} height={"60px"}></Skeleton>
				<Skeleton visible={true} height={"100px"}></Skeleton>
				<Skeleton visible={true} height={"500px"}></Skeleton>
			</Stack>
		</MainLayout>
	);
}

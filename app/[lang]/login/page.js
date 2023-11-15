"use client";
import { useAuth } from "@/context/AuthContext";
import useNotification from "@/hooks/notifications/useNotification";
import useIdentity from "@/hooks/service/identity/useIdentity";
import {
	Avatar,
	Box,
	Button,
	Center,
	Image,
	Paper,
	PasswordInput,
	Stack,
	TextInput,
} from "@mantine/core";
import { hasLength, isEmail, useForm, yupResolver } from "@mantine/form";
import { useRouter } from "next/navigation";
import * as yup from "yup";

function LoginPage() {
	const schema = yup.object({
		email: yup.string().required().email("Invalid email"),
		password: yup.string().required().min(8).max(16),
	});

	//custom hook
	const { NSuccess, NError, NWarning } = useNotification();
	const [user, signIn, isLoading, error] = useIdentity();

	const [auth] = useAuth();
	const router = useRouter();

	const formLogin = useForm({
		initialValues: {
			email: "",
			password: "",
		},
		validateInputOnBlur: true,
		validate: yupResolver(schema),
	});

	const handleLogin = function (values) {
		// auth.setAuthentication(values);
		// router.push("/");
		// console.log(values);
		// const  = onLogin();
		// onLogin();
		// console.log(result);
		// NWarning("success");
		signIn(values.email, values.password);
		// console.log(user);
	};

	return (
		<Center h={"100vh"} w={"100vw"}>
			<Box>
				<Paper shadow='xs' p='xl' withBorder>
					<Stack miw={"320px"} align='center'>
						<Image
							h={150}
							w={150}
							src='https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80'
						/>
						<Stack gap={10} w={"100%"}>
							<TextInput
								{...formLogin.getInputProps("email")}
								onBlur={formLogin.getInputProps("email").onBlur}
								size='md'
								label='Email'
								placeholder='Email'
							/>
							<PasswordInput
								{...formLogin.getInputProps("password")}
								size='md'
								label='Password'
								placeholder='Password'
							/>
							<Button
								onClick={formLogin.onSubmit(handleLogin)}
								mt={"md"}
								size='md'
							>
								{" "}
								Sign In
							</Button>
						</Stack>
					</Stack>
				</Paper>
			</Box>
		</Center>
	);
}

export default LoginPage;

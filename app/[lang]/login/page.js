"use client";
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
import * as Yup from "yup";

function LoginPage() {
  const schema = Yup.object({
    email: Yup.string().email("Invalid email"),
    password: Yup.string().required().min(8).max(16),
  });

  const formLogin = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validateInputOnBlur: true,
    validate: yupResolver(schema),
  });

  return (
    <Center h={"100vh"} w={"100vw"}>
      <Box>
        <Paper shadow="xs" p="xl" withBorder>
          <Stack miw={"320px"} align="center">
            <Image
              h={150}
              w={150}
              src="https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
            />
            <Stack gap={10} w={"100%"}>
              <TextInput
                {...formLogin.getInputProps("email")}
                onBlur={formLogin.getInputProps("email").onBlur}
                size="md"
                label="Email"
                placeholder="Email"
              />
              <PasswordInput
                {...formLogin.getInputProps("password")}
                size="md"
                label="Password"
                placeholder="Password"
              />
              <Button
                onClick={formLogin.onSubmit((values) => {})}
                mt={"md"}
                size="md"
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
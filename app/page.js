"use client";
import { theme } from "@/config/themes";
import {
  Button,
  Checkbox,
  Chip,
  Fieldset,
  Group,
  MantineProvider,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
export default function Home() {
  return (
    <div>
      <Button>Primary button</Button>
      <Button color="blue">Blue button</Button>
      <Button color="violet.4">Button</Button>
      <Title order={1}>This is h1 title</Title>
      <Text>Hello World</Text>
      <Group>
        <Checkbox color="secondary" label="Love" defaultChecked />
        <Checkbox label="Love" defaultChecked />
      </Group>
      <Group>
        <Chip variant="filled">Chip</Chip>
        <Chip variant="outline" color="secondary">
          Chip
        </Chip>
      </Group>
      <Fieldset legend="Personal information">
        <TextInput label="Your name" placeholder="Your name" />
        <TextInput label="Email" placeholder="Email" mt="md" />

        <Group justify="flex-end" mt="md">
          <Button>Submit</Button>
        </Group>
      </Fieldset>
    </div>
  );
}

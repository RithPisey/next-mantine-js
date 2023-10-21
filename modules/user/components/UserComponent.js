"use client";

import { Button } from "@mantine/core";

export default function UserComponent({ t }) {
  return (
    <>
      <h1>Hello</h1>
      <Button onClick={() => alert("Hello")}>Click Me</Button>
    </>
  );
}

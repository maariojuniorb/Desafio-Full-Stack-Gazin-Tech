import { Button, Flex, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";

export default function LevelForm({ buttonLabel, onSubmit, initialValues }) {
  const form = useForm();

  useEffect(() => {
    form.setValues(initialValues);
  }, [initialValues]);

  return (
    <Flex w={"50%"} justify={"center"}>
      <form style={{ width: "100%" }} onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          placeholder="Digite o nome do nível"
          label="Nível"
          {...form.getInputProps("nivel")}
        />
        <Group position="right" mt="md">
          <Button type="submit">{buttonLabel}</Button>
        </Group>
      </form>
    </Flex>
  );
}

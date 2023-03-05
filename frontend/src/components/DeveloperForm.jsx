import {
  Button,
  Flex,
  Group,
  SegmentedControl,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext, useEffect } from "react";
import DesafioContext from "../context/DesafioContext";
import { requestData } from "../services/request";

export default function DeveloperForm({
  buttonLabel,
  onSubmit,
  initialValues,
}) {
  const { levels, setLevels } = useContext(DesafioContext);

  useEffect(() => {
    const getLevels = () =>
      requestData("/levels")
        .then((response) => setLevels(response))
        .catch((error) => console.log(error));
    getLevels();
  }, [setLevels]);

  const form = useForm({
    initialValues: {
      nivel: '',
      nome: '',
      sexo: 'Masculino',
      dataNascimento: '',
      idade: '',
      hobby: ''
    }
  });

  useEffect(() => {
    if (initialValues) {
      form.setValues(initialValues);
    }
  }, [initialValues]);

  return (
    <Flex w={"50%"} justify={"center"}>
      <form style={{ width: "100%" }} onSubmit={form.onSubmit(onSubmit)}>
        <Select
          label="Nível"
          placeholder="Informe o nível do desenvolvedor"
          data={levels.map((level) => {
            return { value: level.id, label: level.nivel };
          })}
          {...form.getInputProps("nivel")}
        />
        <TextInput
          placeholder="Digite o nome do desenvolvedor"
          label="Nome"
          {...form.getInputProps("nome")}
        />
        <SegmentedControl
          data={[
            { label: "Masculino", value: "Masculino" },
            { label: "Feminino", value: "Feminino" },
          ]}
          {...form.getInputProps("sexo")}
        />
        <TextInput
          placeholder="Formato: AAAA-MM-DD"
          label="Data de nascimento"
          {...form.getInputProps("dataNascimento")}
        />
        <TextInput
          placeholder="Digite a idade do desenvolvedor"
          label="Idade"
          {...form.getInputProps("idade")}
        />
        <TextInput
          placeholder="Digite o hobby do desenvolvedor"
          label="Hobby"
          {...form.getInputProps("hobby")}
        />
        <Group position="right" mt="md">
          <Button type="submit">{buttonLabel}</Button>
        </Group>
      </form>
    </Flex>
  );
}

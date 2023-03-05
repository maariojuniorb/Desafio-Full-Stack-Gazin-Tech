import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import DeveloperForm from "../../components/DeveloperForm";
import { createData } from "../../services/request";

export default function CreateDevelopers() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);

  const onSubmit = async (values) => {
    console.log(values);
    await createData("/developers", values)
    .then((response) => {
      setIsFail(false);
      setIsSuccess(true);
    })
    .catch((error) => {
      setIsSuccess(false);
      setIsFail(true);
    });
  };

  return (
    <div>
      <h1>Cadastro de Desenvolvedor</h1>
      {isSuccess && (
        <Notification
          icon={<IconCheck size="1.1rem" />}
          color="teal"
          title="Sucesso"
          withCloseButton={false}
          w={"50%"}
          mb={"16px"}
        >
          Desenvolvedor cadastrado com sucesso
        </Notification>
      )}
      {isFail && (
        <Notification
          icon={<IconX size="1.1rem" />}
          color="red"
          title="Erro"
          withCloseButton={false}
          w={"50%"}
          mb={"16px"}
        >
          Não foi possível cadastrar o desenvolvedor
        </Notification>
      )}
      <DeveloperForm
        buttonLabel={"Cadastrar"}
        onSubmit={onSubmit}
        successMessage={"Desenvolvedor cadastrado com sucesso"}
      />
    </div>
  );
}

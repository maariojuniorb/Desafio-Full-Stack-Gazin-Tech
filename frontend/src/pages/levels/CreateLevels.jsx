import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import LevelForm from "../../components/LevelForm";
import { createData } from "../../services/request";

export default function CreateLevels() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);

  const onSubmit = async (values) => {
    await createData("/levels", values)
    .then((response) => {
      setIsFail(false);
      setIsSuccess(true);
    })
    .catch((error) => {
      setIsSuccess(false);
      setIsFail(true);
    });
  }

  return (
    <div>
      <h1>Cadastro de Nível</h1>
      {isSuccess && (
        <Notification
          icon={<IconCheck size="1.1rem" />}
          color="teal"
          title="Sucesso"
          withCloseButton={false}
          w={"50%"}
          mb={"16px"}
        >
          Nível cadastrado com sucesso
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
          Não foi possível cadastrar o nível
        </Notification>
      )}
      <LevelForm buttonLabel={'Cadastrar'} onSubmit={ onSubmit } />
    </div>
  );
}

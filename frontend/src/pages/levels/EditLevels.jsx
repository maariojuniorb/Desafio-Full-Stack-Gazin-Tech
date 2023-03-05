import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LevelForm from "../../components/LevelForm";
import { editData, requestDataById } from "../../services/request";

export default function EditLevels() {
  const [level, setLevel] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);


  const { id } = useParams();
  const url = `/levels/${id}`

  const onSubmit = async (values) => {
    await editData(url, values)
    .then((response) => {
      setIsFail(false);
      setIsSuccess(true);
    })
    .catch((error) => {
      setIsSuccess(false);
      setIsFail(true);
    });
  }

  useEffect(() => {
    const getLevel = async () => {
      const data = await requestDataById(url);
      setLevel(data);
    }

    getLevel();
  }, [url])

  return (
    <div>
      <h1>Edição de Nível</h1>
      {isSuccess && (
        <Notification
          icon={<IconCheck size="1.1rem" />}
          color="teal"
          title="Sucesso"
          withCloseButton={false}
          w={"50%"}
          mb={"16px"}
        >
          Nível atualizado com sucesso
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
          Não foi possível atualizar o nível
        </Notification>
      )}
      <LevelForm buttonLabel={'Salvar'} onSubmit={ onSubmit } initialValues={ level } />
    </div>
  );
}

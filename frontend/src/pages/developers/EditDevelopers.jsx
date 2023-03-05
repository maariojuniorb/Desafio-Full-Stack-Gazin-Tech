import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeveloperForm from "../../components/DeveloperForm";
import { editData, requestDataById } from "../../services/request";

export default function EditDevelopers() {
  const [developer, setDeveloper] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);

  const { id } = useParams();
  const url = `/developers/${id}`;

  const onSubmit = async (values) => {
    console.log(values);
    await editData(url, values)
      .then((response) => {
        setIsFail(false);
        setIsSuccess(true);
      })
      .catch((error) => {
        setIsSuccess(false);
        setIsFail(true);
      });

  };

  useEffect(() => {
    const getDevelopers = async () => {
      const data = await requestDataById(url);
      setDeveloper(data);
    };
    getDevelopers();
  }, [url]);

  return (
    <div>
      <h1>Edição de Desenvolvedor</h1>
      {isSuccess && (
        <Notification
          icon={<IconCheck size="1.1rem" />}
          color="teal"
          title="Sucesso"
          withCloseButton={false}
          w={"50%"}
          mb={"16px"}
        >
          Desenvolvedor atualizado com sucesso
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
          Não foi possível atualizar o desenvolvedor
        </Notification>
      )}
      <DeveloperForm
        buttonLabel={"Salvar"}
        onSubmit={onSubmit}
        initialValues={developer}
      />
    </div>
  );
}

import { ActionIcon, Button, Flex, Notification, Table, Title } from "@mantine/core";
import { useTimeout } from "@mantine/hooks";
import { IconCheck, IconPencil, IconTrash, IconX } from "@tabler/icons-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DesafioContext from "../../context/DesafioContext";
import { requestData, deleteData } from "../../services/request";

export default function Developers() {
  const { developers, setDevelopers } = useContext(DesafioContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);

  const { start } = useTimeout(() => {
    setIsSuccess(false)
    setIsFail(false)
   }, 3000);

  const getDevelopers = () =>
    requestData("/developers")
      .then((response) => setDevelopers(response))
      .catch((error) => console.log(error));

  const deleveDeveloper = async(id) =>
    deleteData(`developers/${id}`)
    .then((response) => {
      setIsFail(false);
      setIsSuccess(true);
      start();
    })
    .catch((error) => {
      setIsSuccess(false);
      setIsFail(true);
      start();
    });

  useEffect(() => {
    getDevelopers()
  });

  return (
    <div>
      <Flex mb={"16px"} justify='space-between'>
        <Title order={3}> Desenvolvedores </Title>
        <Button color="teal" to='/developers/create' component={ Link }> Cadastrar Novo Desenvolvedor </Button>
      </Flex>
      {isSuccess && (
        <Notification
          icon={<IconCheck size="1.1rem" />}
          color="teal"
          title="Sucesso"
          withCloseButton={false}
          w={"50%"}
          mb={"16px"}
        >
          O desenvolvedor foi excluído com sucesso
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
          Não foi possível excluir o desenvolvedor
        </Notification>
      )}
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Nível</th>
            <th>Sexo</th>
            <th>Data de Nascimento</th>
            <th>Idade</th>
            <th>Hobby</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {developers.map((developer) => {
            return (
              <tr key={developer.id}>
                <td>{developer.id}</td>
                <td>{developer.nome}</td>
                <td>{developer.developerLevel.nivel}</td>
                <td>{developer.sexo}</td>
                <td>{developer.dataNascimento}</td>
                <td>{developer.idade}</td>
                <td>{developer.hobby}</td>
                <td>
                  <ActionIcon color="blue" variant="outline" to={`/developers/edit/${developer.id}`} component={ Link }>
                    <IconPencil size="1.125rem" />
                  </ActionIcon>
                </td>
                <td>
                  <ActionIcon color="red" variant="outline" onClick={() => deleveDeveloper(developer.id)}>
                    <IconTrash size="1.125rem" />
                  </ActionIcon>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

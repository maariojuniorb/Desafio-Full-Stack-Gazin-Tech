import {
  ActionIcon,
  Button,
  Flex,
  Notification,
  Table,
  Title,
} from "@mantine/core";
import { useTimeout } from "@mantine/hooks";
import { IconCheck, IconPencil, IconTrash, IconX } from "@tabler/icons-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DesafioContext from "../../context/DesafioContext";
import { deleteData, requestData } from "../../services/request";

export default function Levels() {
  const { levels, setLevels } = useContext(DesafioContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [actualPage, setActualPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const { start } = useTimeout(() => {
    setIsSuccess(false);
    setIsFail(false);
  }, 3000);

  const loadMore = () => {
    const defaultPageSize = 10;
    const updatedPageSize = pageSize + defaultPageSize;
    setPageSize(updatedPageSize);
    getLevels();
  };

  const shouldShowLoadMore = (levels) => {
    if (levels.length < pageSize) setShowLoadMore(false);
  };

  const getLevels = () =>
    requestData(`/levels?paginaAtual=${actualPage}&tamanhoPagina=${pageSize}`)
      .then((response) => {
        setLevels(response);
        shouldShowLoadMore(response);
      })
      .catch((error) => console.log(error));

  useEffect(() => {
    getLevels();
  }, [pageSize, isSuccess, isFail]);

  const deleveLevel = async (id) =>
    deleteData(`levels/${id}`)
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

  return (
    <div>
      <Flex mb={"16px"} justify="space-between">
        <Title order={3}> Níveis </Title>
        <Button color="teal" to="/levels/create" component={Link}>
          {" "}
          Cadastrar Novo Nível{" "}
        </Button>
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
          O nível foi excluído com sucesso
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
          Não foi possível excluir o nível
        </Notification>
      )}
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>#</th>
            <th>Nível</th>
            <th>Desenvolvedores Associados</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level) => {
            return (
              <tr key={level.id}>
                <td>{level.id}</td>
                <td>{level.nivel}</td>
                <td>{level.associateDevelopers.length}</td>
                <td>
                  <ActionIcon
                    color="blue"
                    variant="outline"
                    to={`/levels/edit/${level.id}`}
                    component={Link}
                  >
                    <IconPencil size="1.125rem" />
                  </ActionIcon>
                </td>
                <td>
                  <ActionIcon
                    color="red"
                    variant="outline"
                    onClick={() => deleveLevel(level.id)}
                  >
                    <IconTrash size="1.125rem" />
                  </ActionIcon>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {showLoadMore && (
        <Button radius="md" w={"150px"} mt={"16px"} onClick={() => loadMore()}>
          Carregar mais
        </Button>
      )}
    </div>
  );
}

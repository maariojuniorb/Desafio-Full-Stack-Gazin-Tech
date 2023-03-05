import {
  AppShell,
  Header,
  Navbar,
  Title,
  NavLink,
  Container,
} from "@mantine/core";
import { IconChevronRight, IconUser } from "@tabler/icons-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} height={500} p="xs">
            <NavLink
              label="Desenvolvedores"
              icon={<IconUser size="1rem" stroke={1.5} />}
              rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
              variant="subtle"
              to="/developers"
              component={Link}
            />
            <NavLink
              label="Níveis"
              icon={<IconUser size="1rem" stroke={1.5} />}
              rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
              variant="subtle"
              to="/levels"
              component={Link}
            />
          </Navbar>
        }
        header={
          <Header height={60} p="xs">
            <Title order={2} color="blue.9" to="/" component={Link}>
              Desafio FullStack GazinTech
            </Title>
          </Header>
        }
      >
        <Container fluid>
          <Outlet />
        </Container>
      </AppShell>
    </div>
  );
}

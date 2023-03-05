import React from "react";
import { Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import DesafioProvider from "./context/DesafioProvider";
import Home from './pages/Home';
import Developers from "./pages/developers/Developers";
import CreateLevels from './pages/levels/CreateLevels';
import EditDevelopers from "./pages/developers/EditDevelopers";
import EditLevels from "./pages/levels/EditLevels";
import CreateDevelopers from './pages/developers/CreateDeveloper';
import Levels from "./pages/levels/Levels";
import Layout from "./components/Layout.";

function App() {
  return (
    <div>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <DesafioProvider>
          <Routes>
              <Route path="/" element={ <Layout /> }>
                <Route index element={ <Home /> }/>
                <Route path='developers' element={ <Developers /> }/>
                <Route path='developers/create' element={ <CreateDevelopers /> }/>
                <Route path='developers/edit/:id' element={ <EditDevelopers /> }/>
                <Route path='levels' element={ <Levels /> }/>
                <Route path='levels/create' element={ <CreateLevels /> }/>
                <Route path='levels/edit/:id' element={ <EditLevels /> }/>
              </Route>
          </Routes>
        </DesafioProvider>
      </MantineProvider>
    </div>
  );
}

export default App;

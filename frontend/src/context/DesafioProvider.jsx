import DesafioContext from "./DesafioContext"
import React, { useState, } from 'react';

function DesafioProvider({ children }) {
  const [developers, setDevelopers] = useState([]);
  const [levels, setLevels] = useState([]);
  const [level, setLevel] = useState([]);
  const [developer, setDeveloper] = useState([]);

  const contextValue = {
    developers,
    setDevelopers,
    levels,
    setLevels,
    level,
    setLevel,
    developer,
    setDeveloper
  }

  return (
    <DesafioContext.Provider value= { contextValue }>
      { children }
    </DesafioContext.Provider>
  );
}

export default DesafioProvider;

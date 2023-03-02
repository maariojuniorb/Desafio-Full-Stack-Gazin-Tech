import Ideveloper from "../../../src/interfaces/IDeveloper";

const allFiles = [
  {
    id: 1,
    nivel: 4,
    nome: "Mario Bispo Juniorrr",
    sexo: "8",
    dataNascimento: "1993-12-17",
    idade: 26,
    hobby: "Swimming",
  },
  {
    id: 2,
    nivel: 3,
    nome: "Marcos Vinicius",
    sexo: "Masculino",
    dataNascimento: "1992-08-16",
    idade: 30,
    hobby: "To cook",
  },
  {
    id: 3,
    nivel: 4,
    nome: "Albert Lukas",
    sexo: "Masculino",
    dataNascimento: "1992-05-13",
    idade: 30,
    hobby: "Basketball",
  },
]

const bodySucess = {
    nivel: 4,
    nome: "Carla Santana",
    sexo: "Feminino",
    dataNascimento: new Date('1993-12-17'),
    idade: 24,
    hobby: "Swimming",
}

const responseBodySucess = {
  id: 5,
  nivel: 4,
  nome: "Carla Santana",
  sexo: "Feminino",
  dataNascimento: new Date("1993-12-17"),
  idade: 24,
  hobby: "Swimming",
}

const bodyFail = {
  nivel: 4,
  nome: "Carla Santana",
  sexo: "Feminino",
  dataNascimento: "17-12-1993",
  idade: 24,
  hobby: "Swimming",
}

const bodyWithoutNivel = {
  nome: "Mario Bispo Juniorrr",
  sexo: "Masculino",
  dataNascimento: "1993-12-17",
  idade: 26,
  hobby: "Swimming",
}

const bodyWithoutNome = {
  nivel: 4,
  sexo: "Masculino",
  dataNascimento: "1993-12-17",
  idade: 26,
  hobby: "Swimming",
}

const bodyWithoutSexo = {
  nivel: 4,
  nome: "Mario Bispo Juniorrr",
  dataNascimento: "1993-12-17",
  idade: 26,
  hobby: "Swimming",
}

const bodyWithoutDataNascimento = {
  nivel: 4,
  nome: "Mario Bispo Juniorrr",
  sexo: "Masculino",
  idade: 26,
  hobby: "Swimming",
}

const bodyWhitoutIdade = {
  nivel: 4,
  nome: "Mario Bispo Juniorrr",
  sexo: "Masculino",
  dataNascimento: "1993-12-17",
  hobby: "Swimming",
}

const bodyWhitoutHobby = {
  nivel: 4,
  nome: "Mario Bispo Juniorrr",
  sexo: "Masculino",
  dataNascimento: "1993-12-17",
  idade: 26,
}

const allMocksGetAndPostAndPut = {
  fields: {
    bodySucess,
    bodyWithoutNivel,
    bodyWithoutNome,
    bodyWithoutSexo,
    bodyWithoutDataNascimento,
    bodyWhitoutIdade,
    bodyWhitoutHobby,
    bodyFail,
    responseBodySucess
  },
  allFiles,
}

export default allMocksGetAndPostAndPut;

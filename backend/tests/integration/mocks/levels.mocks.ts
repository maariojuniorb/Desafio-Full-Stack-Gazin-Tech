const allLevels = [
  {
    id: 1,
    nivel: "Jr A",
  },
  {
    id: 2,
    nivel: "Jr B",
  },
  {
    id: 3,
    nivel: "Pleno",
  },
  {
    id: 4,
    nivel: "Senior",
  }
];

const emptyParameter = ''

const mockLevelWhithoutId = {
  nivel: "Senior"
};

const id = {
  id: 2,
};

const nivelNumber = {
  nivel: 18,
};

const mockLevelWithId = {
  id: 2,
  nivel: "Senior"
};

const allMocksLevel = {
  id,
  mockLevelWithId,
  mockLevelWhithoutId,
  allLevels,
  nivelNumber,
  emptyParameter
};

export default allMocksLevel;

import * as express from 'express';
import LevelsController from '../Controllers/levelsController';
import Validation from '../Validation/Validations';

const levelRoutes = express.Router();

const levelsController = new LevelsController();
const validation = new Validation();

levelRoutes.get('/', levelsController.getLevels);

levelRoutes.post('/', validation.validateLevel, levelsController.registerLevel);

levelRoutes.put('/:id', validation.validateLevel, levelsController.editLevel);

levelRoutes.delete('/:id', levelsController.deleteLevel);

export default levelRoutes;

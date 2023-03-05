import * as express from 'express';
import LevelsController from '../Controllers/levelsController';
import ValidationLevelsService from '../Services/validationLevelsService';

const levelRoutes = express.Router();
const levelsController = LevelsController.getInstance();
const validationLevelsService = ValidationLevelsService.getInstance();

levelRoutes.get('/', levelsController.getAllLevels);

levelRoutes.get('/:id', levelsController.getLevelById);

levelRoutes.get('/search', levelsController.getLevelsByQuery);

levelRoutes.post('/', validationLevelsService.validateLevel, levelsController.registerLevel);

levelRoutes.put('/:id', validationLevelsService.validateLevel, levelsController.editLevel);

levelRoutes.delete('/:id', levelsController.deleteLevel);

export default levelRoutes;

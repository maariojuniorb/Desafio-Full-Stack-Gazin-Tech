import * as express from 'express';
import DeveloperController from '../Controllers/developersController';
import ValidationDeveloperService from '../Services/validationsDevelopersService';
import ValidationLevelService from '../Services/validationLevelsService';

const developersRoutes = express.Router();
const developerController = DeveloperController.getInstance();
const validationLevelsService = ValidationLevelService.getInstance();
const validationsDevelopersService = ValidationDeveloperService.getInstance();

developersRoutes.get('/', developerController.getDevelopers);

developersRoutes.get('/:id', developerController.getDevelopersById);

developersRoutes.get('/search', developerController.getDevelopersByQuery);

developersRoutes.post(
  '/',
  validationsDevelopersService.checkFieldsOfDevelopers,
  validationLevelsService.verifyIfNivelExist,
  developerController.registerDeveloper,
);

developersRoutes.put(
  '/:id',
  validationsDevelopersService.checkFieldsOfDevelopers,
  validationsDevelopersService.verifyIfIdExist,
  validationLevelsService.verifyIfNivelExist,
  developerController.editDeveloper,
);

developersRoutes.patch(
  '/:id',
  validationsDevelopersService.verifyIfIdExist,
  validationLevelsService.verifyIfNivelExist,
  developerController.editDeveloper,
);

developersRoutes.delete(
  '/:id',
  validationsDevelopersService.verifyIfIdExist,
  developerController.deleteDeveloper,
);

export default developersRoutes;

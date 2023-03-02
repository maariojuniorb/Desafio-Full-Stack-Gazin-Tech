import * as express from 'express';
import DeveloperController from '../Controllers/developersController';
import Validation from '../Validation/Validations';

const developersRoutes = express.Router();

const developerController = new DeveloperController();

const validation = new Validation();

developersRoutes.get('/', developerController.getDevelopers);

developersRoutes.post(
  '/',
  validation.checkFieldsOfDevelopers,
  validation.verifyIfNivelExist,
  developerController.registerDeveloper,
);

developersRoutes.put(
  '/:id',
  validation.checkFieldsOfDevelopers,
  validation.verifyIfIdExist,
  validation.verifyIfNivelExist,
  developerController.editDeveloper,
);

developersRoutes.patch(
  '/:id',
  validation.verifyIfIdExist,
  developerController.partialEditDeveloper,
);

developersRoutes.delete(
  '/:id',
  validation.verifyIfIdExist,
  developerController.deleteDeveloper,
);

export default developersRoutes;

import { Response, Request, NextFunction } from 'express';
import DevelopersService from './developersService';

export default class ValidationsDevelopersService {
  private static _instance: ValidationsDevelopersService;

  public static getInstance = () => {
    if (this._instance) return this._instance;
    this._instance = new ValidationsDevelopersService();
    return this._instance;
  };

  private _developerService = DevelopersService.getInstance();

  public verifyIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { id } = req.params;
    const result = await this._developerService.getDevelopersById(Number(id));
    if (!result) return res.status(400).json({ error: 'ID inexistente' });
    next();
  };

  public checkFieldsOfDevelopers = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void => {
    const requiredFields = ['hobby', 'idade', 'dataNascimento', 'sexo', 'nome', 'nivel'];

    let error = false;

    let fieldError;

    requiredFields.forEach((field) => {
      if (!req.body[field]) {
        error = true;
        fieldError = field;
      }
    });

    if (error) {
      return res.status(400)
        .json({ error: `O campo ${fieldError} é obrigatório` });
    }
    next();
  };
}

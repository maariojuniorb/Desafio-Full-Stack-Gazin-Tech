import { Response, Request, NextFunction } from 'express';
import DevelopersModel from '../database/Models/DevelopersModel';
import LevelService from '../Services/levelService';

export default class Validation {
  private _levelService = LevelService.getInstance;

  public verifyIfNivelExist = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { nivel } = req.body;
    const result = await this._levelService().getLevelById(Number(nivel));
    if (!result) return res.status(400).json({ error: 'Nível inválido' });
    next();
  };

  public verifyIfIdExist = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { id } = req.params;
    const result = await DevelopersModel.findByPk(Number(id));
    if (!result) return res.status(400).json({ error: 'ID inexistente' });
    next();
  };

  // eslint-disable-next-line max-lines-per-function
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

  public validateLevel = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void => {
    const { nivel } = req.body;
    const typeNivel = typeof nivel;
    if (!nivel || nivel === '') {
      return res.status(400).json({ message: 'O campo nível é obritaório' });
    }
    if (typeNivel !== 'string') {
      return res.status(400).json({ message: 'O campo nível deve ser uma string' });
    }
    next();
  };
}

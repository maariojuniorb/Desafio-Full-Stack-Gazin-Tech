import { Request, Response, NextFunction } from 'express';
import LevelService from './levelsService';

export default class ValidationLevelService {
  private static _instance: ValidationLevelService;

  public static getInstance = () => {
    if (this._instance) return this._instance;
    this._instance = new ValidationLevelService();
    return this._instance;
  };

  private _levelService = LevelService.getInstance();

  public verifyIfNivelExist = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    if (req.body.nivel === undefined) return next();
    const { nivel } = req.body;
    const result = await this._levelService.getLevelById(Number(nivel));
    if (!result) return res.status(400).json({ error: 'Nível inválido' });
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
      return res.status(400).json({ error: 'O campo nível é obritaório' });
    }
    if (typeNivel !== 'string') {
      return res.status(400).json({ error: 'O campo nível deve ser uma string' });
    }
    next();
  };
}

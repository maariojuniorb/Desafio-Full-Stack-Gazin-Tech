import { NextFunction, Request, Response } from 'express';
import LevelService from '../Services/levelService';

export default class DeveloperController {
  private levelService = LevelService.getInstance();

  public getLevels = async (_req: Request, res: Response): Promise< Response | void> => {
    const result = await this.levelService.getAll();
    return res.status(200).json(result);
  };

  public registerLevel = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { nivel } = req.body;
    try {
      await this.levelService.registerLevel(nivel);
      return res.status(201).json({ message: 'Nível cadastrado com sucesso' });
    } catch (error) {
      next(error);
    }
  };

  public editLevel = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { nivel } = req.body;
    const { id } = req.params;
    try {
      await this.levelService.editLevel(Number(id), nivel);
      return res.status(200).json({ message: 'Nível editado com sucesso' });
    } catch (error) {
      next(error);
    }
  };

  public deleteLevel = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      await this.levelService.deleteLevel(Number(id));
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  };
}

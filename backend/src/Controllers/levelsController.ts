import { NextFunction, Request, Response } from 'express';
import LevelService from '../Services/levelsService';

export default class LevelController {
  private static _instance: LevelController;

  public static getInstance = () => {
    if (this._instance) return this._instance;
    this._instance = new LevelController();
    return this._instance;
  };

  private levelService = LevelService.getInstance();

  public getAllLevels = async (_req: Request, res: Response): Promise<Response> => {
    const result = await this.levelService.getAll();
    return res.status(200).json(result);
  };

  public getLevelById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const result = await this.levelService.getLevelById(Number(id));
    return res.status(200).json(result);
  };

  public getLevelsByQuery = async (req: Request, res: Response): Promise<Response> => {
    const id = req.query.id as string;
    const nivel = req.query.nivel as string;
    const query = {
      id,
      nivel,
    };
    const result = await this.levelService.getLevelByQuery(query);
    if (result.length < 1) return res.status(404).json();
    return res.status(200).json(result);
  };

  public registerLevel = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { nivel } = req.body;
    try {
      const result = await this.levelService.registerLevel(nivel);
      return res.status(201).json(result);
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
      return res.status(200).json({ id: Number(id), nivel });
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

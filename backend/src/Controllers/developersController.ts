import { NextFunction, Request, Response } from 'express';
import DevelopersService from '../Services/developersService';

export default class DeveloperController {
  private static _instance: DeveloperController;

  public static getInstance = () => {
    if (this._instance) return this._instance;
    this._instance = new DeveloperController();
    return this._instance;
  };

  private developerService = DevelopersService.getInstance();

  public getDevelopers = async (_req: Request, res: Response): Promise< Response | void> => {
    const result = await this.developerService.getDevelopers();
    return res.status(200).json(result);
  };

  public getDevelopersById = async (req: Request, res: Response): Promise< Response | void> => {
    const { id } = req.params;
    const result = await this.developerService.getDevelopersById(Number(id));
    return res.status(200).json(result);
  };

  public getDevelopersByQuery = async (req: Request, res: Response): Promise<Response> => {
    const filter = {
      id: req.query.id as string,
      nivel: req.query.nivel as string,
      nome: req.query.nome as string,
      sexo: req.query.sexo as string,
      dataNascimento: req.query.dataNascimento as string,
      idade: req.query.idade as string,
      hobby: req.query.hobby as string,
    };
    const result = await this.developerService.getDevelopersByQuery(filter);
    if (result.length < 1) return res.status(404).json();
    return res.status(200).json(result);
  };

  public registerDeveloper = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { body } = req;
    try {
      const result = await this.developerService.registerDeveloper(body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  public editDeveloper = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { body } = req;
    const { id } = req.params;
    try {
      const result = await this.developerService.editDeveloper(Number(id), body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public deleteDeveloper = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      await this.developerService.deleteDeveloper(Number(id));
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  };
}

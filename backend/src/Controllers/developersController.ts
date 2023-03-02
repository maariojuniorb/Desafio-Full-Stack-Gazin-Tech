import { NextFunction, Request, Response } from 'express';
import DevelopersService from '../Services/developersService';

export default class DeveloperController {
  private developerService = DevelopersService.getInstance();

  public getDevelopers = async (_req: Request, res: Response): Promise< Response | void> => {
    const result = await this.developerService.getDevelopers();
    return res.status(200).json(result);
  };

  public registerDeveloper = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { body } = req;
    try {
      await this.developerService.registerDeveloper(body);
      return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
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
      await this.developerService.editDeveloper(Number(id), body);
      return res.status(200).json({ message: 'Usuário editado com sucesso' });
    } catch (error) {
      next(error);
    }
  };

  public partialEditDeveloper = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { body } = req;
    const { id } = req.params;
    try {
      await this.developerService.partialEditDeveloper(Number(id), body);
      return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
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

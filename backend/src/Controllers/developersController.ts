import { NextFunction, Request, Response } from 'express';
import Page from '../Domains/IPageable';
import DevelopersService from '../Services/developersService';

const errorMessage = 'erro ao completar a requisição, verifique os campos e tente novamente';

export default class DeveloperController {
  private static _instance: DeveloperController;

  public static getInstance = () => {
    if (this._instance) return this._instance;
    this._instance = new DeveloperController();
    return this._instance;
  };

  private developerService = DevelopersService.getInstance();

  public getAllDevelopers = async (req: Request, res: Response): Promise< Response | void> => {
    try {
      const paginaAtual = req.query.paginaAtual as string;
      const tamanhoPagina = req.query.tamanhoPagina as string;
      const page = new Page(Number(paginaAtual), Number(tamanhoPagina));
      const result = await this.developerService.getAllDevelopers(page);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400)
        .json({ error: errorMessage });
    }
  };

  public getDevelopersById = async (req: Request, res: Response): Promise< Response | void> => {
    try {
      const { id } = req.params;
      const result = await this.developerService.getDevelopersById(Number(id));
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400)
        .json({ error: errorMessage });
    }
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
    try {
      const result = await this.developerService.getDevelopersByQuery(filter);
      if (result.length < 1) return res.status(404).json();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400)
        .json({ error: 'erro ao completar a requisição, verifique os campos e tente novamente' });
    }
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

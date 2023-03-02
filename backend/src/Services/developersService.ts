import ErrorHandler from '../errors/errorHandler';
import DevelopersModel from '../database/Models/DevelopersModel';
import LevelsModel from '../database/Models/LevelsModels';
import Ideveloper from '../interfaces/IDeveloper';

export default class DevelopersService {
  private static _instance: DevelopersService;

  public static getInstance = () => {
    if (this._instance) return this._instance;
    this._instance = new DevelopersService();
    return this._instance;
  };

  public getDevelopers = async (): Promise<Ideveloper[] | void> => {
    const result = await DevelopersModel.findAll({ include: [
      {
        model: LevelsModel,
        as: 'developerLevel',
        attributes: ['nivel'],
      },
    ],
    });
    return result;
  };

  public registerDeveloper = async (developer: Ideveloper): Promise<void | Ideveloper> => {
    try {
      const { id } = await DevelopersModel.create(
        { ...developer },
      );
      return { id, ...developer };
    } catch (error) {
      throw new ErrorHandler('Não foi possível cadastrar o desenvolvedor', 400);
    }
  };

  public editDeveloper = async (id: number, developer: Ideveloper): Promise<void> => {
    try {
      await DevelopersModel.update(
        { ...developer },
        { where: { id } },
      );
    } catch (error) {
      throw new ErrorHandler('Não foi possível atualizar o usuário', 400);
    }
  };

  public partialEditDeveloper = async (id: number, developer: Ideveloper): Promise<void> => {
    try {
      await DevelopersModel.update(
        { ...developer },
        { where: { id } },
      );
    } catch (error) {
      throw new ErrorHandler('Não foi possível atualizar o usuário', 400);
    }
  };

  public deleteDeveloper = async (id: number): Promise<void> => {
    await DevelopersModel.destroy(
      { where: { id } },
    );
  };
}

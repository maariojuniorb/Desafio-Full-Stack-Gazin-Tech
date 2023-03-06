import ErrorHandler from '../Config/errors/errorHandler';
import DevelopersModel from '../Config/database/Models/DevelopersModel';
import LevelsModel from '../Config/database/Models/LevelsModels';
import IdeveloperFilter from '../Domains/IDeveloperFilter';
import UtilsService from './utilsService';
import Ideveloper from '../Domains/IDeveloper';
import IPageable from '../Domains/IPageable';

export default class DevelopersService {
  private static _instance: DevelopersService;

  public static getInstance = () => {
    if (this._instance) return this._instance;
    this._instance = new DevelopersService();
    return this._instance;
  };

  public getAllDevelopers = async (page: IPageable): Promise<Ideveloper[] | void> => {
    const result = await DevelopersModel.findAll({ include: [
      {
        model: LevelsModel,
        as: 'developerLevel',
        attributes: ['nivel'],
      },
    ],
    offset: page.getOffset(),
    limit: page.getLimit(),
    });
    return result;
  };

  public getDevelopersById = async (id: number): Promise<Ideveloper | null> => {
    const result = await DevelopersModel.findByPk(id);
    return result;
  };

  public getDevelopersByQuery = async (query: IdeveloperFilter): Promise<Ideveloper[]> => {
    const filter = UtilsService.stripUndefined(query);
    const result = await DevelopersModel.findAll({
      where: { ...filter },
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

  public editDeveloper = async (id: number, developer: Ideveloper): Promise<Ideveloper | void> => {
    const filter = UtilsService.stripUndefined(developer);
    try {
      await DevelopersModel.update(
        { ...filter },
        { where: { id } },
      );
      const result = await this.getDevelopersById(id);
      if (result) return result;
    } catch (error) {
      throw new ErrorHandler('Não foi possível atualizar o desenvolvedor', 400);
    }
  };

  public deleteDeveloper = async (id: number): Promise<void> => {
    try {
      await DevelopersModel.destroy(
        { where: { id } },
      );
    } catch (error) {
      throw new ErrorHandler('Não foi possível deletar o desenvoledor', 400);
    }
  };
}

import ErrorHandler from '../Config/errors/errorHandler';
import LevelsModel from '../Config/database/Models/LevelsModels';
import IlevelFilter from '../Domains/ILevelFilter';
import DevelopersModel from '../Config/database/Models/DevelopersModel';
import UtilsService from './utilsService';
import Ilevel from '../Domains/ILevel';

export default class LevelService {
  private static _instance: LevelService;

  public static getInstance = () => {
    if (this._instance) return this._instance;
    this._instance = new LevelService();
    return this._instance;
  };

  public getAll = async (): Promise<Ilevel[]> => {
    const result = await LevelsModel.findAll({ include: [
      {
        model: DevelopersModel,
        as: 'associateDevelopers',
      },
    ],
    });

    return result;
  };

  public getLevelByQuery = async (query: IlevelFilter): Promise<Ilevel[]> => {
    const filter = UtilsService.stripUndefined(query);
    const result = await LevelsModel.findAll({
      where: { ...filter },
    });
    return result;
  };

  public getLevelById = async (id: number): Promise<Ilevel | undefined> => {
    const result = await LevelsModel.findByPk(id);
    if (!result) return undefined;
    return result;
  };

  public registerLevel = async (nivel: string): Promise<void | Ilevel> => {
    try {
      const { id } = await LevelsModel.create(
        { nivel },
      );
      return { id, nivel };
    } catch (error) {
      throw new ErrorHandler('Não foi possível cadastrar o nível', 400);
    }
  };

  public checkLevelId = async (id: number): Promise<void> => {
    const nivelId = await LevelsModel.findByPk(id);
    if (!nivelId) throw new ErrorHandler('ID inexistente', 400);
  };

  public editLevel = async (id: number, nivel: Ilevel): Promise<void> => {
    await this.checkLevelId(id);
    try {
      await LevelsModel.update(
        { nivel },
        { where: { id } },
      );
    } catch (error) {
      throw new ErrorHandler('Não foi possível atualizar o nível', 400);
    }
  };

  public checkDeveloperAssociation = async (nivel: number): Promise<void> => {
    const developers = await DevelopersModel.findAll(
      { where: { nivel } },
    );
    if (developers.length !== 0) {
      throw new ErrorHandler('O nivel está associado a um desenvolvedor', 501);
    }
  };

  public deleteLevel = async (id: number): Promise<void> => {
    await this.checkLevelId(id);
    await this.checkDeveloperAssociation(id);
    try {
      await LevelsModel.destroy(
        { where: { id } },
      );
    } catch (error) {
      throw new ErrorHandler('Não foi possível deletar o nível', 400);
    }
  };
}

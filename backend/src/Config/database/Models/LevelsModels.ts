import { DataTypes, Model } from 'sequelize';
import DevelopersModel from './DevelopersModel';
import db from '.';

class Levels extends Model {
  declare id: number;
  declare nivel: string;
}

Levels.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nivel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'levels',
  modelName: 'Levels',
  timestamps: false,
});

Levels.hasMany(DevelopersModel, { foreignKey: 'nivel', as: 'associateDevelopers' });

DevelopersModel.belongsTo(Levels, { foreignKey: 'nivel', as: 'developerLevel' });

export default Levels;

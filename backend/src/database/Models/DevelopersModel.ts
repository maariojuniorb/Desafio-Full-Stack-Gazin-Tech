import { DataTypes, Model } from 'sequelize';
import db from '.';

class Developers extends Model {
  declare id: number;
  declare nivel: number;
  declare nome: string;
  declare sexo: string;
  declare dataNascimento: Date;
  declare idade: number;
  declare hobby: string;
}

Developers.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hobby: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  tableName: 'developers',
  modelName: 'Developers',
  timestamps: false,
});

export default Developers;

import { DataTypes, Model } from 'sequelize';
import sequelize from "../main/sequelize/sequelize";  

class Product extends Model {
  public id!: number;
  public name!: string;
  public details!: object; 
  public select!: boolean; 
  public order!: boolean; 
  public createdAt!: Date;
  public updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.JSONB,  
      allowNull: true,
      defaultValue: {},
    },
    select: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    order: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,  
  }
);

export default Product;

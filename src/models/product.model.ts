import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../main/sequelize/sequelize';

const Product = sequelize.define(
  'Product',
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
    },
    select: {
      type: DataTypes.BOOLEAN,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },

  },
  {
    tableName: 'products', 
    timestamps: true, 
  }
);


sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('Database synchronized!');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });


export default Product;

// import { DataTypes, Model, Sequelize } from 'sequelize';
// import sequelize from '../main/sequelize/sequelize';

// class Product extends Model {
//   public id!: number;
//   public name!: string;
//   public details!: object;
//   public select!: boolean;
//   public order!: number;
//   public createdAt!: Date;
//   public updatedAt!: Date;
// }

// Product.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     details: {
//       type: DataTypes.JSONB,
//     },
//     select: {
//       type: DataTypes.BOOLEAN,
//     },
//     order: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//   },
//   {
//     sequelize, // ارتباط به sequelize
//     modelName: 'Product',
//     tableName: 'products',
//     timestamps: true,
//   }
// );

// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log('Database synchronized!');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing database:', error);
//   });

// export default Product;

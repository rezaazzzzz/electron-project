import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('electron', 'postgres', '123456789', {
  host: 'localhost', 
  dialect: 'postgres',
  port:5432,
  logging: console.log, 
  define: {
    timestamps: true, 
  },
});

export default sequelize;

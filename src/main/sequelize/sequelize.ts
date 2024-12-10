import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', 
  logging: false, 
});

sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database synchronized!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

export default sequelize;

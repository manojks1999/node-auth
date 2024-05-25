import config from "../config/dbConfig.js"
import Sequelize from "sequelize"
import createUserModel from "./user.js";
import createRoleModel from "./role.js";
import { role_migration } from './migration.js'
console.log(config)
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    port: config.port,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    dialectOptions: {
        ssl: {
          require: true, // This will help you. But you will see nwe error
          rejectUnauthorized: false // This line will fix new error
        }
      },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = createUserModel(sequelize, Sequelize);
db.role = createRoleModel(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

db.ROLES = ["user", "admin", "moderator"];

// sequelize.sync({ force: true }) // Use { force: true } to drop existing tables (if any) and recreate them
//   .then(() => {
//     console.log("Tables created successfully.");
//     role_migration();
//   })
//   .then(() => {
//     console.log("Tables synced successfully.");
//   })
//   .catch(err => {
//     console.error("Error syncing tables:", err);
//   });


export default db;
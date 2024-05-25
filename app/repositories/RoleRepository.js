import db from '../models/index.js';
const Role = db.role;
const Op = db.Sequelize.Op;

class RoleRepository {
    createUser( role ) {
        return Role.create( role );
    }

  findRolesByName(names) {
    return Role.findAll({
      where: {
        name: {
          [Op.or]: names
        }
      }
    });
  }
}

export default new RoleRepository();

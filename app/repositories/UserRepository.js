import db from '../models/index.js';
const User = db.user;

class UserRepository {
  createUser(user) {
    return User.create(user);
  }

  findUserByUsername(username) {
    return User.findOne({
      where: { username }
    });
  }
  
  findById(userId) {
    return User.findByPk(userId);
  }
}

export default new UserRepository();

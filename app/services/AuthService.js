import UserRepository from '../repositories/UserRepository.js';
import RoleRepository from '../repositories/RoleRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../config/authConfig.js';

const config = authConfig;

class AuthService {
  async signup({ username, email, password, roles }) {
    const user = await UserRepository.createUser({
      username,
      email,
      password: bcrypt.hashSync(password, 8)
    });

    if (roles) {
      const roleInstances = await RoleRepository.findRolesByName(roles);
      console.log(roleInstances);
      await user.setRoles(roleInstances);
    } else {
      await user.setRoles([1]);
    }

    return 'User registered successfully!';
  }

  async signin({ username, password }) {
    const user = await UserRepository.findUserByUsername(username);

    if (!user) {
      throw new Error('User Not found.');
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      throw new Error('Invalid Password!');
    }

    const token = jwt.sign(
      { id: user.id },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400 // 24 hours
      }
    );

    const roles = await user.getRoles();
    const authorities = roles.map(role => "ROLE_" + role.name.toUpperCase());

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    };
  }

  verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          reject("Unauthorized!");
        } else {
          resolve(decoded.id);
        }
      });
    });
  }

  async isAdmin(userId) {
    const user = await UserRepository.findById(userId);
    const roles = await user.getRoles();
    return roles.some(role => role.name === "admin");
  }

  async isUser(userId) {
    const user = await UserRepository.findById(userId);
    const roles = await user.getRoles();
    return roles.some(role => role.name === "user");
  }

  async isModerator(userId) {
    const user = await UserRepository.findById(userId);
    console.log(user);
    const roles = await user.getRoles();
    console.log(roles);
    return roles.some(role => role.name === "moderator");
  }

  async isModeratorOrAdmin(userId) {
    const user = await UserRepository.findById(userId);
    const roles = await user.getRoles();
    return roles.some(role => role.name === "moderator" || role.name === "admin");
  }

}

export default new AuthService();

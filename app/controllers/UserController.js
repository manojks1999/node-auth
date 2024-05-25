import UserService from '../services/UserService.js';

class UserController {
  allAccess(req, res) {
    const content = UserService.getAllAccessContent();
    res.status(200).send(content);
  }

  userBoard(req, res) {
    const content = UserService.getUserBoardContent();
    res.status(200).send(content);
  }

  adminBoard(req, res) {
    const content = UserService.getAdminBoardContent();
    res.status(200).send(content);
  }

  moderatorBoard(req, res) {
    const content = UserService.getModeratorBoardContent();
    res.status(200).send(content);
  }
}

export default new UserController();

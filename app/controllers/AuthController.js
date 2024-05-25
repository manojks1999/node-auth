import AuthService from '../services/AuthService.js';

class AuthController {
  async signup(req, res) {
    try {
      const message = await AuthService.signup(req.body);
      res.send({ message });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  }

  async signin(req, res) {
    try {
      const data = await AuthService.signin(req.body);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }

  allAccess(req, res) {
    res.status(200).send("Public Content.");
  }

  userBoard(req, res) {
    res.status(200).send("User Content.");
  }

  adminBoard(req, res) {
    res.status(200).send("Admin Content.");
  }

  moderatorBoard(req, res) {
    res.status(200).send("Moderator Content.");
  }
}

export default new AuthController();

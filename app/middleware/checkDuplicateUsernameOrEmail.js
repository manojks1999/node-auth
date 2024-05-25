import db from "../models/index.js";
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const existingUsername = await User.findOne({
      where: { username: req.body.username }
    });
    const existingEmail = await User.findOne({
      where: { email: req.body.email }
    });
  
    if (existingUsername) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }
  
    if (existingEmail) {
      return res.status(400).send({ message: "Failed! Email is already in use!" });
    }
  
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

export default checkDuplicateUsernameOrEmail;

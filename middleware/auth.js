const jwt = require("jsonwebtoken");
const Staff = require("../Models/user.model");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT);
    console.log(data._id, token);
    const staff = await Staff.findOne({ _id: data._id });
    console.log(staff);
    if (!staff) {
      throw new Error();
    }
    req.staff = staff;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};

module.exports = auth;

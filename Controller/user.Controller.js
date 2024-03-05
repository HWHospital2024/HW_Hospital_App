const Staff = require("../Models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    //const token = await staff.generateAuthToken();
    //console.log("User Created3");
    res.status(201).send({ staff, message: 'Registration successful' });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const staff = await Staff.findOne({ username });
    if (!staff) {
      return res
        .status(400)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const isPasswordMatch = await bcrypt.compare(password, staff.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = jwt.sign({ _id: staff._id }, process.env.JWT);
    res.send({ staff, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getStaff = async (req, res) => {
  try{
    const currentUser = req.staff;
  if (currentUser) {
    res.send(currentUser);
  } else {
    // If user information is not available, return an appropriate response
    res.status(404).send({ error: "User not found" });
  }
} catch (error) {
  res.status(500).send({ error: "Internal server error" });
}};


exports.logout = async (req, res) => {
  console.log("Logout1");
  try {
    req.staff.tokens = req.staff.tokens.filter((token) => {
      return token.token != req.token;
    });
    console.log("Logout2");
    await req.staff.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

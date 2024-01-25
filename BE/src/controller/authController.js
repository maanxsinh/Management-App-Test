const authServices = require("../services/authServices");

// Login
const login = async (req, res) => {
  try {
    let userName = req.body.userName;
    let password = req.body.password;
    if (!userName || !password) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing username or password",
      });
    }
    let data = await authServices.login(userName, password);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: data,
    });
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Login unsuccessfull",
    });
  }
};

// Signup

const signup = async (req, res) => {
  try {
    let userName = req.body.userName;
    let password = req.body.password;
    if (!userName || !password) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "missing username or password",
      });
    }
    let data = await authServices.signup(userName, password);
    if (data.errCode === 1) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "user is exist",
      });
    } else {
      return res.status(200).json({
        errCode: 0,
        errMessage: "signup success",
      });
    }
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "sign up failed",
    });
  }
};

module.exports = {
  login: login,
  signup: signup,
};

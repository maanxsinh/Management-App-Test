const db = require("../models/index.js");

// Login

const login = (userName, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let err = {};
      let isExist = await isUserNameExist(userName);
      if (isExist) {
        // nguoi dung ton tai
        let user = await db.User.findOne({
          where: { userName: userName },
        });
        if (password === user.password) {
          resolve(user);
        } else {
          err.errCode = 1;
          err.errMessage = "wrong password";
          resolve(err);
        }
      } else {
        // nguoi dung khong ton tai
        err.errCode = 1;
        err.errMessage = "user is not exist";
        resolve(err);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const isUserNameExist = (userName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.User.findOne({
        where: { userName: userName },
      });
      if (res) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Signup

const signup = (userName, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let err = {};
      let userInf = { userName: userName, password: password, role: "user" };
      let isExist = await isUserNameExist(userName);
      if (isExist) {
        err.errCode = 1;
        err.errMessage = "this userName is used";
        resolve(err);
      } else {
        let user = await db.User.create(userInf);
        err.errCode = 0;
        err.errMessage = "sign up success";
        err.data = user;
        resolve(err);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  login: login,
  signup: signup,
};

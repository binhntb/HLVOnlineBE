import asyncHandler from 'express-async-handler';
import { User } from '../models/user.js';
import { UserToken } from '../models/usertoken.js';

import bcrypt from 'bcrypt';
// import { Salt } from '../variables/auth.js';
import { config } from '../variables/auth.config.js';
import jwt from "jsonwebtoken";

// import UserToken from "../models/usertoken.js";
// jwtVariable = require('../../variables/jwt');



const registerUser = asyncHandler(async (req, res) => {

  const { userName, password, email, phone } = req.body;
  //Confirm data 
  if (!userName && !password && !email && !phone) {
    return res.json({ message: 'All fields are required' });
  }
  let sPassword = password.toString();
  const hashPassword = bcrypt.hashSync(sPassword, 10);
  // create the user object
  const newUser = new User(null, userName, hashPassword, email, phone);
  User.findOne({
    where: {
      userName: req.body.userName
    }
  }).then(user => {
    console.log(user)
    if (user) {
      return res.json({ message: 1 })
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      console.log(user)
      if (user) {
        return res.json({ message: 2 })
      }

    });
  });

})

const loginUser = asyncHandler(async (req, res) => {

  //Confirm data 
  User.findOne({
    where: {
      username: req.body.userName
    }
  })
    .then(user => {
      if (!user) {
        return res.status(401).send({ message: "WrongUser" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "WrongPass"
        });
      }
      try {
        const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: config.tokenLife })
        const refreshToken = jwt.sign(user.toJSON(), config.refreshTokenSecret, { expiresIn: config.refreshTokenLife })
        let expiredAt = new Date();

        expiredAt.setSeconds(expiredAt.getSeconds() + config.refreshTokenLife);
        UserToken.create({
          userId: user.id,
          token: refreshToken,
          expirationDate:expiredAt
        });
        // tokenList[refreshToken] = response
        res.status(200).send({
          id: user.id,
          username: user.userName,
          email: user.email,
          phone: user.phone,
          accessToken: token,
          refreshToken: refreshToken,
        });
      } catch (error) {
        res.status(500).send({ message: err.message });

      }

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });

})

const refreshToken = asyncHandler(async (req, res) => {

  const postData = req.body
  // if refresh token exists
  if ((postData.refreshToken) && (postData.refreshToken in tokenList)) {
    const user = {
      "email": postData.email,
      "name": postData.name
    }
    const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife })
    const response = {
      "token": token,
    }
    // update the token in the list
    tokenList[postData.refreshToken].token = token
    res.status(200).json(response);
  } else {
    res.status(404).send('Invalid request')
  }

})

// const generateTokens = async (user) => {
//     try {
//         const payload = { _id: user._id};
//         const accessToken = jwt.sign(
//             payload,
//             process.env.ACCESS_TOKEN_PRIVATE_KEY,
//             { expiresIn: "14m" }
//         );
//         const refreshToken = jwt.sign(
//             payload,
//             process.env.REFRESH_TOKEN_PRIVATE_KEY,
//             { expiresIn: "30d" }
//         );

//         const userToken = await UserToken.findOne({ userId: user._id });
//         if (userToken) await userToken.remove();

//         await new UserToken({ userId: user._id, token: refreshToken }).save();
//         return Promise.resolve({ accessToken, refreshToken });
//     } catch (err) {
//         return Promise.reject(err);
//     }
// };

// const verifyRefreshToken = (refreshToken) => {
//     const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

//     return new Promise((resolve, reject) => {
//         UserToken.findOne({ token: refreshToken }, (err, doc) => {
//             if (!doc)
//                 return reject({ error: true, message: "Invalid refresh token" });

//             jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
//                 if (err)
//                     return reject({ error: true, message: "Invalid refresh token" });
//                 resolve({
//                     tokenDetails,
//                     error: false,
//                     message: "Valid refresh token",
//                 });
//             });
//         });
//     });
// };

export {
  registerUser, loginUser, refreshToken
}
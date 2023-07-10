const express = require("express");
const userRouter = express.Router();
const UserSchema = require("../models/User");

userRouter.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  if (!username || !password || !email) {
    return res.status(400).json({
      error: true,
      message: "Missing username, email or password",
      isAuthenticated: false,
    });
  } else {
    UserSchema.findOne({ email })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(400).json({
            error: true,
            message: "User already exists",
            isAuthenticated: false,
          });
        } else {
          const newUser = new UserSchema({
            username,
            email,
            password,
          });
          newUser
            .save()
            .then((savedUser) => {
              if (savedUser) {
                return res.status(200).json({
                  error: false,
                  message: "Welcome to Thoughts App, user created",
                  isAuthenticated: true,
                  savedUser,
                });
              } else {
                return res.status(400).json({
                  error: true,
                  message: "Couldnt create user",
                  isAuthenticated: false,
                });
              }
            })
            .catch((err) => {
              return res.status(500).json({
                error: true,
                message: "Internal Server Error",
                isAuthenticated: false,
              });
            });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: true,
          message: "Internal Server Error",
          isAuthenticated: false,
        });
      });
  }
});

userRouter.post("/signin", (req, res) => {
  const { email, password } = req.body;
  //   console.log(req.body);

  UserSchema.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          return res.status(200).json({
            error: false,
            message: "User Authenticated",
            isAuthenticated: true,
            user,
          });
        } else {
          return res.status(400).json({
            error: true,
            message: "Incorrect Password",
            isAuthenticated: false,
          });
        }
      } else {
        return res.status(400).json({
          error: true,
          message: "User Doesn't Exist",
          isAuthenticated: false,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
        isAuthenticated: false,
      });
    });
});

userRouter.get("/getAllUsers", (req, res) => {
  UserSchema.find()
    .then((users) => {
      if (users) {
        return res.status(200).json({
          error: false,
          message: `Found ${users.length} users`,
          userCount: users.length,
          users,
        });
      } else {
        return res.status(404).json({
          error: true,
          message: "Users not found",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
      });
    });
});

userRouter.delete("/delete/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  UserSchema.findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ error: true, message: "User not found" });
      }
      res.json({ error: false, message: "User deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: true, message: "Failed to delete user" });
    });
});
module.exports = userRouter;

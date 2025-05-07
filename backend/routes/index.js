var express = require("express");
var router = express.Router();
const userModel = require("../models/userModel");
const projectModel = require("../models/projectModel");
const bcrypt = require("bcrypt");
const secret = "secret";
const jwt = require("jsonwebtoken");
router.post("/signup", async (req, res) => {
  const { username, name, email, password } = req.body;
  let emailCon = await userModel.findOne({
    email: email,
  });
  if (emailCon) {
    return res.json({
      success: false,
      message: "Email already exists",
    });
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const user = await userModel.create({
          username: username,
          name: name,
          email: email,
          password: hash,
        });
      });
    });

    return res.json({
      success: true,
      message: "User created successfully",
    });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email: email });

  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ email: user.email, userId: user._id }, secret);
        return res.json({
          success: true,
          message: "Login successful",
          token: token,
          userId: user._id,
        });
      } else {
        return res.json({
          success: false,
          message: "Invalid credentials",
        });
      }
    });
  } else {
    return res.json({
      success: false,
      message: "User not found",
    });
  }
});
router.post("/getUserDetails", async (req, res) => {
  const { userId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    return res.json({
      success: true,
      message: "User deatils fetched successfully",
      user: user,
    });
  } else {
    return res.json({
      success: false,
      message: "User not found",
    });
  }
});
router.post("/createProject", async (req, res) => {
  const { userId, title } = req.body;
  const user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.create({
      title: title,
      createdBy: userId,
    });

    return res.json({
      success: true,
      message: "Project created successfully",
      projectId: project._id,
    });
  } else {
    return res.json({
      success: false,
      message: "User not found",
    });
  }
});
router.post("/getProjects", async (req, res) => {
  const { userId } = req.body;
  const user = await userModel.findOne({
    _id: userId,
  });
  if (user) {
    let projects = await projectModel.find({ createdBy: userId });
    return res.json({
      success: true,
      message: "Projects fetched successfully",
      projects: projects,
    });
  } else {
    return res.json({
      success: false,
      message: "User not found",
    });
  }
});
router.post("/deleteProject", async (req, res) => {
  let { userId, progId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOneAndDelete({ _id: progId });
    return res.json({ success: true, message: "Project deleted successfully" });
  } else {
    return res.json({ success: false, message: "User not found!" });
  }
});
router.post("/getProject", async (req, res) => {
  const { userId, progId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOne({ _id: progId });
    if (project) {
      return res.json({
        success: true,
        message: "Project fetched successfully",
        project: project,
      });
    } else {
      return res.json({
        success: false,
        message: "Project not found",
      });
    }
  }
});
router.post("/updateProject", async (req, res) => {
  const { userId, projId, htmlCode, cssCode, jsCode } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOneAndUpdate(
      {
        _id: projId,
      },
      {
        htmlCode: htmlCode,
        cssCode: cssCode,
        jsCode: jsCode,
      }
    );
    return res.json({
      success: true,
      message: "Project updated successfully",
      project: project,
    });
  }
  else
  {
    return res.json({
      success: false,
      message: "User not found",
    });
  }
});
module.exports = router;

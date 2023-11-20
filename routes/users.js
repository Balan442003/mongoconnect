var express = require("express");
var router = express.Router();
const User = require("../model/userModel");
const bcrypt = require('bcrypt')
const userController = require ('../controller/userController')
// const jwt = require("jsonwebtoken");

router.get("/", userController.get);
router.post("/", userController.post);
router.get("/fetchuser/:id", userController.fetchUser);
router.delete("/deleteuser/:id", userController.deleteUser);
router.put("/updateuser/:id", userController.updatedUser);
router.get('/singlefetchuser', userController.singlefetchuser);



// router.get("/fetchuser", function (req, res, next) {
//   try {
//     // const ID = req.params.id;
//     User.find({})
//       .then((data) => res.json({ data }))
//       .catch((err) => res.json(err));
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.get("/fetchuser/:id", function (req, res, next) {
//   try {
//     const ID = req.params.id;
//     // const user = User.findOne({ _id: ID })
//     User.findOne({ _id: ID })
//       .then((data) => res.json({ data }))
//       .catch((err) => res.json(err));
//     // console.log(user.namedemail);
//   } catch (error) {
//     console.log(error);
//   }
// });

  // const token = req.headers.authorization;

  // if (!token || !token.startsWith("Bearer ")) {
  //   return res.status(401).json({ message: "token unavaible" });
  // }
  // const tokenVal = token.split(" ")[1];
  // console.log(tokenVal);

  // try {
  //   const decoded = jwt.verify(tokenVal, "xfgfghfhdsffjhj");
  //   console.log(decoded);
  //   const userID = decoded._id;

  //   User.findOne({ _id: userID })
  //     .then((data) => {
  //       if (!data) {
  //         return res.status(404).json({ message: "not found" });
  //       }
  //       res.status(200).json({ data });
  //     })
  //     .catch((err) => res.json(err));
  // } catch (err) {
  //   res.status(401).json({ msg: " invalid token" });
  // }


// router.put("/updateuser/:id", async (req, res) => {

//   try {
//     const { firstName, email, _id } = req.body;
//     const res = await User.findByIdAndUpdate({ _id: _id }, {
//       firstName: firstName,
//       email: email,
//     })
//   } catch (error) {
//     res
//       .status(400)
//       .json({ message: "request Failed", error: error.message });
//   }
// });






module.exports = router;

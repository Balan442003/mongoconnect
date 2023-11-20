const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT library

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Login failed, user not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Login failed, incorrect password" });
    }

    // If email and password are valid, create and send a JSON Web Token (JWT)
    const token = jwt.sign({ _id: user._id }, 'xfgfghfhdsffjhj', { expiresIn: "1hr" });

    res.status(200).json({ token , user });
  } catch (error) {
    console.error("Login failed", error);
    res.status(500).json({ message: "Server error" });
  }
});

// router.post("/", async (req, res) => {
//   // console.log(req.body);
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ $and: [{ email: email }, { password: password }] })
//     if (!user) {
//       res
//         .status(400)
//         .json({ message: "Login failed", error: error.message })
//     } else {
//       // res.json({user});
//       res.status(201).json({ user, message: "login Success" });
//     }

//   } catch (error) {
//     res
//       .status(400)
//       .json({ message: "Login failed", error: error.message });
//   }
// });

module.exports = router;




// router.post("/", async (req, res) => {
//   // console.log(req.body);
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email: email })
//     const passwordcheck = await bcrypt.compare(password, user.password)
//     if (!user) {
//       res
//         .status(400)
//         .json({ message: "Login failed", error: error.message })
//     } else if (!passwordcheck) {
//       res
//         .status(400)
//         .json({ message: "Login failed", error: error.message })
//     }
//     else {
//       // res.json({user});

//       const token = jwt.sign({ _id: user._id }, 'gokujan', { expiresIn: "1hr" }); // Change 'your-secret-key'

//       res.status(200).json({ token });
//     }

//   } catch (error) {
//     res
//       .status(400)
//       .json({ message: "Login failed", error: error.message });
//   }
// });




// router.post("/", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).send("Invalid email or password");
//     }

//     const token = jwt.sign({ _id: user._id }, 'gokujan', { expiresIn: "1hr" }); // Change 'your-secret-key'

//     res.status(200).json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Login failed");
//   }
// });



// module.exports = router
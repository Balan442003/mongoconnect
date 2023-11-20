var express = require('express')
var jwt = require("jsonwebtoken")
exports.get = async (req, res, next) => {
    try {
        res.json({ content: "<p>Testing Ck Html Content from CKEditor</p>" });
    } catch (error) {
        console.log(error);
    }
}

exports.post = async (req, res, next) => {
    try {
        console.log(req.body);
        res.json(req.body);
    } catch (error) {
        res
            .status(400)
            .json({ message: "Something Went Wrong", error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        console.log(req.body);
        const { username, password } = req.body;
        const secretKey = "sdfsdfsdfsdf";

        if (username === "admin" && password === "123") {
            const adminToken = jwt.sign({ role: "admin" }, secretKey, {
                expiresIn: "1hr",
            });
            return res.status(201).json({
                token: adminToken,
                message: "Admin login success",
            });
        } else {
            res.json({ message: "email or password is Invalid!" });
        }
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong!",
            error: error.message,
        });
    }
} 
const bcrypt = require('bcrypt'); //for password encryption
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const nodemailer = require('nodemailer');

const forget = async (req, res) => { //req and res should be in order
    try {
        const { password, email } = req.body;
        const pass = await bcrypt.hash(password, 10);
        await UserModel.findOneAndUpdate({ email: email }, { password: pass }).then(() => {
            console.log('Password Updated')
            res.status(200).json({
                message: "Your password has been reset. Please login",
                success: true
            })
        }
        )
            .catch((err) => {
                console.log(err)
                res.status(500).json({
                    message: "Internal Server Error",
                    success: false
                })
            });

    }

    catch {
        res.status(500)
            .json({
                message: "Internal Server Error",
                success: false
            })

    }
}

const sendEmail = async (req, res) => { //req and res should be in order
    try {
        const { email } = req.body;
         const user = await UserModel.findOne({ email });
         if (!user) {
             return res.status(409)
                 .json({
                     message: "User Not exist",
                     success: false
                 })
         }

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rocksposiden@gmail.com',
                pass: process.env.PASS
            }
        });
        var otp = Math.floor(100000 + Math.random()*900000);
        var msg = "OTP to reset your password is"+otp.toString() ;
        console.log("Email", msg, email);

        var mailOptions = {
            from: 'rocksposiden@gmail.com',
            to: email,
            subject: 'Password reset code',
            text: msg
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status (500)
                    .json ({
                        message: "Internal server error",
                        success: false
                    })
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200) .json({
                    message: "Email sent",
                    otp: otp,
                    success: true
                })
            }
        });
    }
    catch {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

const signup = async (req, res) => { //remember req comes first and then comes res
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({
                    message: "User already exist",
                    success: false
                })
        }

        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);  // password encyption <-- .hash wil do this , here 10 will be the encyption level

        console.log('Sign up data', userModel);
        await userModel.save(); // this will save the data in the mongodb and here await will hold the process until the saving is done and then allow to move to next part
        res.status(201) //201: data created
            .json({
                message: "Signup successuflly",
                success: true
            })
    }
    catch {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        console.log("User", user);
        if (!user) {
            return res.status(404)
                .json({
                    message: "User not found! Please sign up",
                    success: false
                })
        }

        const pass = await bcrypt.compare(password, user.password); //compare thes typed password(password) and the stored password(user.password) and gives the result in true or false
        console.log("Password", pass);
        if (!pass) {
            return res.status(403)
                .json({
                    message: "Invalid password",
                    success: false
                })
        }

        const token = jwt.sign({ email: email, name: user.name }, process.env.JWT_KEY, { expiresIn: "24h" })

        res.status(200)
            .json({
                message: "login successuflly",
                success: true,
                name: user.name,
                email: email,
                token: token
            })
    }
    catch {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

module.exports = {
    signup, login, forget, sendEmail
}


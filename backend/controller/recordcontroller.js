const ExpenseModel = require('../models/Expenses');
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');

const find = async(req, res) => {
    try {
    const email = req.query.email;
    const data = await ExpenseModel.find({email:email})
    console.log("data",data);
    const count = data.length;
    console.log("data",count);

    res.status(200).json({
        expenses:data,
        count:count,
        success: true
    });
    }
    catch(err) {
        console.log("Add1 ",err);
        res.status(500)
            .json({
                message: "Internal Server Error",
                success: false
            })

    }
   
}

const insert = async(req, res) => {
    try {
        const { title,amount,type,date,email } = req.body;
       console.log("Add ",title,amount,type,date,email);
        const expenseModel = new ExpenseModel({ title,amount,type,date,email });
       

        await expenseModel.save();
        res.status(201)
            .json({
                message: "Expense Saved successfully",
                success: true
            })
    }
    catch(err) {
        console.log("Add1 ",err);
        res.status(500)
            .json({
                message: "Internal Server Error",
                success: false
            })

    }
}
const del = async(req, res) => {
    try{
        const id = req.query.id;
        console.log("ID ",id);
        ExpenseModel.findByIdAndDelete(id).then(()=>{
            res.status(200).json({
                message:"Record Deleted",
                success:true
            })
        }).catch(()=>{
            res.status(500)
            .json({
                message: "Internal Server Error",
                success: false
            })
        })
    }
    catch(err) {
        console.log("Add1 ",err);
        res.status(500)
            .json({
                message: "Internal Server Error",
                success: false
            })

    }
    
}

const modify = async(req, res) => {
    try {
        const { title,amount,type,date,email } = req.body;
        const id = req.query.id;
        await ExpenseModel.findByIdAndUpdate(id,{ title:title,amount:amount,type:type,date:date }).then(() => {
            console.log('Expense Updated')
            res.status(200).json({
                message: "Your Expense has been updated",
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

const reset = async(req, res) => {
    console.log("User1 ");
    try {
        const { oldpassword,password,email } = req.body;
        const pass = await bcrypt.hash(password, 10);

        const user = await UserModel.findOne({ email });
        console.log("User ", user);

        const oldpass = await bcrypt.compare(oldpassword, user.password);
        console.log("psw ", oldpass);
        if (oldpass == false) {
            return res.status(403)
                .json({
                    message: 'Please enter a valid old password',
                    success: false
                });

        }

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

module.exports = {
    find, insert, del, modify, reset

}
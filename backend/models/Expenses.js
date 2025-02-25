const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

const ExpenseModel = mongoose.model('expenses', ExpenseSchema);
module.exports = ExpenseModel;
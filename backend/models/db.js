const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_URL;
mongoose.connect(mongo_url)
    .then(() => {
        console.log('Database Connected');
    }).catch((err) => {
        console.log('Error Connecting to DB ', err);
    })
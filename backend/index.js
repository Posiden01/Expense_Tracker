const express = require('express') 
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/auth');
const RecordRouter = require('./routes/record');

require('dotenv').config();
require('./models/db');


const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/record',RecordRouter );

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/test', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`)
})


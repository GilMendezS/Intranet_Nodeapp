const cors = require('cors');
const express = require('express');
const config = require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(cors());

const PORT = process.env.PORT || 3000;

//routes
const usersRoutes = require('./api/routes/user');
const API_VERSION = process.env.API_VERSION;

app.use(`${API_VERSION}/users`, usersRoutes);

app.listen(PORT, () => {
    console.log(`Http server on :${PORT}`);
})


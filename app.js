const cors = require('cors');
const express = require('express');
const config = require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`))
//get api url
const API_VERSION = process.env.API_VERSION;
//routes - api
const usersRoutes = require('./api/routes/user');
const authRoutes = require('./api/routes/auth');
app.use(`${API_VERSION}/users`, usersRoutes);
app.use(`${API_VERSION}/auth`, authRoutes);

app.listen(PORT, () => {
    console.log(`Http server on :${PORT}`);
})


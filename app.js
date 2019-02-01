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
const areasRoutes = require('./api/routes/areas');
const departmentsRoutes = require('./api/routes/department');
const positionsRoutes = require('./api/routes/position');
const statusRoutes = require('./api/routes/status');
app.use(`${API_VERSION}/users`, usersRoutes);
app.use(`${API_VERSION}/auth`, authRoutes);
app.use(`${API_VERSION}/areas`, areasRoutes);
app.use(`${API_VERSION}/departments`, departmentsRoutes);
app.use(`${API_VERSION}/positions`, positionsRoutes);
app.use(`${API_VERSION}/status`, statusRoutes);

app.listen(PORT, () => {
    console.log(`Http server on :${PORT}`);
})


const cors = require('cors');
const express = require('express');
const config = require('dotenv').config();
const bodyParser = require('body-parser');
const Associations = require('./models/associations');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

const PORT = process.env.PORT || 3000;
Associations.createAssociations();
app.use(express.static(`${__dirname}/frontend/dist`))
//get api url
const API_VERSION = process.env.API_VERSION;
//routes - api
const usersRoutes = require('./api/routes/user');
const authRoutes = require('./api/routes/auth');
const areasRoutes = require('./api/routes/areas');
const departmentsRoutes = require('./api/routes/department');
const positionsRoutes = require('./api/routes/position');
const statusRoutes = require('./api/routes/status');
const projectsRoutes = require('./api/routes/project');
const hoursRoutes = require('./api/routes/hour');
app.use(`${API_VERSION}/users`, usersRoutes);
app.use(`${API_VERSION}/auth`, authRoutes);
app.use(`${API_VERSION}/areas`, areasRoutes);
app.use(`${API_VERSION}/departments`, departmentsRoutes);
app.use(`${API_VERSION}/positions`, positionsRoutes);
app.use(`${API_VERSION}/status`, statusRoutes);
app.use(`${API_VERSION}/projects`, projectsRoutes);
app.use(`${API_VERSION}/hours`, hoursRoutes);

app.get('*', (req, res, next) => {
    res.sendFile(`${__dirname}/frontend/dist/index.html`)
})
app.listen(PORT, () => {
    console.log(`Http server on :${PORT}`);
})


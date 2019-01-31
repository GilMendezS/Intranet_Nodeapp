const cors = require('cors');
const express = require('express');
const config = require('dotenv').config()

const app = express();

app.use(cors());


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Http server on :${PORT}`)
})


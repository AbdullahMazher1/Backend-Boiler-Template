const express = require('express');
require('dotenv').config();
const cors = require("cors");
const authRoutes = require('./src/routes/authRoutes')
const connectDB = require('./src/config/db')

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;
connectDB();

app.get('/', (req, res) => {
    res.json({
        'status': 'success',
        'message': 'Backend is working fine!'
    })
})

app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
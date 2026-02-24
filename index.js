require('dotenv').config();
const express = require('express');
const cors = require("cors");
const authRoutes = require('./src/routes/AuthRoutes')
const connectDB = require('./src/config/db')
const protected = require('./src/routes/ProtectedRoutes')

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
connectDB();

app.get('/', (req, res) => {
    res.json({
        'status': 'success',
        'message': 'Backend is working fine!'
    })
})

app.use('/api/auth', authRoutes);
app.use('/api/v2', protected);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
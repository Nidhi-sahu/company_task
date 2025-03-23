require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const subdomain = require('express-subdomain');
const dbConnect = require('./config/dbConnect');

const schoolRoutes = require('./Router/schoolRoute');
const profileRoutes = require('./Router/profileRoute');
const adminRoutes = require('./Router/adminRoute');
const { getSchoolBySubdomain } = require('./Controller/schoolController');

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    })
);

const PORT = process.env.PORT || 5000;
app.use(express.json());
dbConnect();


app.use(
    subdomain('*', async (req, res, next) => {
        console.log('Detected subdomains:', req.subdomains);
        const subdomain = req.subdomains[0]; // Extract subdomain
        if (subdomain) {
            console.log(`Subdomain detected: ${subdomain}`);
            req.params.subdomain = subdomain;
            return getSchoolBySubdomain(req, res);
        }
        next();
    })
);


app.use('/', schoolRoutes);
app.use('/profiles', profileRoutes);
app.use('/admin', adminRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the main domain API');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

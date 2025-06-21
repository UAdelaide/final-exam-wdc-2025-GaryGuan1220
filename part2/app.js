const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(session({
    secret: 'dogwalk-secret',
    resave: false,
    saveUninitialized: true
}));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const dogsRoutes = require('./routes/dogs');


app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/api/login', loginRoute);
app.use('/api/logout', logoutRoute);
app.use('/api/dogs', dogsRoutes);
// Export the app instead of listening here
module.exports = app;

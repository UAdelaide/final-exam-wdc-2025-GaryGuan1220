var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

const dogsRoutes = require('./routes/dogs');
const walkRequestsRoutes = require('./routes/walkrequests');
const walkersRoutes = require('./routes/walkers');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/dogs', dogsRoutes);
app.use('/api/walkrequests/open', walkRequestsRoutes);
app.use('/api/walkers/summary', walkersRoutes);

app.use((err, req, res, next) => {
  console.error('❌ Error in', req.originalUrl + ':', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;

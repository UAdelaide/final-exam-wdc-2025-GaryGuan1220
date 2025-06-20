var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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
app.use('/', indexRouter);
app.use('/users', usersRouter);
const PORT = 8080;
app.listen(PORT, ())
module.exports = app;

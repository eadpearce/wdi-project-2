const express         = require('express');
const expressLayouts  = require('express-ejs-layouts');
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');
const flash           = require('express-flash');
const session         = require('express-session');
mongoose.Promise      = require('bluebird');
const methodOverride  = require('method-override');
const morgan          = require('morgan');
const env             = require('./config/env');
const router          = require('./config/routes');
const app             = express();
const User            = require('./models/user');

mongoose.connect(env.db);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(morgan('dev'));

app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'meeeehhhhhh',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use((req, res, next) => {
  if (!req.session.userId) return next();
  User
    .findById(req.session.userId)
    .exec()
    .then(user => {
      if (!user) {
        return req.session.regenerate(() => {
          req.flash('danger', 'You must be logged in to do that...');
          res.redirect('/login');
        });
      }
      res.locals.user = user;
      res.locals.isLoggedIn = true;
      console.log(user);
      next();
    });
});

app.use((err, req, res, next) => {
	// your error function here
  console.log(err);
});

app.use(router);

app.listen(env.port, () => console.log(`Server up and running on port: ${env.port}.`));

var express = require('express')
  , passport = require('passport')
  , OfflineStrategy = require('passport-offline');

passport.use(new OfflineStrategy({
  "profile": {
    "id": 1234
  , "username": "mheap"
  }
}, function(user, done){
  done(null, user);
}));

passport.serializeUser(function(user, done) {
  done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
  done(null, JSON.parse(user));
});

var app = express();
app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.session({
    secret: "woo keyboard cat"
  }));

  app.use(passport.initialize());
  app.use(passport.session());
});

app.get('/login', passport.authenticate('offline', { successRedirect: '/' }));

app.get('/', function(req, res){
  if (!req.user){
    return res.redirect('/login');
  }
  res.send(JSON.stringify(req.user));
});

app.listen(3000, function() {
  console.log('Express server listening on port 3000');
});

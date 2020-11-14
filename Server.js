if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const session = require('express-session');
//const MemoryStore = require('memorystore')(session);
const passport = require('passport');
const flash = require('express-flash');
const Override = require('method-override');

const initializePassport = require('./passport-config');
initializePassport(
	passport,
	username => users.find(user => user.username === username),
	id => users.find(user => user.id === id)
);


// Put the users in here
const users = [
  {
  	"username":"adasda",
    "email":"sadsad@sdasda",
  	"password":"asdad",
  	"friends":[],
  	"status":"offline",
  	"private":false,
  	"totalPlayed":0,
    "friendRequests": [],
    "matchHistory": [],
  	"totalLoss":0,
  	"totalWin":0,
  	"totalDraw":0
  }
]

app.use(express.static('public'))
app.use(express.static('NewFolder'))
app.use(express.static('views'))

//app.set('views', './');
app.set('view engine', 'ejs');

//app.use(express.cookieParser('process.env.SESSION_SECRET'));
//app.use(express.cookieSession());

app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
	secret: 'testsecret',
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(Override('_method'))

/*app.use('/', function(req, res, next) {
	console.log(req.session)*
	next()
})*/

// Render our web pages
app.get('/', checkAuthenticated, (req, res) => {
	res.render('pages/MainPage');
});
app.get('/login', checkNotAuthenticated, (req, res) => {
	res.render('pages/LoginPage');
});
app.get('/register', checkNotAuthenticated, (req, res) => {
	res.render('pages/register');
});
app.get('/friends', checkAuthenticated, (req, res) => {
	res.render('pages/FriendsPage', { username: req.user.username, friends: req.user.friends });
});
app.get('/spectate', checkAuthenticated, (req, res) => {
	res.render('pages/Spectate');
});
app.get('/profile', checkAuthenticated, (req, res) => {
	res.render('pages/Profile', { username: req.user.username, totalWins: req.user.totalWin,
  totalPlayed: req.user.totalPlayed, totalDraw: req.user.totalDraw, totalLoss: req.user.totalLoss, private: req.user.private});
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
	try {
	    const hashedPassword = await bcrypt.hash(req.body.password, 10)
	    users.push({
	      id: Date.now().toString(),
	      username: req.body.username,
	      email: req.body.email,
	      password: hashedPassword,
        friends: [],
        friendRequests: [],
        matchHistory: [],
        status: "offline",
        private: "public",
        totalPlayed: 0,
        totalLoss: 0,
        totalWin: 0,
        totalDraw: 0
	    })
	    res.redirect('/login')
	  } catch (e){ //error here
	    res.redirect('/register')
	  }
	})

app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}))

//
app.post('/friendSearch', async (res, req) => {
    var username = users.find(user => user.username === req.search)
    //var currentuser = req.user.username

    for(var i in users){
      if(users[i] == req.query['currUsers']){
        users[i].friends.push(username);
        console.log(users[i]);
      }
    }


    //req.user.friends.push(username);
    //res.redirect('/friends');
})

//app.get('/', checkAuthenticated, (req, res) => {
//  res.render('Profile.ejs', { name: req.user.name })
//})

app.delete('/logout', (req, res) => {
	req.logOut()
	res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}
//app.use('/public/javascripts',express.static(__dirname + "NewFolder/public/javascripts/MainPage.js"))
// Render the functions

//app.post('/LoginPage', LogIn);

//Server listens on port 3000
app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

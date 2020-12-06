if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

var express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const session = require('express-session');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const passport = require('passport');
const flash = require('express-flash');
const Override = require('method-override');

const initializePassport = require('./passport-config');
initializePassport(
	passport,
	username => users.find(user => user.username === username),
	id => users.find(user => user.id === id)
);

server.listen(3000);

// Put the users in here
const users = [
  {
  	"username":"abc",
    "email":"abc@abc",
  	"password":"abc",
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

const lobbies = { 0: { users:{}}};

// Put games as objects here
const games = [
  {
    "gameID": 0,
    "moves": [],
    "lobbyStatus": "private",
    "player1": "",
    "player2": "",
    "spectators": [],
    "winner": "",
    "currentTurn": "user1",
    "messageHist": []
  }
]

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.static('NewFolder'))
app.use(express.static('views'))
app.use(express.urlencoded({extended: true}));

app.use(flash());
app.use(session({
	secret: 'testsecret',
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(Override('_method'))

// Render our web pages
app.get('/', checkAuthenticated, (req, res) => {
	res.render('pages/MainPage', {lobbies: lobbies});
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
app.get('/:lobby', checkAuthenticated, (req, res) => {
  res.render('pages/game', { lobbyID: req.params.lobby, username: req.user.username});
});

io.on('connection', socket => {
  socket.on('user-joined', (lobby, username) => {
    console.log(username);
    socket.join(lobby);
    lobbies[lobby].users[socket.id] = username;
    socket.to(lobby).broadcast.emit('user-connected', username);
  });
  socket.on('send-message', (lobbyID, message) => {
    console.log(message);
    socket.to(lobbyID).broadcast.emit('chat-message', { message: message, username: lobbies[lobbyID].users[socket.id] })
  });
  socket.on('disconnect', () => {
    getUserLobbies(socket).forEach(lobby => {
      socket.to(lobby).broadcast.emit('user-disconnected', lobbies[lobby].users[socket.id])
      delete lobbies[lobby].users[socket.id]
    })
  })
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
	  } catch (e){
	    res.redirect('/register')
	  }
	})

app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}))

app.post('/friendSearch', async (res, req) => {
    var username = users.find(user => user.username === req.search)

    for(var i in users){
      if(users[i] == req.query['currUsers']){
        users[i].friends.push(username);
        console.log(users[i]);
      }
    }
})

app.delete('/logout', (req, res) => {
	req.logOut()
	res.redirect('/login');
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

function getUserLobbies(socket) {
  return Object.entries(lobbies).reduce((names, [name, lobby]) => {
    if (lobbies.users[socket.id] != null) {
      names.push(name)
      return names
    }

  }, [])
}

//Server listens on port 3000
console.log('Server running at http://127.0.0.1:3000/');

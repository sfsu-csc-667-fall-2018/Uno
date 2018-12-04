var express = require('express');
var router = express.Router();
var app = express();


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))




//Listen on port 5000
server = app.listen(5000)



//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected')

    //default username
    socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {username : socket.username})
    })
})



//routes
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/lobby', function(req, res) {

    res.render('lobby');
});

app.get('/login', function(req, res) {

    res.render('login');
});

app.get('/updatesuccess', function(req, res) {

    res.render('updatesuccess');
});


app.get('/creategame', function(req, res) {

    res.render('creategame');
});

app.get('/lobby', function(req, res) {

    res.render('lobby');
});

app.get('/game', function(req, res) {

    res.render('game');
});


app.get('/userinfo', function(req, res) {

    res.render('userinfo');
});

app.get('/users', function(req, res) {
   knex('Users')
   .then(
      knex.select('UserName', 'email', 'Password').from('Users')
      .then(function(users) {
         //console.log(users.length);
         res.render('users',{users: users});
      }));
});


module.exports = router;

   // req.query.username
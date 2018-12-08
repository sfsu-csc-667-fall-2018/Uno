const bcrypt = require('bcryptjs');
const utilities = require('./utilities.js');

const users = (io, socket, db, users) => {

   socket.on('login',data =>{
      console.log("Login: "+JSON.stringify(data));
      login(data);
   })

   socket.on('register',data =>{
      console.log("Register: "+JSON.stringify(data));
      register(data);
   })

   function login(data){
      console.log("Authenticating: "+ data.username +" "+ data.password);
      db.any("SELECT * FROM users WHERE username = $(username)",{ username: data.username })
      .then(user => {
       if (user.length == 0) {//user not found
         socket.emit('login response', {'result':false});
       }else {
           const salt = bcrypt.getSalt(user[0].password);
           passwordToCheck = bcrypt.hashSync(data.password, salt);
           console.log("db password: " + user[0].password);
           console.log("entered password: " + passwordToCheck);
           if (passwordToCheck !== user[0].password) {//wrong password
               console.log("WRONG Password");
               socket.emit('login response', {'result':false});
           }else{//Success
               result = true;
               console.log("user logged in: "+JSON.stringify(user));
               console.log("================ "+JSON.stringify(socket.handshake.headers['cookie']));
               let identifier = utilities.getUserId(socket);
               console.log("================ "+identifier);
               users[identifier] = {'username':data.username,'id':user[0].id}
               socket.emit('login response', {'result':true});
           }
       }
   })
      .catch(err => {//error
       console.log("Error: "+err);
       socket.emit('login response', {'result':false});
    });
   }

   function register(data){
      bcrypt.genSalt(10, (err, salt) => {
         bcrypt.hash(data.password, salt, (err, hash) =>{
            let encryptedPassword = hash;
            console.log("encrypted password: " + encryptedPassword);
             db.none('INSERT INTO users(username, email, password) VALUES(${username}, ${email}, ${password})', {
                 username: data.username,
                 email: data.email,
                 password: encryptedPassword
             })
                 .catch(err => {
                     console.log(err);
                     socket.emit('registration response', {'result':false});
                 });
             console.log("no error");
              let identifier = utilities.getUserId(socket);
              users[identifier] = {'username':data.username,'id':user[0].id}
              socket.emit('registration response', {'result':true});
          });
      });
   }
};

module.exports = users;



const users = (io, socket, db, name) => {
   const passport = require('passport');

   socket.on('login',data =>{
      console.log("LOGIN: "+data);
      login();
   })

   function login(){
      passport.authenticate('local');
      socket.emit('login response', {'USER':'test'});
   }
}

module.exports = users;

         /*passport.authenticate('local'),
    function(req, res) {
      console.log(req.user);
      res.redirect('/lobby');*/


   function getUserId(socket){
   console.log('================COOOKIES==================');
   let cookies = socket.handshake.headers['cookie'].split(';')
   for(let i = 0;i<cookies.length;i++){
      if(cookies[i].includes('connect.sid')){
         console.log(cookies[i]);
         return cookies[i].slice(13,cookies[i].length);
      }
   }
   }


module.exports={
   getUserId
}
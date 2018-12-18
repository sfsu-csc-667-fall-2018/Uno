
function getUserId(socket){
   let cookies = socket.handshake.headers['cookie'].split(';')
   for(let i = 0;i<cookies.length;i++){
      if(cookies[i].includes('connect.sid')){
         let start = cookies[i].indexOf('=');
         return cookies[i].slice(start+1);
      }
   }
}


module.exports={
   getUserId
}
const express = require('express');
let router = express.Router();

const pgp = require('pg-promise')();

const connection = process.env.DATABASE_URL;
const db = pgp(connection);
module.exports = connection;

router.get("/",  (request,  response)  =>  {
    db.any(`INSERT  INTO  test_table  ("testString")  VALUES  ('Hello  at  ${Date.now()}')`)
        .then(  _=>db.any(`SELECT  *  FROM  test_table`)  )
        .then(  results=>response.json(  results  )  )
        .catch(  error=>  {
            console.log(  error  );
            response.json({  error  });
        });
});


module.exports = router;

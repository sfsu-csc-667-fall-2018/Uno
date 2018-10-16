const express = require('express');
let router = express.Router();

const db = require('../db/db_connection');

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

module.exports = {
  "development": {
    "username": "pablo",
    "database": "test_db",
    "host": "localhost",
    "port": 5433,
    "dialect": "postgres"
    "dialectOptions":{
      "ssl":{
        "require":true
      }
    }
  },
  "test": {
    "username": "pablo",
    "database": "test_db",
    "host": "localhost",
    "port": 5433,
    "dialect": "postgres"
    "dialectOptions":{
      "ssl":{
        "require":true
      }
    }
  },
  "production": {
    "username": "pablo",
    "password": null,
    "database": "test_db",
    "host": "localhost",
    "port": 5433,
    "dialect": "postgres"
    "dialectOptions":{
      "ssl":{
        "require":true
      }
    }
  }
}

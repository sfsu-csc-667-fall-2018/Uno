require('dotenv').config();

module.exports = {
  "development": {
    "use_env_variable":"DATABASE_URL",
    "dialect": "postgres",
    "dialectOptions":{
      "ssl":{
        "require":true
      }
    }
  },
  "test": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "dialectOptions":{
      "ssl":{
        "require":true
      }
    }
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "dialectOptions":{
      "ssl":{
        "require":true
      }
    }
  }
}
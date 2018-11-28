require('dotenv').config();

module.exports = {
  "development": {
    "use_env_variable":"postgres://pablo@localhost:5433/test_db",
    "dialect": "postgres"
  },
  "test": {
    "use_env_variable": "postgres://pablo@localhost:5433/test_db",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "postgres://pablo@localhost:5433/test_db",
    "dialect": "postgres"
  }
}
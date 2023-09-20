const { DB_USERNAME, DB_PASSWORD, DB_HOST } = require(".");

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "qlptgt-db",
    "host": DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "qlptgt-db",
    "host": DB_HOST,
    "dialect": "mysql"
  }
}

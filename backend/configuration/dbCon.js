const mysql = require("mysql");
const dbConfig = require("./dbConfig.js");

const dbCon = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// open the MySQL connection
dbCon.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

//connection.end();
//console.log(dbCon);
module.exports = dbCon;

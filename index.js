const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = 3001;

const db = mysql.createConnection({
  host: process.env.REACT_APP_MYSQL_HOST,
  user: "root",
  password: process.env.REACT_APP_MYSQL_PASSWORD,
  database: process.env.REACT_APP_MYSQL_DATABASE,
});

//   host: ,
//   user: process.env.REACT_APP_MYSQL_USER,
//   password: process.env.REACT_APP_MYSQL_PASSWORD,
//   database: process.env.REACT_APP_MYSQL_DATABASE

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to the database");
  }
});

app.use(cors());

app.use(express.json());

app.get("/library", (req, res) => {
  const query = "SELECT * FROM library";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

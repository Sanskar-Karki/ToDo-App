const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql2')

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  host: 'localhost',
  user: "root",
  password: "guess",
  database: 'sys'
})

db.connect((err) => {
  if (!err) {
    console.log("Connected to Database Successfully!!!")
  } else {
    console.log("Failed to connect Database")
  }
})

app.post('/new-task', (req, res) => {
  console.log(req.body)
  const q = "insert into todos(task,createdAt) values (?,?)"
  db.query(q, [req.body.task, new Date()], (err, result) => {
    if (err) {
      console.log("Failed to store task!!!")
    } else {
      console.log("todo saves ")
    }
  })
})

app.listen(5000, () => {
  console.log("Server Started")
})


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
  const q = "insert into todos(task,createdAt,status) values (?,?,?)"
  db.query(q, [req.body.task, new Date(), 'active'], (err, result) => {
    if (err) {
      console.log("Failed to store task!!!")
    } else {
      console.log("todo saved ")
      const updatedTasks = 'select * from todos'
      db.query(updatedTasks, (err, newList) => {
        res.send(newList)
      })
    }
  })
})

app.get('/read-tasks', (req, res) => {
  const q = 'select * from todos'
  db.query(q, (err, result) => {
    if (err) {
      console.log("Failed to read tasks")
    } else {
      console.log("Got tasks successfully from db")
      res.send(result)

    }
  })
})

app.post('/update-task', (req, res) => {
  console.log(req.body)
  const q = 'update todos set task = ? where id = ?'
  db.query(q, [req.body.task, req.body.updateId], (err, result) => {
    if (err) {
      console.log('Failed to update')
    }
    else {
      console.log('Updated')
      db.query('select * from todos', (err, result) => {
        if (err) {
          console.log(err)
        }
        else {
          res.send(result)
        }
      })
    }
  })
})

app.post('/delete-task', (req, res) => {
  const q = 'delete from todos where id = ?';
  db.query(q, [req.body.id], (err, result) => {
    if (err) {
      console.log("Failed to delete")
    }
    else {
      console.log('Deleted successfully')
      db.query('select * from todos', (err, newList) => {
        res.send(newList)
      })
    }

  })

})

app.post('/complete-task', (req, res) => {
  const q = 'update todos set status= ? where id =?'
  db.query(q, ['Completed', req.body.id], (err, result) => {
    if (result) {
      db.query("select * from todos", (e, newList) => {
        res.send(newList)
      })
    } else {

    }
  })
})

app.listen(5000, () => {
  console.log("Server Started")
})


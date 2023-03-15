import express from "express"
import mysql from "mysql"
import cors from "cors"

const PORT = 3001

const app = express()

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nico123",
  database: "test"
})

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.json('Hello World!')
})

app.get("/books", (req, res) => {
  const querys = "SELECT * FROM BOOKS"
  db.query(querys, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

app.post("/books", (req, res) => {
  const query = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)"

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover
  ]

  db.query(query, [values], (err, data) => {
    if (err) throw err
    res.json(data)
  })
})

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const query = "DELETE FROM books WHERE id =?"

  db.query(query, [bookId], (err, data) => {
    if (err) throw err
    res.json(data)
  })
})


app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;

  const query = "UPDATE books SET `title` =?, `desc` =?, `price` =?, `cover` =? WHERE id =?"
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ]

  db.query(query, [ ...values, bookId], (err, data) => {
    if (err) throw err
    res.json(data)
  })
})

    
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
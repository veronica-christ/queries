const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//const port =3000 
const db = require('../db/queries')

//add queries and database CRUD functions 
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true,
}))

app.get('/'), (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
}

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

const port = process.env.PORT || 4000;
app.listen(port, (error) => {
    if (error) {
        console.log("server not runnin");
    } else {
        console.log(`server running on port ${port} : http://locahost:${port}`);
    }
})
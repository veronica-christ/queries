const query = require('express/lib/middleware/query')

const Pool = require('pg').Pool
const pool = new Pool({
user: 'admin',
host: 'localhost',
database: 'userman',
password: 'admin12345', //same password used at pg admin
port: 5432


})
//Get all Users in  the database 
const getUsers =(req,res) =>{
    pool.query('SELECT * FROM users ORDER BY id ASC',(error,results)=>{
    if(error){
        throw error
    }
    res.status(200).json(results.rows)

  }
 )
}

//get a single user by id
const getUserById=(req, res)=>{

    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM users WHERE id= $1', [id], (error, results) => {

        if (error) {
            throw error
        }
        res.status(200).json(results.rows)

    }
  )
}
    //Post a new user
const createUser =(req,res)=>{
    const {name,email}= req.body;
    pool.query(
        'INSERT INTO users(name, email) VALUES ($1,$2) RETURNING id', 
        [name,email] ,
        (error, results) => {
            if (error) {
                throw error
            }
        res.status(201).send(`user added with ID:${results.rows[0].id}`)
        }
    )
}

const updateUser =(req,res)=>{
    const id=parseInt(req.params.id)
    const {name,email}=req.body
    pool.query(
        'UPDATE users SET name =$1, email =$2 WHERE id= $3 ',
        [name,email,id],(error, results) => {
            if (error) {
                throw error
            } 
            res.status(200).send(`user modified with ID: ${id}`)
        }
    )
}
//delete a user
const deleteUser =(req,res)=>{
    const id=parseInt(req.params.id)
    pool.query('DELETE FROM users WHERE id=$1',
     [id],
     (error, results) => {

            if (error) {
                throw error
            } 
            res.status(200).send(`user deleted with ID: ${id}`)
        }
    )
}
//exporting CRUD functions as modules to REST API
module.exports={
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
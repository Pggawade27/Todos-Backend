const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4000

app.use(bodyParser.json())

const todos = []

// get request
app.get('/todos', (req, res) => {
    res.send(todos)
})

//post request
app.post('/todos', (req, res) => {
    const todo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: req.body.completed
    }

    todos.push(todo)
    res.status(201).json(todo)
})

//put request
app.put('/todos/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const todo = todos.find((t) => t.id === id)
    if(!todo){
        return res.status(404).send('todo not found')
    }
    todo.title = req.body.title || todo.title
    todo.completed = req.body.completed || todo.completed

    res.send(todo)
})

//delete request
app.delete('/todos/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const index = todos.findIndex((t) => t.id === id)

    if(index <= 0){
       return res.status(404).json({error: 'todo not found'})
    }

    todos.splice(index, 1)

    res.send('todo deleted')

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
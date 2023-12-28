const express = require('express')
const uuid = require('uuid')
const PORT = 8080
const app = express()

const habits = [
    {
        id: uuid.v4(),
        title: "Wake Up Early",
        completed: true
    },
    {
        id: uuid.v4(),
        title: "Brush Your Teeth ",
        completed: false
    },
    {
        id: uuid.v4(),
        title: "Go To Gym",
        completed: false
    }
]

app.get('/habits', (req, res) => {
    return res.json(habits)
})

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`)
})

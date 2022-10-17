const express = require('express')
const app = express()

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

// Needed to parse the request body as JSON
app.use(express.json())

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const foundPerson = persons.find(p => p.id === id)

  if (!foundPerson) {
    return response.status(404).end()
  }

  response.json(foundPerson)
})

app.delete('/api/persons/:id', (request,response) => {
  const id = Number(request.params.id)

  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const newId = Math.random(Number.MAX_VALUE)

  const body = request.body
  const name = body.name
  const phoneNumber = body.number

  if (!name) {
    response.status(400).json({
      error: 'Name is missing.'
    })
  }

  if (!phoneNumber) {
    response.status(400).json({
      error: 'Number is missing.'
    })
  }

  if (persons.find(p => p.name === name)) {
    response.status(400).json({
      error: 'Name must be unique'
    })
  }

  const newPerson = {
    ...request.body,
    id: newId
  }

  persons.push(newPerson)

  response.json(newPerson)
})

app.get('/api/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
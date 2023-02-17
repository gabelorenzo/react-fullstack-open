require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
// const url = process.env.MONGODB_URI

// mongoose.connect(url)

const app = express()

// Configure Morgan request logger
morgan.token('body', (req, res) => JSON.stringify(req.body));

// Needed to parse the request body as JSON
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const baseUrl = '/api/persons';

app.get(baseUrl, (request, response) => {
  Person.find().then(result => {
    response.json(result)
  })
})

app.get(`${baseUrl}/:id`, (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete(`${baseUrl}/:id`, (request,response) => {
  const id = request.params.id

  Person.findByIdAndDelete(id).then(res => response.status(204).end())
})

app.put(`${baseUrl}/:id`, (request, response, next) => {
  const id = request.params.id

  const body = request.body
  const name = body.name
  const number = body.number

  const updatedPerson = {
    name,
    number
  }

  // TODO: Move to error handler
  if (!name) {
    response.status(400).json({
      error: 'Name is missing.'
    })
  }

  if (!number) {
    response.status(400).json({
      error: 'Number is missing.'
    })
  }

  Person.findByIdAndUpdate(request.params.id, updatedPerson, { new: true })
  .then(updatedPerson => {
    response.json(updatedPerson.toJSON())
  })
  .catch(error => next(error))
})

app.post(baseUrl, (request, response) => {
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

  Person.find({name : name}, function (err, persons) {
    if (persons.length){
      response.status(400).json({
        error: 'Name must be unique'
      })
    } else{
      const person = new Person({
        ...request.body,
        id: newId
      })
  
      person.save().then(res => {
        response.json(res)
      })
    }
  });
})

app.get('/api/info', (request, response) => {
Person.find({}).then(persons => {
    console.log(persons)
    response.send(`
      <p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>
    `)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

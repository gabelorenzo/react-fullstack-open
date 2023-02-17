const mongoose = require('mongoose')

// NOTE: This file isn't really used in the application. It's just a utility
// for testing connection to Mongo.

if (process.argv.length < 3) { // eslint-disable-line no-undef
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1) // eslint-disable-line no-undef
}

const password = process.argv[2] // eslint-disable-line no-undef
const personName = process.argv[3] // eslint-disable-line no-undef
const phoneNumber = process.argv[4] // eslint-disable-line no-undef

const url = `mongodb+srv://gabelorenzo:${password}@cluster0.g6jjyr3.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('CONNECTED!')

    if (personName && phoneNumber) {
      const person = new Person({
        id: Math.random(Number.MAX_VALUE),
        name: personName,
        number: phoneNumber
      })

      return person.save().then(() => {
        console.log(`added ${personName} number ${phoneNumber} to phonebook`)
        return mongoose.connection.close()
      })
    } else {
      return Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name + ' ' + person.number)
        })
        mongoose.connection.close()
      })
    }
  })
  .catch((err) => console.log(err))
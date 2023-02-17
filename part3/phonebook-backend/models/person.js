const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    console.log("PERSON ID: ", returnedObject._id.toString())
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

module.exports = mongoose.model('Person', personSchema)

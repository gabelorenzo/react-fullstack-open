const express = require("express");
require('express-async-errors')
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const morgan = require("morgan");

const mongoUrl = "mongodb://localhost/bloglist";
mongoose.connect(mongoUrl);

// Configure Morgan request logger
morgan.token('body', (req) => JSON.stringify(req.body))
// Needed to parse the request body as JSON
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use(cors());

app.get("/api/blogs", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
});

app.post("/api/blogs", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save()
  
  response.status(201).json(result)
});


const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

module.exports = app
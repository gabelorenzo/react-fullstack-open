const express = require("express");
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

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  console.log("BLOG" , request.body)

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

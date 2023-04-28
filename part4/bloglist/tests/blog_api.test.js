const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const newBlog = {
    title: "NEW",
    author: "Bob",
    url: "www.newblog.com",
    likes: 3,
  }
  let blogObject = new Blog(newBlog)
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('blogs contains id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  expect(response.body[0].id).toBeDefined()
}, 100000)

test('create a blog', async () => {
  const newBlog = {
    title: "NEW",
    author: "Bob",
    url: "www.newblog.com",
    likes: 3,
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  
  expect(response.body.title).toEqual(newBlog.title)
}, 100000)

test('default likes', async () => {
  const newBlog = {
    title: "NEW",
    author: "Bob",
    url: "www.newblog.com",
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  
  expect(response.body.likes).toEqual(0)
}, 100000)

test('verify title', async () => {
  const newBlog = {
    author: "Bob",
    url: "www.newblog.com",
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
}, 10000)

test('verify url', async () => {
  const newBlog = {
    author: "Bob",
    title: "SOme Title"
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
}, 10000)

test('delete by id', async () => {
  const newBlog = {
    title: "NEW",
    author: "Bob",
    url: "www.newblog.com",
    likes: 3,
  }
  const newBlogResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const getBlogsResponse1 =   await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(getBlogsResponse1.body.length).toEqual(2)

  await api
    .delete(`/api/blogs/${newBlogResponse.body.id}`)
    .expect(204)

  const getBlogsResponse2 =   await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(getBlogsResponse2.body.length).toEqual(1)

}, 10000)

test('update blog', async () => {
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)  

  expect(blogs.body[0].id).toBeDefined()

  const updatedBlog = {
    title: "NEW",
    author: "Bob",
    url: "www.newblog.com",
    likes: 4,
  }

  const response = await api
    .put(`/api/blogs/${blogs.body[0].id}`)
    .send(updatedBlog)
    .expect(200)

  expect(response.body.likes).toEqual(4)
}, 10000)

afterAll(async () => {
  await mongoose.connection.close()
})

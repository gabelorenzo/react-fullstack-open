const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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

afterAll(async () => {
  await mongoose.connection.close()
})

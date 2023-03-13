const { groupBy, keys } = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((totalLikes, blog) => {
    return totalLikes + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog);
}

const mostBlogs = (blogs) => {
  const authorsToBlogs = groupBy(blogs, "author")

  const authorsToBlogCount = keys(authorsToBlogs)
    .map(authorName => {
      return {
        author: authorName,
        blogs: authorsToBlogs[authorName].length
      }
    })
    .sort((author1, author2) => author2.blogs - author1.blogs);

  return authorsToBlogCount[0];
}

const mostLikes = (blogs) => {
  const authorsToBlogs = groupBy(blogs, "author")

  const authorsToBlogCount = keys(authorsToBlogs)
    .map(authorName => {
      return {
        author: authorName,
        likes: authorsToBlogs[authorName]
          .reduce((accumlator, blog) => accumlator + blog.likes, 0)
      }
    })
    .sort((author1, author2) => author2.likes - author1.likes);

  return authorsToBlogCount[0];
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
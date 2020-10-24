import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAllBlogs().then((blogs) => setBlogs(blogs))
    }
  }, [])

  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      const blogs = await blogService.getAllBlogs()
      setBlogs(blogs)
    } catch (exception) {
      setError('username or password invalid')
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  const addBlog = (newBlog) => {
    try {
      blogService.createBlog(newBlog).then((b) => {
        console.log('response data', b)
        setBlogs(blogs.concat(b))
        setMessage(`a new blog ${b.title} by ${b.author} added`)
        setTimeout(() => {
          setMessage('')
        }, 5000)
      })
    } catch (exception) {
      console(exception)
    }
  }

  const addLike = async (blog) => {
    const updateBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      userId: blog.user.id
    }
    const updatedBlog = await blogService.updateBlog(updateBlog)
    let blogsClone = [...blogs]
    blogsClone.forEach((b) => {
      if (b.id === updatedBlog.id) {
        b.likes = updatedBlog.likes
      }
    })
    setBlogs(blogsClone)
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)
      let blogClone = [...blogs]
      const deleteIndex = blogClone.findIndex((b) => b.id === blog.id)
      blogClone.splice(deleteIndex, 1)
      setBlogs(blogClone)
    }
  }

  const loingForm = () => (
    <form onSubmit={loginHandler}>
      <h1>log in to application</h1>
      <Notification message={message} error={error} />
      <div>
        username:
        <input
          type='text'
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          id='password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>
        login
      </button>
    </form>
  )

  const blogList = () => (
    <div>
      <h1>blogs</h1>
      <Notification message={message} error={error} />
      <p>
        {user.name} logged{' '}
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedUser')
            setUser(null)
            blogService.setToken('')
          }}
        >
          logout
        </button>
      </p>
      <Togglable buttonLabel='new blog'>
        <BlogForm createNewBlog={addBlog} />
      </Togglable>

      {blogs
        .sort((a, b) => {
          return b.likes - a.likes
        })
        .map((b) => (
          <Blog
            blog={b}
            key={b.id}
            addLike={() => addLike(b)}
            removeBlog={() => removeBlog(b)}
          />
        ))}
    </div>
  )

  return <div>{user === null ? loingForm() : blogList()}</div>
}

export default App

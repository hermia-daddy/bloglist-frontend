import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [hide, setHide] = useState(true)

  const hideStyle = { display: hide ? 'none' : '' }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={() => setHide(!hide)}>
          {hide ? 'view' : 'hide '}
        </button>
        <div style={hideStyle}>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={addLike}>like</button>
          </p>
          <p>{blog.author}</p>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog

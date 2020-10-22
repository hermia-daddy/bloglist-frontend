import axios from 'axios'

const baseUrl = '/api/blogs'

let token = ''

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, {
    headers: { Authorization: token }
  })
  return response.data
}

const updateBlog = async (updateBlog) => {
  const response = await axios.put(`${baseUrl}/${updateBlog.id}`, updateBlog, {
    headers: { Authorization: token }
  })
  return response.data
}

const deleteBlog = async (deleteId) => {
  await axios.delete(`${baseUrl}/${deleteId}`, {
    headers: { Authorization: token }
  })
}

export default { getAllBlogs, createBlog, updateBlog, deleteBlog, setToken }

import axios from "axios";

const baseUrl = "/api/blogs";

let token = "";

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (newBlog) => {
 const response =await axios.post(baseUrl, newBlog, { headers: { Authorization: token } });
 return await response.data
};

export default { getAllBlogs,createBlog, setToken };

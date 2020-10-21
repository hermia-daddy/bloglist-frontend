import React, { useState, useEffect } from "react";
import loginService from "./services/login";
import blogService from "./services/blog";
import Notification from "./components/Notification"

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [error,setError]=useState("")
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAllBlogs().then((blogs) => setBlogs(blogs));
    }
  }, []);

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      const blogs = await blogService.getAllBlogs();
      setBlogs(blogs);
    } catch (exception) {
        debugger
      setError("username or password invalid");
      setTimeout(() => {
          setError('')
      }, 5000);
    }
  };

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await blogService.createBlog({ title, author, url });
      console.log("response data", newBlog);
      setBlogs(blogs.concat(newBlog));
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
          setMessage('')
      }, 5000);
    } catch (exception) {}
  };

  const loingForm = () => (
    <form onSubmit={loginHandler}>
      <h1>log in to application</h1>
      <Notification message={message} error={error}/>
      <div>
        username:
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogList = () => (
    <div>
      <h1>blogs</h1>
      <Notification message={message} error={error}/>
      <p>
        {user.name} logged{" "}
        <button
          onClick={() => {
            window.localStorage.removeItem("loggedUser");
            setUser(null);
            blogService.setToken("");
          }}
        >
          logout
        </button>
      </p>

      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>

      {blogs.map((b) => (
        <p>{b.title}</p>
      ))}

      
    </div>
  );

  return <div>{user === null ? loingForm() : blogList()}</div>;
};

export default App;

import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [addNewBlogVisible, setAddNewBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showSuccessMessage(`logged in as user: ${user.username}`)
    } catch (exception) {
      showErrorMessage('wrong username or password')
    }
  }

  const newBlogForm = () => {
    const hideWhenVisible = { display: addNewBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: addNewBlogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick = {() => setAddNewBlogVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            newBlog={newBlog}
            addBlog={addBlog}
            handleTitleChange ={({ target }) => handleBlogChange('title', target.value)}
            handleAuthorChange ={({ target }) => handleBlogChange('author', target.value)}
            handleUrlChange ={({ target }) => handleBlogChange('url', target.value)}
          />
          <button onClick = {() => setAddNewBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    },3000)
  }
  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    },3000)
  }


  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )


  const addBlog = (event) => {
    event.preventDefault()
    try {
      blogService.create(newBlog)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewBlog({
            title:'',
            author:'',
            url:''
          })
          showSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        })
    } catch (exception) {
      showErrorMessage('could not add a new blog')
    }
  }

  const addLike =(blog) => {
    const modifiedBlog = {
      user: blog.user.id,
      likes: blog.likes +1,
      author:  blog.author,
      title: blog.title,
      url: blog.url
    }
    try {
      blogService.update(blog.id, modifiedBlog)
        .then(() => {
          blogService.getAll().then(blogs =>
            setBlogs( blogs )
          )
          showSuccessMessage('A new like added')
        })
    } catch(exception) {
      showErrorMessage('something went wrong, like not registered')
    }
  }

  const remove = (id) => {
    if(window.confirm('Are you really sure you want to delete such an amazing blog?')){
      try {
        blogService.remove(id)
          .then((blog) => {
            console.log(blog)
            var remainingblogs = blogs.filter(x => x.id !== id)
            setBlogs(remainingblogs)
            showSuccessMessage(`blog id: ${id} removed.`)
          })
      } catch(exception) {
        showErrorMessage('something went wrong, blog not removed')
      }
    }
  }

  const handleBlogChange = (property, value) => {
    setNewBlog({
      ...newBlog, [property]: value
    })
  }

  if (user === null) {
    return (
      <div>
        <h3>{successMessage}</h3>
        <h3>{errorMessage}</h3>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <h3>{successMessage}</h3>
      <h3>{errorMessage}</h3>
      {newBlogForm()}
      <div>{user.name} logged in</div> <button onClick={logout}>Logout</button>
      <br></br>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} value={blog} addLike={() => addLike(blog)} remove={() => remove(blog.id)} user={user}/>
      )}


    </div>
  )

}

export default App
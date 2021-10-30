import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, remove, user }) => {
  const blogStyle = {
    border: 'solid',
    borderWidth:1,
    padding:2
  }

  Blog.PropTypes = {
    blog: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  const [visible, setVisible] = useState(false)
  const detailsVisible = { display: visible ? '' : 'none' }
  const detailsNotVisible = { display: visible ? 'none' : '' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (

    <div style={blogStyle}>
      <div style={detailsNotVisible}>
        {blog.title} - {blog.author} <button onClick = {toggleVisibility}>view</button>
      </div>

      <div style = {detailsVisible}>
        {blog.title} {blog.author} <button onClick = {toggleVisibility}>hide</button>
        <p> {blog.url}</p>
        <p>likes: {blog.likes} <button value={blog} onClick={addLike}>like</button></p>
        <p>{blog.user.name}</p>
        {blog.user.username === user.username ?
          <button onClick = {remove}>remove</button> : <div></div>}
      </div>
    </div>
  )
}
export default Blog
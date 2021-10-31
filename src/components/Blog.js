import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, remove, user }) => {
  const blogStyle = {
    border: 'solid',
    borderWidth:1,
    padding:2
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
  //  addLike: PropTypes.func.isRequired,
  //  remove: PropTypes.func.isRequired,
  //  user: PropTypes.object.isRequired
  }

  const [visible, setVisible] = useState(false)
  const detailsVisible = { display: visible ? '' : 'none' }
  const detailsNotVisible = { display: visible ? 'none' : '' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (

    <div style={blogStyle} className='blog'>
      <div style={detailsNotVisible}>
        {blog.title} - {blog.author} <button onClick = {toggleVisibility}>view</button>
      </div>

      <div style = {detailsVisible} className="details">
        {blog.title} {blog.author} <button onClick = {toggleVisibility}>hide</button>
        <p> {blog.url}</p>
        <p>likes: <span className="likes">{blog.likes}</span> <button value={blog} onClick={addLike}>like</button></p>
        <p>{blog.user?.name}</p>
        {blog.user?.username === user?.username ?
          <button onClick = {remove}>remove</button> : <div></div>}
      </div>
    </div>
  )
}
export default Blog
import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  newBlog,
  addBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <p>
        title:
          <input type="text"
            value={newBlog.title}
            onChange={handleTitleChange}
          /></p>
        <p>author:
          <input type="text"
            value={newBlog.author}
            onChange={handleAuthorChange}/></p>
        <p>url:
          <input type="text"
            value={newBlog.url}
            onChange={handleUrlChange}/></p>
        <button type="submit">save</button>
      </form>
    </div>
  )}

BlogForm.propTypes = {
  newBlog: PropTypes.object.isRequired,
  addBlog: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired
}

export default BlogForm
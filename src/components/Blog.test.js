import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


test('renders title and author', () => {
    const blog = {
        title: 'Title for test blog',
        author: 'Author of test blog',
        url: 'www.testing.fi',
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.getByText('Title for test blog - Author of test blog')).toBeDefined()
    expect(component.container.querySelector('.details')).toHaveStyle('display:none')
})

test('clicking view-button renders url and likes', async () => {
    const blog = {
        title: 'Title for test blog',
        author: 'Author of test blog',
        url: 'www.testing.fi',
        likes: 7
    }

    const component = render(
        <Blog blog={blog} />
    )
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.getByText('www.testing.fi')).toBeDefined()
    expect(component.getByText('likes: 7')).toBeDefined()
  
})

test('clicking like-button twice calls event handler twice', async () => {
    const blog = {
        title: 'Title for test blog',
        author: 'Author of test blog',
        url: 'www.testing.fi',
    }

    const mockHandler = jest.fn()
    const component = render(
        <Blog blog={blog} addLike={mockHandler} />
    )
    
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
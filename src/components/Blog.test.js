import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import Blog from './Blog'

test('start blog display', () => {
  const blog = {
    title: 'first blog',
    author: 'zhong fc',
    url: 'www.baidu.com',
    likes: 18
  }

  const component = render(<Blog blog={blog} />)

  const div = component.container.querySelector('.blogHeader')
  expect(div).toHaveTextContent('first blog by zhong fc')

  const detialDiv = component.container.querySelector('.blogDetial')
  expect(detialDiv).toHaveStyle('display:none')
})

test('click detail button', () => {
  const blog = {
    title: 'first blog',
    author: 'zhong fc',
    url: 'www.baidu.com',
    likes: 18
  }
  const component = render(<Blog blog={blog} />)
  const button = component.getByText('view')
  fireEvent.click(button)
  const detialDiv = component.container.querySelector('.blogDetial')
  expect(detialDiv).not.toHaveStyle('display:none')
  expect(detialDiv).toHaveTextContent('18')
  expect(detialDiv).toHaveTextContent('www.baidu.com')
})

test('add like twice', () => {
  const blog = {
    title: 'first blog',
    author: 'zhong fc',
    url: 'www.baidu.com',
    likes: 18
  }
  const mockHandler = jest.fn()
  const component = render(<Blog blog={blog} addLike={mockHandler} />)
  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('like')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

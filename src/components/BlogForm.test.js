import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('create new blog', () => {
  const createBlog = jest.fn()
  const component = render(<BlogForm createNewBlog={createBlog} />)

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'test title' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'test author' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'test url' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
})

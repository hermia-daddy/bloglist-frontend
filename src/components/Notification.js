import React from 'react'

const Notification = ({ message, error }) => {
  if (message) {
    return <div className='message'>{message}</div>
  }
  if (error) {
    return <div className='error'>{error}</div>
  }
  return null
}

export default Notification

import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideStyle = { display: visible ? 'none' : '' }
  const showStyle = { display: visible ? '' : 'none' }

  const changeVisible = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <div style={hideStyle}>
        <button onClick={changeVisible}>{props.buttonLabel}</button>
      </div>
      <div style={showStyle}>
        {props.children}
        <button onClick={changeVisible}>cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable

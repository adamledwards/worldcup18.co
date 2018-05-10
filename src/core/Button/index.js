import React from 'react'
import './Button.css'

const Button = props => <a {...props} className={`Button ${props.className}`} />

export default Button

import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Logo.css"

function Logo() {
  const navigate = useNavigate();
  return (
    <h4 className='logo' onClick={()=> navigate("/")}>Blogistan</h4>
  )
}

export default Logo
import React from 'react'
import {Register, Container} from "../../index"
import "./Registerpage.css"

function Registerpage() {
  return (
    <div className="register-page">
        <Container>
        <h2 className="page-title">Register</h2>
        <Register />
        </Container>
    </div>
  )
}

export default Registerpage
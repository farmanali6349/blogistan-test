import React from 'react'
import {Container, Login} from "../../index"
import "./Loginpage.css"
function Loginpage() {
  return (

    <div className="login-page">
    <Container>
        <h2 className='page-title'>Login</h2>
        <Login />
    </Container>
    </div>
  )
}

export default Loginpage
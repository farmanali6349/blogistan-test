import React from 'react'
import { Container, Logo, Logout, Navbar } from '../index';
import { Link } from 'react-router-dom';
import "./Header.css"


function Header() {
  return (
    <header>
      <Container>
          <Logo />
          <Navbar />
      </Container>
    </header>
  )
}

export default Header
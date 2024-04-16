import React, { useEffect, useState } from 'react'
import { Container, Logo, Logout, Navbar } from '../index';
import { Link } from 'react-router-dom';
import { menu } from '../../assets/icons/index';
import "./Header.css"


function Header() {

  const [isMobile, setIsMobile] = useState(false);
  const [isClose, setIsClose] = useState(true);

  useEffect(()=> {
    if(window.innerWidth < 650) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
    
    console.log("Useeffec is running.")
  },[])


  return (
    <header>
      <Container>
          <Logo />
          <Navbar isMobile={isMobile} isClose={isClose} setIsClose={setIsClose}/>
          {isMobile ? <img src={menu} alt='menu' onClick={()=> setIsClose(()=> false)}/> : null}
      </Container>
    </header>
  )
}

export default Header

import React, { useState } from 'react'
import { useSelector } from "react-redux"
import "./Navbar.css"
import { useNavigate } from 'react-router-dom';
import {Logout} from '../index';
import {close} from "../../assets/icons/index"

function Navbar({
    isClose,
    isMobile,
    setIsClose
}) {

    const authStatus = useSelector(state => state.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "All Posts",
            slug: "/posts",
            active: true
        },
        {
            name: "Create Post",
            slug: "/create-post",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Register",
            slug: "/register",
            active: !authStatus
        }
        
    ]


    return (
        <nav className={`primary-navbar ${isMobile ? `mobile-nav ${isClose ? "close" : "" }` : ""}`}>
            {isMobile ? <img src={close} alt="close-icon" onClick={() => setIsClose(()=> true)}/> : null}
            <ul>
                {navItems.map((item)=> {
                    if(item.active) {
                        return (
                            <li key={item.name}>
                                <button onClick={()=> {navigate(item.slug); setIsClose(()=> true)}} className='nav-item'>
                                    {item.name}
                                </button>
                            </li>
                        )
                    }
                })}

                {authStatus && (
                    <li>
                        <Logout />
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
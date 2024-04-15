import React from 'react'
import { useSelector } from "react-redux"
import "./Navbar.css"
import { useNavigate } from 'react-router-dom';
import {Logout} from '../index';

function Navbar() {

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

    const goToLink = (url) => {
        navigate(url);
    }
    return (
        <nav className='primary-navbar'>
            <ul>
                {navItems.map((item)=> {
                    if(item.active) {
                        return (
                            <li key={item.name}>
                                <button onClick={()=> goToLink(item.slug)} className='nav-item'>
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
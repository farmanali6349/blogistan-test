import { Button } from "../index"
import React from 'react'
import authService from "../../appwrite/auth"
import { useDispatch } from "react-redux"
import { logout } from "../../store/features/authSlice"
import "./Logout.css"
const Logout = () => {

  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout()
      .then(() => {
        dispatch(logout())
      })

    console.log("logged Out")
  }

  return (
    <>
      <Button className="button" onClick={logoutHandler}>
        Logout
      </Button>
    </>
  )
}

export default Logout
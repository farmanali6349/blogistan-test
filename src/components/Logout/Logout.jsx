import { Button } from "../index"
import React from 'react'
import authService from "../../appwrite/auth"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/features/authSlice"
import "./Logout.css"
import { useNavigate } from "react-router-dom"
const Logout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await authService.logout()
    .then(() => {
      dispatch(logout())
      navigate('/')
      console.log("logged Out")
    }).catch((err)=> console.log("Error Occured During Logout :: Error -> ", err))
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
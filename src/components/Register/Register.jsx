import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import {Logo, Input, Button} from "../index"
import {Link, useNavigate} from "react-router-dom"
import "./Register.css"
import authService from '../../appwrite/auth';
import {login as authLogin} from "../../store/features/authSlice"
import { useDispatch } from 'react-redux';
function Register() {

    const {register, handleSubmit, formState: { errors }} = useForm();
    const [registerErrors, setRegisterErrors] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerAccount = async (registerData) => {
        setRegisterErrors("");

        try {
            const userData = await authService.createAccount(registerData);

            if(userData) {
                navigate("/login")
            }

        } catch (error) {
            setRegisterErrors(error);
        }
    }
  return (
    <form className='register-form stroke' onSubmit={handleSubmit(registerAccount)}>
        
            <Input
                type="text"
                label="* Enter Full Name:"
                placeholder="e.g Muhammad Ali"
                className="input stroke"
                error={errors.name && errors.name.message}
                {...register("name", {
                    required: true
                })}

            />

            <Input
                type="email"
                label="* Enter Email:"
                placeholder="example@example.com"
                className="input stroke"
                error={errors.email && errors.email.message}
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                    }
                })}

            />
            <Input
                type="password"
                label="* Enter Password:"
                placeholder="*****"
                className="input stroke"
                error={errors.password && errors.password.message}
                {...register("password", {
                    required: true,
                    validate: {
                        matchPatern : (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#{}^])[A-Za-z\d@$!%*?&#{}^]{8,}$/gm.test(value) || "Password must have minimum 8 digits, a number, a special character, a capital letter and a small letter"
                    }
                })}

            />

            <Button className="button w-100" type="submit">
                Register
            </Button>
            <p>Already have account? {(
                <>
                    <Link to="/login">
                        Login
                    </Link>

                </>
            )}</p>
        </form>
  )
}

export default Register
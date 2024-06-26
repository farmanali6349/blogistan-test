import React, { useState, useRef } from 'react'
import authService from '../../appwrite/auth'
import { login as authLogin } from '../../store/features/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { Input, Button, Loading } from "../index"
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar"


function Login() {

    // Loading bar
    const loadingBarColor = "#a75bff"
    const loadingBarRef = useRef(null);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();


    const login = async (loginData) => {
        loadingBarRef.current.continuousStart();
        setLoading(true);

        authService.login({ ...loginData })
            .then((session) => {

                console.log("Logged In")

                authService.getCurrentUser()
                    .then((userData) => dispatch(authLogin({ userData })))
                    .catch((err) => console.log("Error Occured while fetching user data after login."))
                    .finally(() => setLoading(false))

            }).catch((err) => console.log("Error Occured During Login :: Error -> ", err))
            .finally(()=> loadingBarRef.current.complete()).finally(() => loadingBarRef.current.complete())

}


return (
    <>
        <LoadingBar color={loadingBarColor} ref={loadingBarRef} progress={loadingProgress} />
        {!loading ? (
            <form className='login-form stroke' onSubmit={handleSubmit(login)}>
                <Input
                    type="email"
                    label="Enter your email:"
                    placeholder="example@example.com"
                    className="input stroke"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address"
                        }
                    })}

                />
                <Input
                    type="password"
                    label="Enter your password:"
                    placeholder="*****"
                    className="input stroke"
                    {...register("password", {
                        required: true
                    })}

                />
                <Button className="button w-100" type="submit">
                    Login
                </Button>
                <p>Do not have an account? {(
                    <>
                        <Link to="/Register">
                            Register
                        </Link>

                    </>
                )}</p>
            </form>
        ) : <Loading />}
    </>
)
}

export default Login
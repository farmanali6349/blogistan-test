import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Authlayout({children, authentication = true}) {

    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.status);
    const navigate = useNavigate();
    useEffect(()=> {

        if(authentication && authStatus !== authentication) {
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }

        setLoader(false);

    }, [authentication, authStatus, navigate])

    return loader ? <p>Loading...</p> : <>{children}</>;
}
export default Authlayout
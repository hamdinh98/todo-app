import React,{useEffect} from "react";
import useAuth from "../hooks/useAuth";
import {Navigate, useNavigate} from "react-router-dom";

// @ts-ignore
function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        return () => {
            if (!auth) {
                navigate('/');
            }
        }
    }, []);

    return children;
}

export default PrivateRoute;
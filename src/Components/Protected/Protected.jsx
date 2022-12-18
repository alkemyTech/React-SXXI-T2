import React from 'react'
import { Navigate } from 'react-router-dom'

export function Protected({ isLoggedIn, children}) {
    console.log(isLoggedIn);
    if(!isLoggedIn) {
        return <Navigate to="/" replace />;
    } 
    return children;
}

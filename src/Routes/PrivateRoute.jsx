import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';


const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <div className="flex justify-center items-center h-screen">
        <div className="loading loading-ring loading-lg"></div>
    </div>
    }
    
    if(user){
        return children;
    }
    return <Navigate to='/login' state={{from: location}}  replace></Navigate>
    
};

export default PrivateRoute;
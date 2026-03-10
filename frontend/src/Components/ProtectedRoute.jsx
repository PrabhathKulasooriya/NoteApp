import React, { use } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppContext } from "../Context/AppContext";


const ProtectedRoute = ({ children}) => {
  const {token} = useAppContext();

  if (!token) {
    return <Navigate to="/" replace />;
  }else {
    return children
  }
};

export default ProtectedRoute

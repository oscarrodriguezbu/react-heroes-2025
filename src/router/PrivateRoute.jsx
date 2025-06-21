import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../auth';


export const PrivateRoute = ({ children }) => {

    const { logged } = useContext(AuthContext);
    const { pathname, search } = useLocation(); //useLocation Tambien sirve para ayudar a recordar la ultima pagina visitada antes de cerrar session
    // con useEffecto o con memo se podria evitar que se ejecute constantemente

    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath);


    return (logged)
        ? children
        : <Navigate to="/login" />
}

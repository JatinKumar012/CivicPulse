import {Navigate, Outlet} from "react-router-dom";

const isAuthenticated = () => {
    return localStorage.getItem("token") !== NULL;
};

const PrivateRoute = () => {
    return isAuthenticated() ? <Outlet/> : <Navigate to="/login"/>;
};

export default PrivateRoute;

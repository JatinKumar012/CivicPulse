import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {
    const tokens = localStorage.getItem("token");
    return token ? <Outlet/> : <Navigate to="/login" replace/>;
};

export default PrivateRoute;

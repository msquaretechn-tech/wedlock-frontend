import { Navigate, Outlet } from "react-router-dom";
import { ReactElement } from "react";




interface ProtectedRouteProps {
    children?: ReactElement;
    isAuthenticated: boolean;
    redirect?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    isAuthenticated,
    redirect = '/login',
}) => {

   
    if (!isAuthenticated) {
        return <Navigate to={redirect} />;
    }
   
    

    return children ? children: <Outlet />;
};

export default ProtectedRoute;

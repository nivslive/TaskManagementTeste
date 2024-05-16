import { useDispatch, useSelector } from "react-redux";
import Login from "../pages/Login";
import ErrorPage from "../pages/Error";

const Redirect = () => {
    const auth = useSelector((state: any) => state.auth.authenticated);
    window.location.pathname = auth ? '/dashboard' : '/login';
    return <></>;
};
const publicRoutes = [
    {
        path: "/",
        element: <Redirect />,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    // {
    //     path: '*',
    //     element: <ErrorPage typeError="notfound" />,
    // }
];

export default publicRoutes;
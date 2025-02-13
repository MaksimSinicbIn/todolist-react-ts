import { Navigate, createHashRouter } from "react-router-dom";
import App from "app/App";
import { ErrorPage } from "common/components";
import { Login } from "features/auth/ui/Login";
import { TodolistsList } from "features/TodolistList/ui/TodolistsList";


// let demo = true

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Navigate to='/404' />,
        children: [
            {
                index: true,
                element: <Navigate to={'/todolists'} />
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/todolists",
                element: <TodolistsList />,
            },
        ],
    },
    {
        path: '/404',
        element: <ErrorPage />
    }
]);
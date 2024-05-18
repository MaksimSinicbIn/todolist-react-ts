import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../app/App";
import { Login } from "../features/Login/Login";
import { TodolistsList } from "../features/TodolistList/TodolistsList";
import { ErrorPage } from "../components/ErrorPage/ErrorPage";

let demo

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Navigate to='/404'/>,
        children: [
            {
                index: true,
                element: <Navigate to={'/todolists'}/>
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/todolists",
                element: <TodolistsList demo={demo}/>,
            },
        ],
    },
    {
        path: '/404',
        element: <ErrorPage />
    }
]);
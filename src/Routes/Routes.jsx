import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Home/Home";
import Login from "../Component/Pages/Login/Login";
import Register from "../Component/Pages/Register/Register";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        }
        ,
        {
          path:"/login",
          element:<Login></Login>

        },
        {
          path:"/register",
          element:<Register></Register>
        }
      ]
    },
  ]);
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Home/Home";
import Login from "../Component/Pages/Login/Login";
import Register from "../Component/Pages/Register/Register";
import UserProfile from "../Component/Pages/Profile/UserProfile";
import PrivateRoute from "./PrivateRoute";
import LookDonor from "../Component/Pages/LookDonor/LookDonor";
import Requests from "../Component/Pages/Requests/Requests";
import DonateRequest from "../Component/Pages/DonateRequest/DonateRequest";
import SingleDonor from "../Component/Pages/LookDonor/SingleDonor";
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
        },
        {
          path:"/UserProfile",
          element:<PrivateRoute><UserProfile></UserProfile></PrivateRoute>,
          // loader:({params})=>fetch(`http://localhost:5173//${params.id}`)
        },
        {
          path:"/lookDonor",
          element:<PrivateRoute><LookDonor></LookDonor></PrivateRoute>,
          loader:()=> fetch('http://localhost:5000/totalUsers')
        },
        {
          path:"/singleDonor/:id",
          element:<PrivateRoute><SingleDonor></SingleDonor></PrivateRoute>,
          loader:({params})=>fetch(`http://localhost:5000/users/${params.id}`)
        },
        {
          path:"/request",
          element:<PrivateRoute><Requests></Requests></PrivateRoute>
        },
        {
          path:"/donateRequest",
          element: <PrivateRoute><DonateRequest></DonateRequest></PrivateRoute>
        }
      ]
    },
  ]);
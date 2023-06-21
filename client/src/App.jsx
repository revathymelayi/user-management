import "./App.css";
import React, { useEffect, useState } from "react";
import SignupPage from "./Pages/SignUp";
import LoginPage from "./Pages/Login";
import HeaderBar from "./Pages/Header";
import EditUserProfile from "./Pages/EditUserProfile/EditUserProfile";
import EditProfile from "./Pages/EditProfile/EditProfile";
import UsersList from "./Pages/UsersList/UsersList";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./Services/ProtectedRoutes";

import axios from "./config/axios";
import Cookies from "js-cookie";
import { setUserDetailsSlice } from "./redux-toolkit/userDetailsReducer";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./Pages/Home/Home";
 
function App() {
  const dispatch = useDispatch();
  const [datas, setdata] = useState();
  const isAuth = Cookies.get("token");
  const {data} = useSelector((state) => state.user.userInfo);
  const isAdmin = data?.user?.isAdmin;

  

  useEffect(() => {
    setdata(data);
  }, [data]);
  const getData = async () => {
    try {
      const data = await axios.get("api/auth/getuserdata");
      console.log(data.data.isAdmin);
      dispatch(setUserDetailsSlice(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isAuth && getData();
  }, []);
  return (
    <Routes>
      <Route
        path="*"
        element={
          <ProtectedRoutes>
            <LoginPage />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/signup"
        element={
          <ProtectedRoutes>
            <SignupPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedRoutes>
            <LoginPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <HeaderBar />
          </ProtectedRoutes>
        }
      >
        <Route index element={<HomePage />} />
        <Route
          path="/edit/profile/:userId"
          element={!isAdmin ? <EditProfile /> : <Navigate to="/" />}
        />
        
        <Route
          path="/admin/edit/user/:userId"
          element={isAdmin ? <EditUserProfile /> : <Navigate to="/"  />}
        />
         <Route
          path="/add/user"
          element={isAdmin ? <UsersList /> : <Navigate to="/"  />}
        />
      </Route>
    </Routes>
  );
}

export default App;

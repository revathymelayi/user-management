import React, { useEffect, useState } from "react";
import AdminHome from "../Admin/AdminHome";
import UserHome from "../User/UserHome";
import "./Home.css";
import { useSelector } from "react-redux";

function Home() {
  const [userInfo, setData] = useState({});
  const data = useSelector((state) => state.user.userInfo);
  console.log(data.data.user.isAdmin);
  useEffect(() => {
    setData(data);
  }, [data, data.data.user.isAdmin]);
  return (
    <>
      {data.data.user.isAdmin === true ? (
        <AdminHome />
      ) : data.data.user.isAdmin === false ? (
        <UserHome />
      ) : (
        ""
      )}
    </>
  );
}

export default Home;

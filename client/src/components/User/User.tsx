//IMPROTS//
import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";

//Components//
import Nav from "../Nav";

//API setup
const api = axios.create({
  baseURL: "http://localhost:5000/user",
});

function User() {
  useEffect(() => {
    api.get("/").then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export default User;

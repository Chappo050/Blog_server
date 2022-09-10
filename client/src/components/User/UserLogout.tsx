//IMPROTS//
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


//API setup
const api = axios.create({
  baseURL: "http://localhost:5000/user/logout",
  withCredentials: true,
});

interface ErrorMessage {
  name: String;
  message: String;
}

const defaultErrorMessage: ErrorMessage[] = [];

function UserLogin() {

  let navigate = useNavigate();


  useEffect(() => {
    api.get('')
    setTimeout(function() {
  
      navigate('/')
    }, 2000);
  }, []);



  return (
    <div>
      <div className="text-whitefont-bold text-center m-10 text-2xl">
        Logout Successful. Redirecting.
      </div>
    </div>
  );
}

export default UserLogin;

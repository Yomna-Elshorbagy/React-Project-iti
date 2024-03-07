
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import LoaderComponent from "../Loader/loader";

export default function Profile() {
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [age, setAge] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const encodedToken = localStorage.getItem("token");
        const decodedToken = jwtDecode(encodedToken);
        const userId = decodedToken.id;
        console.log(decodedToken.id)

        const response = await fetch(`https://yomnaelshorbagy.onrender.com/user/${userId}`);
        const userData = await response.json();
        console.log(userData)

        setUserName(userData.user.userName);
        setEmail(userData.user.email);
        setAge(userData.user.age);
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <>
      <h1
        className="text-main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {userName ? `Hello ${userName} &&

        Email is: ${email} &&

        age is: ${age}` : <LoaderComponent />}
      </h1>
    </>
  );
}

// import { createContext, useState } from "react"
// import { jwtDecode } from "jwt-decode";


// export const tokeContext = createContext();

// export default function TokenContextProvider(props) {

//   let [token, setToken] = useState(null);

//   function saveUserData() {
//     let encodedToken = localStorage.getItem('token');
//     let decodedToken = jwtDecode(encodedToken);
//     console.log(decodedToken);
//     setToken(decodedToken);
//   }

//   const contextValue = {
//     token,
//     setToken,
//     saveUserData,
//   };
  
//   return (
//     <tokeContext.Provider value={contextValue}>
//       {props.children}
//     </tokeContext.Provider>
//   );
// }
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const tokeContext = createContext();

export default function TokenContextProvider(props) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setToken(decodedToken);
    }
  }, []);

  const contextValue = {
    token,
    setToken,
  };

  return (
    <tokeContext.Provider value={contextValue}>
      {props.children}
    </tokeContext.Provider>
  );
}

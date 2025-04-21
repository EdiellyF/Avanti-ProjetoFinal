import { createContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = (({children}) => {
   
    const [token, setToken] = useState(localStorage.getItem("token"));

    const logar = (userData) => {
        setToken(userData);

     
        console.log(userData);
        
        localStorage.setItem("token", userData);
    }

    return (
        <AuthContext.Provider value={{  logar }}>
          {children}
        </AuthContext.Provider>
      );
});


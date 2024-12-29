import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);

    const login = (email) => {
        if (email === "admin@gmail.com") {
            setUserRole("admin");
        } else {
            setUserRole("user");
        }
    };

    return (
        <AuthContext.Provider value={{ userRole, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

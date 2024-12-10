import React, { createContext,useContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Lấy thông tin user từ localStorage
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); 
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user"); 
    };
    
    const getUser = () => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout, getUser }}>
            {children}
        </UserContext.Provider>
    );
};


// Tạo hook sử dụng context để lấy và cập nhật dữ liệu người dùng
export const useUser = () => {
  return useContext(UserContext);
};

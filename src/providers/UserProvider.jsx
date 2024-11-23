import React, { createContext, useEffect, useState } from "react";
import { getAccount } from "../api";
import Loading from "../tools/Loading";
import { UserContext } from "./Contexts";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getUser(token) {
      setLoadingUser(true);
      try {
        const data = await getAccount(token);
        setUser(data);
      } catch (error) {
        console.error(error.message);
        removeUser();
      }
      setLoadingUser(false);
    }

    if (token) {
      getUser(token);
    } else {
      setLoadingUser(false);
    }
  }, []);

  const addUser = (user, token) => {
    localStorage.setItem("token", token);
    setUser(user);
  };

  const removeUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, addUser, removeUser }}>
      {loadingUser ? (
        <div className="h-screen flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export default UserProvider;

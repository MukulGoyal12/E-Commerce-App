import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AlertContext } from "./Contexts";

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({});

  const addAlert = (message, type) => {
    const id = uuidv4();
    setAlert((prev) => {
      prev[id] = { id, message, type };
      return { ...prev };
    });
    setTimeout(() => {
      removeAlert(id);
    }, 3000);
  };

  const removeAlert = (id) => {
    setAlert((prev) => {
      delete prev[id];
      return { ...prev };
    });
  };

  return (
    <AlertContext.Provider value={{ alert, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;

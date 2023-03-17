import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const contextProvider = createContext();

function Context({ children }) {
  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get("/profile");
      setUser(user.data);
      setReady(true);
    };
    getUser();
  }, []);

  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <contextProvider.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </contextProvider.Provider>
  );
}

export default Context;

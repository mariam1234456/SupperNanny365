import React, { createContext, useContext, useEffect, useState } from "react";

const GenderContext = createContext();
export const useGender = () => useContext(GenderContext);

export const GenderProvider = ({ children }) => {
  const [gender, setGender] = useState(() => {
    const baby = JSON.parse(localStorage.getItem("baby"));
    return baby?.gender || "";
  });

  useEffect(() => {
    const baby = JSON.parse(localStorage.getItem("baby")) || {};
    baby.gender = gender;
    localStorage.setItem("baby", JSON.stringify(baby));
  }, [gender]);

  return (
    <GenderContext.Provider value={{ gender, setGender }}>
      {children}
    </GenderContext.Provider>
  );
};

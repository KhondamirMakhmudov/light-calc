// context/ResponseContext.js
// context/LightCalculatorContext.js
import React, { createContext, useState } from "react";

export const LightCalculatorContext = createContext();

export const LightCalculatorProvider = ({ children }) => {
  const [result, setResult] = useState(null);

  return (
    <LightCalculatorContext.Provider value={{ result, setResult }}>
      {children}
    </LightCalculatorContext.Provider>
  );
};

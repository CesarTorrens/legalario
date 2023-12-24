import { createContext, useState } from "react";

export const StepsContext = createContext();

export const StepsProvider = ({ children }) => {
  const [stepsCount, setStepsCount] = useState(1);
  const [data, setData] = useState({
    signatureValue: "",
    pdfValue: "",
    photoValue: "",
  });
  const TOTAL_STEPS = 3;
  const handleCount = () => {
    setStepsCount(stepsCount + 1);
  };
  const resetCount = () => {
    setStepsCount(1);
  };

  const saveData = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  return (
    <StepsContext.Provider
      value={{
        data: data,
        saveData: saveData,
        value: stepsCount,
        handleCount: handleCount,
        resetCount: resetCount,
        totalSteps: TOTAL_STEPS,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};

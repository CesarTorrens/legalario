import { createContext, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export const StepsContext = createContext();

export const StepsProvider = ({ children }) => {
  const [stepsCount, setStepsCount] = useState(1);
  const [permission, setPermission] = useState(false);

  const router = useRouter();

  const [data, setData] = useState({
    signatureValue: "",
    pdfValue: "",
    checkPolitiesValue: false,
    photoValue: "",
  });
  const TOTAL_STEPS = 3;

  const handlePermission = () => {
    setPermission(true);
  };

  const handleCount = () => {
    setStepsCount(stepsCount + 1);
  };
  const resetCount = () => {
    setStepsCount(1);
  };
  const shouldRenderStep2 = useMemo(() => {
    return data.pdfValue && data.signatureValue && data.checkPolitiesValue;
  }, [data]);
  const shouldRenderStep3 = useMemo(() => {
    return shouldRenderStep2 && data.photoValue;
  }, [data]);

  const saveData = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  const clearData = () => {
    setData({
      signatureValue: "",
      pdfValue: "",
      checkPolitiesValue: false,
      photoValue: "",
    });
  };

  useEffect(() => {
    console.log(data);
    if (
      data.photoValue &&
      data.pdfValue &&
      data.signatureValue &&
      data.checkPolitiesValue
    ) {
      setStepsCount(3);
      router.push("/Step-3");
      return;
    }
    if (data.pdfValue && data.signatureValue && data.checkPolitiesValue) {
      setStepsCount(2);
      router.push("/Step-2");
      return;
    }
    router.push("/");
  }, [data]);

  return (
    <StepsContext.Provider
      value={{
        data: data,
        saveData: saveData,
        clearData: clearData,
        value: stepsCount,
        handleCount: handleCount,
        resetCount: resetCount,
        totalSteps: TOTAL_STEPS,
        shouldRenderStep2: shouldRenderStep2,
        shouldRenderStep3: shouldRenderStep3,
        permission: permission,
        handlePermission: handlePermission,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};

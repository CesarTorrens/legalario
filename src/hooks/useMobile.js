import { useState, useEffect } from "react";

export const useMobile = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
  
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
  
    useEffect(() => {
      window.addEventListener("resize", handleResize);
    }, [width, height]);
  
    return { height, width };
  };
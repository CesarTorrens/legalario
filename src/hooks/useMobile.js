"use client";
import { useState, useEffect } from "react";

export const useMobile = () => {
  const [width, setWidth] = useState(window?.innerWidth);
  const [height, setHeight] = useState(window?.innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { height, width };
};

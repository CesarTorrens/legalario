"use client";
import { useState, useEffect } from "react";

export const useMobile = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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

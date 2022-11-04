import { useEffect, useState } from "react";

const useWindowDimension = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [isMobile, setIsMobile] = useState(false);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    if (window.innerWidth < 769) setIsMobile(true);
    else setIsMobile(false);
  };
  useEffect(() => {
    if (window.innerWidth < 769) setIsMobile(true);
    else setIsMobile(false);
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return { width, height, isMobile };
};

export default useWindowDimension;

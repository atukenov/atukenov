"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const sections = [
  {
    id: 1,
    path: "/",
  },
  {
    id: 2,
    path: "/services",
  },
  {
    id: 3,
    path: "/resume",
  },
  {
    id: 4,
    path: "/work",
  },
  {
    id: 5,
    path: "/contact",
  },
];

const FullPageScroll = () => {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    console.log("here");
    const handleScroll = (event: WheelEvent) => {
      console.log(event.deltaY, isScrolling);
      if (isScrolling.current) return;

      if (event.deltaY > 0) {
        //Scroll Down
        if (currentSection < sections.length - 1) {
          setCurrentSection((prev) => prev + 1);
          router.push(sections[currentSection + 1].path);
        }
      } else {
        //Scroll Up
        if (currentSection > 0) {
          setCurrentSection((prev) => prev - 1);
          router.push(sections[currentSection - 1].path);
        }
      }

      isScrolling.current = true;
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000); // Adjust the timeout as needed
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentSection, router]);

  return null;
};

export default FullPageScroll;

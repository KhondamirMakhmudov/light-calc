"use client";
import Image from "next/image";
import { useTheme } from "next-themes";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const DarkModeButton = () => {
  const { theme, setTheme } = useTheme("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="">
      <motion.button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: theme === "light" ? -10 : 10 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className=" rounded-full bg-transparent dark:bg-gray-800"
      >
        {theme === "light" ? (
          <Image src={"/images/dark.png"} alt="dark" width={50} height={50} />
        ) : (
          <Image src={"/images/light.png"} alt="light" width={50} height={50} />
        )}
      </motion.button>
    </div>
  );
};

export default DarkModeButton;

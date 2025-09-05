import React, { useEffect, useState } from "react";
import { motion} from "framer-motion";

interface NavigatorProps {
  reflist: React.RefObject<HTMLElement | null>[];
  iconlist?: React.ReactNode[];
}

const Navigator: React.FC<NavigatorProps> = ({ reflist, iconlist = [] }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const positions = reflist.map(ref => {
        if (!ref.current) return Infinity;
        const rect = ref.current.getBoundingClientRect();
        return Math.abs(rect.top);
      });

      const minIndex = positions.indexOf(Math.min(...positions));
      setActiveIndex(minIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, [reflist]);

  const handleClick = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-4 left-4 flex flex-col gap-4 z-50 bg-[#3e3e3f] p-2 rounded-full backdrop-blur-sm">
      {reflist.map((ref, i) => (
        <motion.button
          key={i}
          onClick={() => handleClick(ref)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={`relative w-10 h-10 rounded-full flex items-center bg-[#2d2d2e] justify-center shadow-md transition-colors overflow-hidden`}
        >
            {activeIndex === i && (
              <motion.div
                layoutId="activeHighlight"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                }}
                className="absolute inset-0 rounded-full bg-[var(--color-lemon-chiffon-200)] z-0"
              />
            )}

          <div className="relative z-10 text-[var(--gunmetal)]">
            {iconlist[i] ? iconlist[i] : <div className="w-4 h-4 bg-gray-400 rounded-full" />}
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default Navigator;

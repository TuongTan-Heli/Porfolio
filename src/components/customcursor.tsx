import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Motion values for smooth trailing
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const trailX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const trailY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    cursorX.set(mousePos.x);
    cursorY.set(mousePos.y);
  }, [mousePos, cursorX, cursorY]);

  return (
    <>
      {/* Small solid dot */}
      <motion.div
        className="fixed w-2 h-2 white rounded-full pointer-events-none z-50"
        style={{
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
{/* Radiating ring 1 */}
      <motion.div
        className="fixed w-5 h-5 rounded-full pointer-events-none z-40 bg-lime-400 opacity-30"
        style={{
          left: trailX,
          top: trailY,
          translateX: "-50%",
          translateY: "-50%",
          filter: "blur(8px)",
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <motion.div
        className="fixed w-3 h-3 rounded-full pointer-events-none z-40 bg-black opacity-20"
        style={{
          left: trailX,
          top: trailY,
          translateX: "-50%",
          translateY: "-50%",
          filter: "sepia-10", // smooth glow effect
        }}
      />
    </>
  );
}

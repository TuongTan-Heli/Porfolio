import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

type LoopMarqueeProps = {
  items: React.ReactNode[];   
  speedSec?: number;          
  gapClass?: string;          
  itemWidthClass?: string;   
};

export default function LoopMarquee({
  items,
  speedSec = 10,
  gapClass = "gap-6",
  itemWidthClass = "w-64"     
}: LoopMarqueeProps) {
  const doubled = [...items, ...items];

  const controls = useAnimation();

  const startLoop = () =>
    controls.start({
      x: ["0%", "-50%"],            
      transition: {
        duration: speedSec,
        ease: "linear",
        repeat: Infinity
      }
    });

  useEffect(() => {
    startLoop();
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => controls.stop()}
      onMouseLeave={() => startLoop()}
    >
      <motion.div
        className={`flex ${gapClass}`}
        animate={controls}
        style={{ width: "max-content" }}
      >
        {doubled.map((node, i) => (
          <div key={i} className={`shrink-0 ${itemWidthClass}`}>
            {node}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

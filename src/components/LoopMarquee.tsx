import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

type LoopMarqueeProps = {
  items: React.ReactNode[];
  speedSec?: number;
};

export default function LoopMarquee({
  items,
  speedSec = 10
}: LoopMarqueeProps) {
  const doubled = [...items, ...items, ...items, ...items];
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();

  const startLoop = () => {
    if (!isDragging) {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          duration: speedSec,
          ease: "linear",
          repeat: Infinity
        }
      });
    }
  }


  useEffect(() => {
    startLoop();
  }, [isDragging, speedSec, controls]);

  return (
    <div
      className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none">
      <motion.div
        className={`flex `}
        animate={controls}
        style={{ width: "max-content"}}
        drag="x"
        dragConstraints={{ left: -5000, right: 5000 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        {doubled.map((node, i) => (
          <div key={i} className={`shrink-0 mr-6`}>
            {node}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import CustomCursor from "./components/customcursor";
import expData from './data/exp.json';
import './style/Style.css';
import ScrollNotice from "./components/scrollNotice";
import { Analytics } from '@vercel/analytics/react';
import ExperienceCarousel from "./components/ExperienceCarousel";


export default function Exp() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bgColor = useTransform(scrollYProgress, [0, 1], ["#151517", "#484c69"]);


  return (
    <motion.div className="w-full max-w-full overflow-x-hidden" style={{ backgroundColor: bgColor }} ref={containerRef}>
      <Analytics />
      <Header />
      <ScrollNotice scrollYProgress={useTransform(scrollYProgress, [0, 1], [0, 100])} />
      <CustomCursor />
      <section className="flex items-center justify-center h-screen">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold
                     bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-600
                     bg-clip-text text-transparent
                     bg-[length:200%_200%]
                     animate-[gradient_6s_ease_infinite]
                     text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}>
          My working experience
        </motion.h1>
      </section>

      <Page experiences={expData.experiences} />

      <Footer />
    </motion.div>
  );
}

function Page({ experiences }: { experiences: any[] }) {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start 70%", "end 30%"],
  });
  const [showControls, setShowControls] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Show controls only when the carousel section is roughly in view
    const v = latest;
    setShowControls(v > 0 && v < 1);
  });


  

  return (
    <motion.div
      ref={pageRef}
      className="relative max-w-full min-h-svh overflow-visible"
    >
      <div className="sticky top-0 flex min-h-svh max-w-full items-center justify-center overflow-visible px-4 py-8">
        <div className="mx-auto overflow-visible">
          <ExperienceCarousel
            items={experiences}
            showControls={showControls}
          />
        </div>
      </div>
    </motion.div>
  );
}

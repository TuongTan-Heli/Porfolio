import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import CustomCursor from "./components/customcursor";
import expData from './data/exp.json';
import { iconMap } from './components/icons';
import './style/Style.css';
import ScrollNotice from "./components/scrollNotice";

const PAGE_SIZE = 4;
const PAGE_SIZE_MOBILE = 2;

export default function Exp() {
  const [isMobile, setIsMobile] = useState<boolean>(() => window.innerWidth <= 768);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pageSize = isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE;

  const pages = [];
  for (let i = 0; i < expData.experiences.length; i += pageSize) {
    pages.push(expData.experiences.slice(i, i + pageSize));
  }

  const bgColor = useTransform(scrollYProgress, [0, 1], ["#151517", "#484c69"]);


  return (
    <motion.div style={{ backgroundColor: bgColor }} ref={containerRef}>
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

      {pages.map((pageExps, pageIndex) => (
        <Page key={pageIndex} experiences={pageExps} />
      ))}

      <Footer />
    </motion.div>
  );
}

function Page({ experiences }: { experiences: any[] }) {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });


  function ExperienceItem({ exp, scrollYProgress, start, end }: { exp: any; scrollYProgress: any; start: any; end: any }) {
    const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

    return (
      <motion.div
        className="flex flex-col rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        style={{ opacity: opacity }}>
        <div className="bg-gradient-to-br from-purple-700/70 via-indigo-500/60 to-slate-700/80 p-4">
          <h2 className="text-lg md:text-xl font-semibold text-white">{exp.name}</h2>
          <span className="text-xs md:text-sm">{exp.time}</span>
        </div>

        <div className="flex flex-col flex-1 p-4 gap-3 overflow-y-auto">
          <p className="text-sm md:text-base leading-relaxed line-clamp-3">{exp.description}</p>

          <div className="flex flex-col gap-1">
            {exp.work.map((w: any, idx: number) => (
              <div key={idx} className="text-xs md:text-sm flex items-start">
                <span className="mr-2">•</span> {w}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-start gap-2 pt-2">
            {exp.stack.map((tech: any, idx: number) => {
              const Icon = iconMap[tech.logo];
              return (
                <div key={idx} className="group relative">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 hover:text-indigo-300 transition-colors duration-200 group-hover:scale-125" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block px-2 py-1 text-xs rounded-md whitespace-nowrap bg-black/70 text-white">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div ref={pageRef} className="h-[200vh] relative container mx-auto">
      <div className="sticky top-0 min-h-[100vh] grid grid-cols-1 md:grid-cols-2 gap-4 place-content-center p-4">
        {experiences.map((exp, i) => (
          <ExperienceItem
            key={i}
            exp={exp}
            start={i / experiences.length}
            end={(i + 1) / experiences.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </motion.div>
  );
}

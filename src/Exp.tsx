import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import CustomCursor from "./components/customcursor";
import expData from './data/exp.json';
import { iconMap } from './components/icons';
import './style/Style.css';
import ScrollNotice from "./components/scrollNotice";
import { FaGithub } from "react-icons/fa";
import { Analytics } from '@vercel/analytics/react';
import { CiLink } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import posts from './data/posts.json'
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


  function ExperienceItem({ exp }: { exp: any }) {
    const navigate = useNavigate();
    return (
      <div>
        <span className="block text-center text-lg font-bold mb-2">{exp.time}</span>
        <div
          className="flex flex-col rounded-2xl bg-white/10 backdrop-blur-sm shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">

          <div className="bg-gradient-to-br from-purple-700/70 via-indigo-500/60 to-slate-700/80 p-4">
            <h2 className="text-lg md:text-xl font-semibold text-white">{exp.name}</h2>
            <div className="absolute top-4 right-4 flex gap-2">
              {exp.git && (
                <a
                  href={exp.git}
                  className="flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaGithub />
                </a>
              )}
              {exp.link && posts.posts.find((x) => x.title === exp.link) && (
                <a
                  onClick={() => {
                    navigate("/story", {
                      state: { post: posts.posts.find((x) => x.title === exp.link) },
                    });
                    window.scrollTo(0, 0)
                  }
                  }
                  className="flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer">
                  <CiLink />
                </a>
              )}
            </div>

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
        </div>
      </div>

    );
  }
  return (
    <motion.div
      ref={pageRef}
      className="relative w-full max-w-full min-h-svh overflow-visible"
    >
      <div className="sticky top-0 flex min-h-svh w-full max-w-full items-center justify-center overflow-visible px-4 py-8">
        <div className="w-full max-w-2xl mx-auto overflow-visible">
          <ExperienceCarousel
            items={experiences}
            renderItem={(exp) => <ExperienceItem exp={exp} />}
            showControls={showControls}
          />
        </div>
      </div>
    </motion.div>
  );
}

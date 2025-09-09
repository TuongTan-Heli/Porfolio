
import Footer from './components/footer';
import Header from './components/header';
import TypeWriter from './components/TypeWriter';
import './style/App.css';
import React, { useRef } from 'react';
import CustomCursor from './components/customcursor';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion';
import Navigator from './components/navigator';
import profilePic from './assets/TQT-01.jpeg'
import techData from './data/tech.json';
import introData from './data/intro.json';
import certifications from './data/cert.json';
import { iconMap } from './components/icons'
import { FaCode, FaUserCircle } from 'react-icons/fa';
import { GrCertificate } from 'react-icons/gr';

const About = () => {
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const EducationContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const aboutContainerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const isInStackView = useInView(stackContainerRef);
  const isInEducationView = useInView(EducationContainerRef);
  const isInTextView = useInView(textContainerRef);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: containerProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: educationProgress } = useScroll({
    target: EducationContainerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to opacity for each section
  const educationOpacity = useTransform(educationProgress, [0.2, 0.5], [0, 1]);
  const certificationOpacity = useTransform(educationProgress, [0.6, 0.7], [0, 1]);

  // Map scroll progress to different colors for each section
  const aboutHeight = aboutContainerRef.current ? aboutContainerRef.current.offsetHeight : 0;
  const dividerHeight = dividerRef.current ? dividerRef.current.offsetHeight : 0;

  const stackHeight = stackContainerRef.current ? stackContainerRef.current.offsetHeight : 0;
  const textHeight = textContainerRef.current ? textContainerRef.current.offsetHeight : 0;
  const educationHeight = EducationContainerRef.current ? EducationContainerRef.current.offsetHeight : 0;
  const containerHeight = containerRef.current ? containerRef.current.offsetHeight : 0;
  const bgColor = useTransform(containerProgress, [0, (aboutHeight + dividerHeight + stackHeight) / containerHeight, (aboutHeight + dividerHeight + stackHeight + textHeight + educationHeight) / containerHeight, 1], [
    "#151517",
    "#292d38",
    "#484c69",
    "#484c69"
  ]);

  const verticalLineHeight = useTransform(educationProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 0.3, 0.3, 0.6, 0.6, 1]);
  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 1,
      },
    },
  };


  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  return (
    <motion.div style={{ backgroundColor: bgColor,background:'#151517' }} ref={containerRef}>
      <Navigator
        reflist={[aboutContainerRef, stackContainerRef, EducationContainerRef]}
        iconlist={[
          <FaUserCircle />,
          <FaCode />,
          <GrCertificate />
        ]}
      />
      <Header />
      <div className="container mx-auto p-4 h-screen items-center gap-4 grid grid-cols-1 md:grid-cols-3" ref={aboutContainerRef}>
        <img
          src={profilePic}
          alt="Tuong-Tan"
          className="d-block col-span-1 rounded-r-full"
        />
        <div className="col-span-1 md:col-span-2 p-4">
          <TypeWriter
            text="<Greeting>Hello, World! I'm Tuong</Greeting>"
            typeSpeed={120}
            pauseDuration={5000}
            className="text-lg md:text-xl lg:text-3xl font-bold"
          />
          <br />
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center">
              <motion.span
                className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <span className="text-sm font-medium text-green-500">
              status: Open to work
            </span>
          </div>
          <br />
          <div>
            {introData.blocks.map((block, i) => (
              <div key={i}>
                {React.createElement(block.tag, { className: block.class }, block.content)}
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 my-8 container mx-auto" ref={dividerRef}></div>
      <div className="container mx-auto p-4 min-h-screen items-center" ref={stackContainerRef}>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">My skills</h1>

        {techData.blocks.map((block, i) => (
          <div key={i}>
            {React.createElement(block.tag, { className: block.class }, block.content)}
          </div>))}
        <br />
        <div className="container mx-auto p-4 min-h-screen items-center gap-10 grid grid-cols-1 md:grid-cols-3 md:gap-4">
          <motion.div
            initial="hidden"
            animate={isInStackView ? "show" : "hidden"}
            variants={containerVariants}
            className="gap-5 flex flex-col">
            {techData.focuses.map((focus, i) => (
              <motion.div key={i} variants={itemVariants} className="text-2xl font-bold">
                • {focus}   
              </motion.div>
            ))}
          </motion.div>
          <div className='col-span-1 md:col-span-2'>
            <AnimatePresence>
              {isInStackView && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  {techData.stack.map((tech, i) => {
                    const Icon = iconMap[tech.logo]; // get actual component
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 2 }}
                        className="
                        flex flex-col items-center justify-center
                        text-center gap-2
                        rounded-2xl p-4
                        bg-gradient-to-br from-purple-700/70 to-indigo-500/60
                        backdrop-blur-sm
                        shadow-xl hover:shadow-2xl       
                        border-2 border-gray-400 dark:border-gray-500 
                        hover:scale-110 transition-transform
                        break-words
                        overflow-hidden
                        min-w-[120px] max-w-[160px]"

                      >
                        {Icon && <Icon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />}
                        <span className="text-sm md:text-base break-words">{tech.name}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4 min-h-screen flex" ref={textContainerRef}>
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-6 text-center flex flex-col items-center justify-center "
          initial={{ opacity: 0, y: 0 }}
          animate={isInTextView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
        >
          Yet, I always eager to tackle new challenges and learn new technologies.
        </motion.h1>
      </div>
      <div
        ref={EducationContainerRef}
        className="container mx-auto p-4 min-h-[600vh]"
      >
        {isInEducationView && (
          <motion.div
            style={{ scaleY: verticalLineHeight, originY: 0 }}
            className="sticky left-4 top-0 w-2 h-[100vh] bg-white rounded"
          />
        )}
        <div className="sticky top-0 left-0 w-full min-h-[100vh] grid grid-rows-10 gap-4 p-8 md:p-16">
          {/* Header: 2 rows */}
          <h1 className="text-3xl md:text-4xl font-bold text-center row-span-2">
            Education & Certifications
          </h1>

          {/* Education: 3 rows */}
          <motion.div className="flex flex-col gap-4 row-span-3"
            style={{ opacity: educationOpacity }}>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold">University Of Greenwich (Viet Nam)</h2>
              <h3 className="text-xl italic">Bachelor of Computer Science</h3>
              <p className="text-lg">2019 - 2022</p>
            </div>
          </motion.div>

          {/* Certifications: 5 rows */}
          <motion.div className="flex flex-col gap-4 row-span-5"
            style={{ opacity: certificationOpacity }}>
            {certifications.certs.map((cert, i) => (
              <div className="flex flex-col gap-2" key={i}>
                <h2 className="font-semibold">{cert.name}</h2>
                <p className="italic">{cert.time}</p>
                <p>{cert.description}</p>
              </div>
            ))}
          </motion.div>
        </div>


      </div>
      <Footer />
      <CustomCursor />
    </motion.div >

  )
}
export default About;
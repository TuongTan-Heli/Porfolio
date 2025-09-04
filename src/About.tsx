
import Footer from './components/footer';
import Header from './components/header';
import TypeWriter from './components/TypeWriter';
import './style/App.css';
import introData from './data/intro.json';
import React, { useRef } from 'react';
import CustomCursor from './components/customcursor';
import { motion, useScroll, useTransform } from 'framer-motion';
import profilePic from './assets/TQT-01.jpeg'
const About = () => {
  const stackContainerRef = useRef(null);
  const { scrollYProgress: progress1 } = useScroll({
    // target: stackContainerRef,
    // offset: ["start end", "end start"]
  });
  const bgColor = useTransform(progress1, [0, 1], [
    "#231942",
    "#f2efc7",
  ]);
  return (

    <motion.div style={{ backgroundColor: bgColor }}>
      <Header />
      <div className="container mx-auto columns-2 p-4">
        <img src={profilePic} alt="Tuong-Tan" className="d-block" />
        <div className='container mx-auto p-4'>
          <TypeWriter text="<Greeting>Hello, World! I'm Tuong</Greeting>" typeSpeed={120} pauseDuration={5000} className='text-sm md:text-xl lg:text-3xl font-bold'></TypeWriter>
          <div>
            {introData.blocks.map((block, i) =>
              <div key={i}>
                {React.createElement(block.tag, { key: i, className: block.class }, block.content)}
                <br />
              </div>
            )}
          </div>
        </div>

      </div>
      <div className="container mx-auto p-4" ref={stackContainerRef}>
        <img src={profilePic} alt="Tuong-Tan" className="d-block" />
      </div>
      <Footer />
      <CustomCursor />
    </motion.div>

  )
}
export default About;
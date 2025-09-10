import { motion } from 'framer-motion';
import './style/App.css';
import Header from './components/header';
import Footer from './components/footer';
import CustomCursor from './components/customcursor';
import posts from './data/posts.json'
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
const Stories = () => {
  const navigate = useNavigate();
  return (
    <motion.div className='bg-[#151517] min-h-screen'>
      <Analytics />
      <Header />
      <motion.h1
        className=" text-md md:text-2xl font-extrabold
                     bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-600
                     bg-clip-text text-transparent
                     bg-[length:200%_200%]
                     animate-[gradient_6s_ease_infinite]
                     text-center container mx-auto mt-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}>
        Coding is a continuous journey. Along the way, I’ve collected experiences, knowledge, and stories that shaped me as a developer. If you’d like to know more about my path, I’ve shared some of them here
      </motion.h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-6 items-start">
        <div className="flex flex-col rounded-2xl bg-[#1e1e21] p-4 gap-4  top-8 order-1 self-auto md:order-2 md:self-start md:sticky">
          <h3 className="text-lg font-semibold">Find me via:</h3>
          <a
            href="https://linkedin.com/in/tan-quy-tuong"
            className="flex items-center gap-2 hover:underline">
            <FaLinkedin /> Linkedin
          </a>
          <a
            href="https://github.com/TuongTan-Heli"
            className="flex items-center gap-2 hover:underline">
            <FaGithub /> Github
          </a>
          <a
            href="mailto:tanquytuong@gmail.com"
            className="flex items-center gap-2 overflow text-ellipsis hover:underline">
            <CiMail />
            <span className="overflow-hidden whitespace-nowrap text-ellipsis">{'tanquytuong@gmail.com'}</span>
          </a>
        </div>
        <div className="md:col-span-2 space-y-6 order-2 md:order-1">
          {posts.posts.filter(x=>x.status === "published").map((post, i) => (
            <div
              onClick={() => navigate("/story", { state: { post } })}
              key={i}
              className="group relative rounded-2xl bg-[#1e1e21] p-6 shadow-md border border-gray-800 transition overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-800/40 via-purple-800/40 to-pink-800/40 bg-[length:200%_200%] opacity-0 group-hover:opacity-100 group-hover:animate-[gradient-x_4s_ease_infinite]"></div>
              <div className="relative z-10">
                <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
                <p className="text-gray-300 mb-4">{post.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{post.date}</span>
                  <span className="text-indigo-400 group-hover:text-white transition cursor-pointer">
                    View more →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
      <Footer />
      <CustomCursor />
    </motion.div>
  )
}
export default Stories;
import { motion } from 'framer-motion';
import './style/App.css';
import Header from './components/header';
import Footer from './components/footer';
import CustomCursor from './components/customcursor';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

const Story = () => {
    const location = useLocation();
    const { post } = location.state || {};
    const navigate = useNavigate();

    if (!post) return <p>No post found.</p>;
    return (

        <motion.div className='bg-[#151517] min-h-screen'>
            <Header />

            <div className='container mx-auto p-6'>
                <span
                    onClick={() => navigate("/stories")}
                    className="inline-flex items-center justify-center
                        text-xl
                        w-10 h-10
                        rounded-full
                        bg-[rgba(255,255,255,0.1)]
                        hover:bg-[var(--color-hover-primary)]">
                    ←
                </span>
                <motion.h1
                    className=" text-2xl md:text-4xl font-extrabold
                     bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-600
                     bg-clip-text text-transparent
                     bg-[length:200%_200%]
                     animate-[gradient_6s_ease_infinite]
                     text-center container mx-auto"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}>
                    {post.title}
                </motion.h1>
            </div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-6 items-start">

                <div className="flex flex-col rounded-2xl bg-[#1e1e21] p-4 gap-4 sticky top-8 order-1 self-auto md:order-2 md:self-start">
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
                <div className="flex flex-col md:col-span-2 order-2 md:order-1 gap-4">
                    <h2 className='text-xl'>{post.description}</h2>
                    <span className='text-sm'>Posted on {post.date}</span>
                    {post.contentBlocks.map((block: any, i: number) => {
                        const renderBlock = () => {
                            switch (block.type) {
                                case "content":
                                    return React.createElement(
                                        block.tag,
                                        { className: block.class, key: i },
                                        block.content
                                    );
                                case "image":
                                    return React.createElement(
                                        block.tag,
                                        { className: block.class, key: i, src: block.src },
                                        block.content
                                    );
                                default:
                                    return null;
                            }
                        };

                        return renderBlock();
                    })}


                </div>
            </div>
            <Footer />
            <CustomCursor />
        </motion.div>
    )
}
export default Story;
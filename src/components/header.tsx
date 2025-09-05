import { Link } from "react-router-dom";
import '../style/App.css';
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => setIsOpen(false));
        },[]);
    return (
        <header className="bg-[transparent]">
            <div className="flex container mx-auto items-center justify-between p-2">
                <h1 className="text-2xl font-bold">Tuong Tan Developer</h1>
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}>
                    <GiHamburgerMenu />
                </button>
                <nav className="hidden md:flex">
                    <Link className="hover-bg-secondary p-4 rounded-md" to="/">About me</Link>
                    <Link className="hover-bg-secondary p-4 rounded-md" to="/experience">My working experience</Link>
                    <Link className="hover-bg-secondary p-4 rounded-md" to="/stories">My stories</Link>
                </nav>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div className='absolute w-full h-full top-0 left-0 bg-primary'
                        onScroll={() => setIsOpen(false)}
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.4 }}>

                            <nav className="flex flex-col items-center">
                                <motion.button
                                    initial={{ rotate: 360 }}
                                    animate={{ rotate: 0 }}
                                    exit={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className="self-end m-4"
                                    onClick={() => setIsOpen(false)}>
                                    <MdClose />
                                </motion.button>
                                <Link className="hover-bg-secondary p-4 rounded-md w-full text-center" to="/">About me</Link>
                                <Link className="hover-bg-secondary p-4 rounded-md w-full text-center" to="/experience">My working experience</Link>
                                <Link className="hover-bg-secondary p-4 rounded-md w-full text-center" to="/stories">My stories</Link>
                                <p className="absolute bottom-4">© {new Date().getFullYear()} Tuong Tan </p>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </header>
    );
}

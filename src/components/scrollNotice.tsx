import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollNotice() {
    const [show, setShow] = useState(false);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;

            const atTop = scrollTop === 0;
            const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

            setShow(false);
            if (timeoutId) clearTimeout(timeoutId);

            if (!atTop && !atBottom) {
                const id = setTimeout(() => setShow(true), 5000);
                setTimeoutId(id);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    return (
        <AnimatePresence>
            {show && (

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2
             bg-black/40 text-white text-sm px-4 py-2 rounded-full shadow-lg backdrop-blur-sm z-10"
                >
                    <motion.span
                        animate={{ y: [0, 6, 0 ,6 , 0] }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 1
                        }}
                        className="text-lg"
                    >
                        ⬇
                    </motion.span>
                    <span>Keep scrolling</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

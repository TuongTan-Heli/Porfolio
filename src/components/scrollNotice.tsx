import { useState } from "react";
import { motion, AnimatePresence, MotionValue, useMotionValueEvent } from "framer-motion";
type ScrollNoticeProps = {
    scrollYProgress: MotionValue<number>;
};
export default function ScrollNotice({ scrollYProgress }: ScrollNoticeProps) {
    const [show, setShow] = useState(false);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
    // const [progress, setProgress] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const progressValue = latest
        // setProgress(progressValue);

        const atTop = progressValue === 0;
        const atBottom = progressValue >= 95;

        setShow(false);
        if (timeoutId) clearTimeout(timeoutId);

        if (!atTop && !atBottom) {
            const id = setTimeout(() => setShow(true), 5000);
            setTimeoutId(id);
        }
    });
    return (
        <AnimatePresence>
            {show && (

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2
             bg-black/40 text-white text-sm px-4 py-2 rounded-full shadow-lg backdrop-blur-sm z-10">
                    <motion.span
                        animate={{ y: [0, 6, 0, 6, 0] }}
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

import { AnimatePresence, motion } from "framer-motion";
import { TbBrandGithub, TbExternalLink } from "react-icons/tb";
import { iconMap } from "./icons";

type ExperienceItemProps = {
    exp: any;
    isActive: boolean;
    index: number;
    direction: number;

    setActiveIndex: (index: number) => void;

    goPrev: () => void;
    goNext: () => void;
};

export default function ExperienceItem({ exp, isActive, index, direction, setActiveIndex, goPrev, goNext }: ExperienceItemProps) {

    return (
        <motion.article
            key={`${exp.id}-${exp.name}-${index}`}
            layout
            initial={false}
            animate={{
                // width: isActive ? "100%" : "40px", flexGrow: isActive ? 1 : 0,
                // flexShrink: 0,
                width: isActive ? "auto" : "40px",
                flex: isActive ? "1 1 0%" : "0 0 36px",
                // flexBasis: isActive ? "0%" : "40px",
            }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 25,
            }}
            drag={isActive ? "x" : false}
            dragConstraints={{
                left: 0,
                right: 0,
            }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
                const swipeThreshold = 50;

                if (info.offset.x < -swipeThreshold) {
                    goNext();
                }

                if (info.offset.x > swipeThreshold) {
                    goPrev();
                }
            }}
            className={`relative overflow-hidden rounded-2xl border w-auto
                ${isActive
                    ? "border-neutral-700 bg-neutral-900"
                    : "hidden md:flex  border-neutral-800 bg-neutral-950"
                }
              `}
        >

            {/* INACTIVE  */}

            {!isActive && (
                <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="
                     flex h-full w-[36px] cursor-pointer items-center justify-center transition-colors hover:bg-neutral-900"
                    aria-label={`Show ${exp.name}`}>
                    <span
                        className="whitespace-nowrap text-xs font-bold text-neutral-500 [writing-mode:vertical-rl] rotate-180">
                        {exp.name}
                    </span>
                </button>
            )}

            {/* ACTIVE EXPERIENCE */}

            {isActive && (
                <AnimatePresence mode="wait"
                    custom={direction}
                    initial={false}>
                    <motion.div
                        key={exp.name}
                        initial={{
                            opacity: 0,
                            x: direction > 0 ? 40 : -40,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        exit={{
                            opacity: 0,
                            x: direction > 0 ? -40 : 40,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: "easeOut",
                        }}
                        className="w-auto h-full max-w-2xl overflow-y-auto p-8 scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-700">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="mb-2 flex items-center gap-3">
                                <span className="text-sm font-medium text-neutral-500">
                                    {exp.time}
                                </span>

                                <span className="h-px flex-1 bg-neutral-800" />
                            </div>

                            <h2 className="text-3xl font-semibold tracking-tight text-white">
                                {exp.name}
                            </h2>

                            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                                <span className="text-lg text-neutral-300">
                                    {exp.title}
                                </span>

                                <span className="text-neutral-600">·</span>

                                <span className="text-lg text-neutral-500">
                                    {exp.company}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="mb-8 max-w-3xl text-sm leading-7 text-neutral-400">
                            {exp.description}
                        </p>

                        {/* Work */}
                        {exp.work.length > 0 && (
                            <div className="mb-8">
                                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
                                    Work
                                </h3>

                                <ul className="space-y-3">
                                    {exp.work.map((work, workIndex) => (
                                        <motion.li
                                            key={workIndex}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: 0.05 * workIndex,
                                                duration: 0.3,
                                            }}
                                            className="relative pl-5 text-sm leading-6 text-neutral-400" >
                                            <span className="absolute left-0 top-[10px] h-1.5 w-1.5 rounded-full bg-neutral-500" />
                                            {work}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Stack */}
                        {exp.stack.length > 0 && (
                            <div className="mb-8">
                                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
                                    Tech Stack
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {exp.stack.map((tech, idx) => {
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
                        )}

                        {/* Links */}
                        {(exp.link || exp.git) && (
                            <div className="flex gap-3">
                                {exp.link && (
                                    <a href={exp.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:border-neutral-500 hover:text-white">
                                        <TbExternalLink />
                                        Website
                                    </a>
                                )}

                                {exp.git && (
                                    <a href={exp.git}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:border-neutral-500 hover:text-white">
                                        <TbBrandGithub />
                                        GitHub
                                    </a>
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            )}
        </motion.article>

    );
}
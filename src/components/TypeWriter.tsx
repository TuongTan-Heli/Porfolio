import { use, useEffect, useState } from "react";

type TypeWriter = {
    text: string;
    typeSpeed?: number;
    pauseDuration?: number;
    className?: string;
};

export default function TypeWriter({
    text,
    typeSpeed = 100,
    pauseDuration = 3000,
    className = ""
}: TypeWriter) {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isTyperVisible, setIsTyperVisible] = useState(true);
    useEffect(() => {
        let timeout: number;

        if (index < text.length) {
            // Add one character at a time
            timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text.charAt(index));
                setIndex((prev) => prev + 1);
            }, typeSpeed);
        } else {
            // Reset after pause
            timeout = setTimeout(() => {
                setDisplayedText("");
                setIndex(0);
            }, pauseDuration);
        }

        return () => clearTimeout(timeout);
    }, [index, text, typeSpeed, pauseDuration]);

   useEffect(() => {
    // if (!isTyperVisible) {
      const interval = setInterval(() => {
        setIsTyperVisible((prev) => !prev);
      }, 500); // slower blink
      return () => clearInterval(interval);
  }, [isTyperVisible]);

    return (
        <div className={className}>
            {displayedText + (isTyperVisible ? "|" : " ")}
        </div>
    );

}

import '../style/App.css';
import { IoLocationSharp } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import LoopMarquee from './LoopMarquee';

export default function Footer() {
    const loopItems = [
        <p> © {new Date().getFullYear()} Tuong Tan </p>,
        <p className="flex items-center justify-center gap-2">
            <IoLocationSharp />
            <span>Sydney</span>
        </p>,
        <p className="flex gap-2">
            <a href="https://linkedin.com/in/tan-quy-tuong"><FaLinkedin /></a>
        </p>,
        <p className="flex gap-2">
            <a href="https://github.com/TuongTan-Heli"><FaGithub /></a>
        </p>,
        <p className="flex items-center justify-center gap-2">
            <CiMail />
            <a href="mailto:tanquytuong@gmail.com">tanquytuong@gmail.com</a>
        </p>,
        <p className="flex items-center justify-center gap-2">
            <a href="src\data\Tuong-Tan-CV.pdf"
                download="Tuong-Tan_CV.pdf"
                className="hover:underline flex items-center justify-center gap-2">
                <MdOutlineFileDownload /> Download my CV?
            </a>
        </p>,
        <p>|</p>

    ]
    return (
        <footer className="abosolute bottom-0 pt-4 pb-4 bg-secondary gap-2 ">
            <LoopMarquee items={loopItems} speedSec={10} gapClass="gap-15" itemWidthClass="w-auto flex items-center justify-center gap-2" />
        </footer>
    );
}

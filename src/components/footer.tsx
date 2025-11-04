import '../style/App.css';
import { IoLocationSharp } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import LoopMarquee from './LoopMarquee';
import CV from '../data/Tuong-Tan-CV.pdf'

export default function Footer() {
    const loopItems = [
        <p>© {new Date().getFullYear()} Tuong Tan</p>,

        <p className="flex items-center gap-2">
            <IoLocationSharp />
            <span>Sydney, NSW Australia</span>
        </p>,
        <p>
            <a
                href="https://linkedin.com/in/tan-quy-tuong"
                className="flex items-center gap-2">
                <FaLinkedin /> Linkedin
            </a>
        </p>,
        <p>
            <a
                href="https://github.com/TuongTan-Heli"
                className="flex items-center gap-2">
                <FaGithub /> Github
            </a>
        </p>,
        <p className="flex items-center gap-2">
            <CiMail />
            <a href="mailto:tanquytuong@gmail.com">tanquytuong@gmail.com</a>
        </p>,
        <p>
            <a
                href={CV}
                download="Tuong-Tan_CV.pdf"
                className="flex items-center gap-2 hover:underline">
                <MdOutlineFileDownload /> Download my CV?
            </a>
        </p>,
        <p>|</p>
    ]
    return (
        <footer className="abosolute bottom-0 pt-4 pb-4 bg-[transparent]">
            <LoopMarquee items={loopItems} speedSec={20}/>
        </footer>
    );
}

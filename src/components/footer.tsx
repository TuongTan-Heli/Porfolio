import '../style/App.css';
import { IoLocationSharp } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";


export default function Footer() {
    return (
        <footer className="abosolute bottom-0 pt-4 pb-4 bg-secondary gap-2 text-center grid md:grid-cols-3">
            <p> ©{new Date().getFullYear()} Tuong Tan </p>
            <p className="flex items-center justify-center gap-2">
                <IoLocationSharp />
                <span>Sydney</span>
            </p>
            <p className="hidden items-center justify-center gap-2 md:flex">
                <a href="https://linkedin.com/in/tan-quy-tuong"><FaLinkedin /></a>
            </p>
            <p className="flex items-center justify-center gap-2">
                <CiMail />
                <a href="mailto:tanquytuong@gmail.com">tanquytuong@gmail.com</a>
            </p>
            <p className="">
                <a href="../data/Tuong-Tan_CV.pdf"
                    download="Tuong-Tan_CV.pdf"
                    className="hover:underline flex items-center justify-center gap-2">
                    <MdOutlineFileDownload /> Download my CV?
                </a>
            </p>
            <p className="flex items-center justify-center gap-2 md:hidden">
                <a href="https://linkedin.com/in/tan-quy-tuong"><FaLinkedin /></a>
            </p>
            <p className="flex items-center justify-center gap-2">
                <a href="https://github.com/TuongTan-Heli"><FaGithub /></a>
            </p>
        </footer>
    );
}

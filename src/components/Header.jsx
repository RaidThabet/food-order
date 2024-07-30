// import headerLogo from "../assets/headerLogo.png";
import Navbar from "./Navbar";

export default function Header() {
    return (
        <header className="flex justify-center items-center gap-4 sticky top-0 z-50">
            <Navbar />
        </header>
    )
}
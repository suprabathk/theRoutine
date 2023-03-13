import Logo from "./Logo"
import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <div className="navbar py-4 px-6 flex justify-between">
            <Link to={"/"}><Logo /></Link>
            <div className="actions flex gap-6 text-purple-600 font-medium">
                <button className="px-3 hover:underline underline-offset-8 transition-all">Sign In</button>
                <button className="px-3 hover:underline underline-offset-8 transition-all">Sign Up</button>
            </div>
        </div>
    );
}

export default NavBar;
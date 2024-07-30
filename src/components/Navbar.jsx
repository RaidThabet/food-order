import headerLogo from "../assets/headerLogo.png";
import Cart from "./Cart";
import Search from "./Search";

export default function Navbar() {
  return (
    <div className="navbar px-10 py-4 bg-amber-600"> 
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          <img src={headerLogo} alt="Food Logo" className="w-10" />
          <p className="text-white">Food Order</p>
        </a>
      </div>
      <div className="flex-none gap-4">
        <Search />
        <Cart />
      </div>
    </div>
  );
}

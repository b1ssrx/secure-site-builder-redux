import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative">
        <div className="absolute inset-0 bg-accent/20 blur-xl rounded-lg group-hover:bg-accent/30 transition-all" />
        <img 
          src={logo} 
          alt="Step2Code Logo" 
          width="40" 
          height="40" 
          className="relative"
        />
      </div>
      <span className="text-xl font-bold tracking-wide">
        STEP<span className="text-accent">2</span>CODE
      </span>
    </Link>
  );
};

import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "@/lib/auth";
import { LogOut, User } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            EXPLORE
          </Link>
          <Link to="/toplist" className="text-sm font-medium hover:text-primary transition-colors">
            TOP LIST
          </Link>
          <Link to="/roadmap" className="text-sm font-medium hover:text-primary transition-colors">
            ROADMAP
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {authenticated ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" className="glow-primary" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

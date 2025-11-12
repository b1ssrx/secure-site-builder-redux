import { Logo } from "./Logo";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              Step2code is an innovative learning platform that turns studying technology into an interactive journey.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-foreground transition-colors">About Step2Code</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Learning Paths</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Practice Challenges</Link></li>
              <li><Link to="/toplist" className="hover:text-foreground transition-colors">Leaderboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-foreground transition-colors">Help & Support</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Report an Issue</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Feedback</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-foreground transition-colors">Discord</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Twitter</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">GitHub</Link></li>
              <li><Link to="#" className="hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>All rights reserved step2code.com</p>
        </div>
      </div>
    </footer>
  );
};

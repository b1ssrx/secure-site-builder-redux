import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, CheckCircle2, FileText, Trophy, Sparkles, Plus } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { isAuthenticated } from "@/lib/auth";

const Home = () => {
  const authenticated = isAuthenticated();
  const { selectedRoles, toggleRole } = authenticated ? useUser() : { selectedRoles: [], toggleRole: () => {} };
  
  const roles = [
    "Frontend", "Backend", "Full Stack", "DevOps", "Data Analyst",
    "AI Engineer", "AI And Extra Scientist", "Data Engineer", "IOS",
    "Android", "UX Design", "PostgreSQL", "Blockchain"
  ];

  const leaderboard = [
    { rank: 1, name: "Naurzbek", userId: "hackle777", country: "KZ", state: "Almaty", city: "Astana", rating: 1 },
    { rank: 2, name: "Tolegen", userId: "Talea01", country: "KZ", state: "Almaty", city: "Astana", rating: 2 },
    { rank: 3, name: "Naimur", userId: "Binarix", country: "KZ", state: "Almaty", city: "Astana", rating: 3 },
    { rank: 4, name: "Ataturk", userId: "Atatuerk0171", country: "TR", state: "Ankara", city: "Ankara", rating: 4 },
    { rank: 5, name: "lasif", userId: "Stalin", country: "RU", state: "Moscow Region", city: "Moscow", rating: 5 },
    { rank: 6, name: "Trump", userId: "Mcdonalds", country: "USA", state: "Washington", city: "White House", rating: 6 },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                EXPLORE, CREATE AND<br />
                <span className="text-gradient">Learn. Solve. Level Up.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Go From Beginner To Pro Through Interactive Learning And Challenges.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="glow-primary" asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl" />
              <div className="relative">
                <svg viewBox="0 0 400 400" className="w-full max-w-md mx-auto">
                  <defs>
                    <linearGradient id="globe-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--accent))" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" />
                    </linearGradient>
                  </defs>
                  <circle cx="200" cy="200" r="150" fill="url(#globe-gradient)" opacity="0.2" />
                  <circle cx="200" cy="200" r="150" fill="none" stroke="url(#globe-gradient)" strokeWidth="2" />
                  <ellipse cx="200" cy="200" rx="150" ry="60" fill="none" stroke="url(#globe-gradient)" strokeWidth="1.5" opacity="0.6" />
                  <ellipse cx="200" cy="200" rx="60" ry="150" fill="none" stroke="url(#globe-gradient)" strokeWidth="1.5" opacity="0.6" />
                  <circle cx="260" cy="150" r="12" fill="hsl(var(--accent))" className="animate-pulse" />
                  <circle cx="140" cy="240" r="12" fill="hsl(var(--primary))" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
                  <circle cx="200" cy="100" r="12" fill="hsl(var(--accent))" className="animate-pulse" style={{ animationDelay: "1s" }} />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How it works</h2>
          
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { icon: BookOpen, title: "Choose Your Roadmap", color: "text-primary" },
              { icon: FileText, title: "Study A Topic", color: "text-accent" },
              { icon: CheckCircle2, title: "Confirm Understanding", color: "text-primary" },
              { icon: Sparkles, title: "Take A Test Like Leetcode", color: "text-accent" },
              { icon: Trophy, title: "Earn Points", color: "text-primary" },
            ].map((step, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-xl bg-card/50 border border-border">
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </div>
                <p className="font-medium">{step.title}</p>
                {i < 4 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-accent" style={{ transform: "translateX(50%)" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready for Next */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready for Next ?</h2>
          
          <div className="flex gap-4 max-w-md mx-auto">
            <Input
              placeholder="info"
              className="bg-input border-border/50"
            />
            <Button className="glow-primary">→</Button>
          </div>

          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-4">Role: Based Step2Code</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {roles.map((role, i) => {
                const isSelected = authenticated && selectedRoles.includes(role);
                return (
                  <Badge
                    key={i}
                    variant="outline"
                    onClick={() => authenticated && toggleRole(role)}
                    className={`px-4 py-2 text-sm border-primary/30 cursor-pointer transition-all duration-300 hover-scale ${
                      isSelected 
                        ? 'bg-primary/20 border-primary text-primary shadow-lg shadow-primary/20' 
                        : 'hover:bg-primary/10 hover:border-primary/50'
                    }`}
                  >
                    {role}
                  </Badge>
                );
              })}
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm border-accent/30 hover:bg-accent/10 cursor-pointer transition-all hover-scale"
              >
                <Plus className="h-3 w-3 mr-1" />
                Create Your
              </Badge>
            </div>
            {!authenticated && (
              <p className="text-xs text-muted-foreground mt-3">
                <Link to="/login" className="text-primary hover:underline">Sign in</Link> to select your learning paths
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <Button variant="ghost" className="text-muted-foreground" asChild>
              <Link to="/toplist">↓ Leaderboard</Link>
            </Button>
          </div>

          <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-primary/30 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-card overflow-hidden">
                <div className="h-full w-full bg-gradient-to-br from-primary to-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Nurassyl Zamanbekuly</h3>
                <p className="text-sm text-muted-foreground">#13</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-muted-foreground">World Ranking</span>
                <Badge className="bg-primary/20">248</Badge>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-2 px-2">#</th>
                    <th className="text-left py-2 px-2">Name</th>
                    <th className="text-left py-2 px-2">user id</th>
                    <th className="text-left py-2 px-2">country</th>
                    <th className="text-left py-2 px-2">state</th>
                    <th className="text-left py-2 px-2">city</th>
                    <th className="text-left py-2 px-2">rating</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((player) => (
                    <tr key={player.rank} className="border-b border-border/30">
                      <td className="py-3 px-2">{player.rank}</td>
                      <td className="py-3 px-2 flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-accent" />
                        {player.name}
                      </td>
                      <td className="py-3 px-2">{player.userId}</td>
                      <td className="py-3 px-2">{player.country}</td>
                      <td className="py-3 px-2">{player.state}</td>
                      <td className="py-3 px-2">{player.city}</td>
                      <td className="py-3 px-2">{player.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/toplist">See more</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { logout } from "@/lib/auth";
import { Calendar, Mail, User as UserIcon, Trophy, Target, LogOut, Edit } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, selectedRoles, progress, totalPoints, registrationDate } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const roadmapNames: Record<string, string> = {
    backend: "Backend Development",
    frontend: "Frontend Development",
    devops: "DevOps & Cloud",
    fullstack: "Full Stack Development"
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card className="p-8 bg-gradient-to-br from-card/50 to-primary/5 border-primary/20">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full" />
                <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <UserIcon className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <div className="flex-1 space-y-3">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{user.fullName}</h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {formatDate(registrationDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-accent" />
                    <span className="text-accent font-semibold">{totalPoints} Points</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </Card>

          {/* Selected Roles */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Selected Learning Paths</h2>
            </div>
            {selectedRoles.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedRoles.map((role, i) => (
                  <Badge 
                    key={i}
                    className="px-4 py-2 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 transition-all"
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 space-y-3">
                <p className="text-muted-foreground">You haven't selected any learning paths yet.</p>
                <Button asChild variant="outline">
                  <Link to="/">Browse Learning Paths</Link>
                </Button>
              </div>
            )}
          </Card>

          {/* Roadmap Progress */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-semibold">Roadmap Progress</h2>
            </div>
            
            {progress.length > 0 ? (
              <div className="space-y-6">
                {progress.map((roadmap, i) => {
                  const progressPercent = Math.round((roadmap.completedTopics.length / roadmap.totalTopics) * 100);
                  
                  return (
                    <Card key={i} className="p-5 bg-card/30 border-border/50 hover:border-primary/30 transition-all">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">
                              {roadmapNames[roadmap.roadmapId] || roadmap.roadmapId}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {roadmap.completedTopics.length} of {roadmap.totalTopics} topics completed
                            </p>
                          </div>
                          <Badge className="bg-accent/20 text-accent border-accent/30">
                            +{roadmap.points} pts
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{progressPercent}%</span>
                          </div>
                          <Progress value={progressPercent} className="h-2" />
                        </div>

                        <Button size="sm" variant="outline" asChild>
                          <Link to="/roadmap">Continue Learning</Link>
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 space-y-3">
                <div className="inline-flex p-4 rounded-full bg-muted/30 mb-2">
                  <Target className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">Start your learning journey!</p>
                <Button asChild className="glow-primary">
                  <Link to="/roadmap">Explore Roadmaps</Link>
                </Button>
              </div>
            )}
          </Card>

          {/* Achievements Section */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-semibold">Achievements & Badges</h2>
            </div>
            <div className="text-center py-12">
              <div className="inline-flex p-4 rounded-full bg-muted/30 mb-3">
                <Trophy className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Complete challenges to unlock achievements!</p>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;

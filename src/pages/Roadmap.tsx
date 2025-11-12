import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { roadmaps } from "@/data/roadmaps";
import { RoadmapTree } from "@/components/RoadmapTree";
import { useUser } from "@/contexts/UserContext";
import { Target } from "lucide-react";

const Roadmap = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState(roadmaps[0].id);
  const { user, progress } = useUser();
  const authenticated = !!user;

  const currentRoadmap = roadmaps.find(r => r.id === selectedRoadmap) || roadmaps[0];
  const roadmapProgress = progress.find(p => p.roadmapId === selectedRoadmap);
  
  const totalTopics = currentRoadmap.topics.reduce((acc, topic) => {
    return acc + (topic.subtopics?.length || 1);
  }, 0);
  
  const completedTopics = roadmapProgress?.completedTopics.length || 0;
  const progressPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex p-3 rounded-full bg-primary/10 mb-2">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold">
              Learning <span className="text-gradient">Roadmaps</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow structured learning paths to master technology. Track your progress and earn points as you learn.
            </p>
          </div>

          {/* Roadmap Tabs */}
          <Tabs value={selectedRoadmap} onValueChange={setSelectedRoadmap} className="w-full">
            <TabsList className="w-full flex-wrap h-auto gap-2 bg-card/30 p-2">
              {roadmaps.map((roadmap) => (
                <TabsTrigger
                  key={roadmap.id}
                  value={roadmap.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {roadmap.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {roadmaps.map((roadmap) => (
              <TabsContent key={roadmap.id} value={roadmap.id} className="space-y-6 mt-6">
                {/* Progress Card */}
                <Card className={`p-6 bg-gradient-to-br ${roadmap.color} bg-opacity-10 border-primary/30`}>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{roadmap.title}</h2>
                        <p className="text-muted-foreground">{roadmap.description}</p>
                      </div>
                      {authenticated && roadmapProgress && (
                        <Badge className="bg-accent/20 text-accent border-accent/30 text-lg px-4 py-2">
                          +{roadmapProgress.points} pts
                        </Badge>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{progressPercent}%</span>
                        </div>
                        <Progress value={progressPercent} className="h-3" />
                      </div>
                      
                      <div className="flex items-center justify-between px-4 py-2 bg-card/50 rounded-lg">
                        <span className="text-sm text-muted-foreground">Completed Topics</span>
                        <span className="text-lg font-bold">{completedTopics} / {totalTopics}</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Topics Tree */}
                <div className="space-y-4">
                  {roadmap.topics.map((topic) => (
                    <RoadmapTree
                      key={topic.id}
                      topic={topic}
                      roadmapId={roadmap.id}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Roadmap;

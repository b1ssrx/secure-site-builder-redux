import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { RoadmapTopic } from "@/data/roadmaps";
import { useUser } from "@/contexts/UserContext";

interface RoadmapTreeProps {
  topic: RoadmapTopic;
  roadmapId: string;
  level?: number;
}

export const RoadmapTree = ({ topic, roadmapId, level = 0 }: RoadmapTreeProps) => {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const { user, progress, updateProgress } = useUser();
  const authenticated = !!user;

  const roadmapProgress = progress.find(p => p.roadmapId === roadmapId);
  const isCompleted = roadmapProgress?.completedTopics.includes(topic.id) || false;
  
  const hasSubtopics = topic.subtopics && topic.subtopics.length > 0;
  const completedSubtopics = hasSubtopics 
    ? topic.subtopics!.filter(st => roadmapProgress?.completedTopics.includes(st.id)).length
    : 0;
  const totalSubtopics = topic.subtopics?.length || 0;

  const handleToggle = () => {
    if (authenticated) {
      updateProgress(roadmapId, topic.id, !isCompleted);
    }
  };

  const indentClass = level === 0 ? "" : level === 1 ? "ml-6" : "ml-12";

  return (
    <div className={`space-y-2 ${indentClass}`}>
      <Card 
        className={`p-4 transition-all duration-300 hover:scale-[1.01] cursor-pointer ${
          isCompleted 
            ? 'bg-primary/10 border-primary/50 shadow-md shadow-primary/20' 
            : 'bg-card/50 border-border/50 hover:border-primary/30'
        }`}
      >
        <div className="flex items-start gap-3">
          {hasSubtopics && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1 text-muted-foreground hover:text-primary transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}

          <div className="flex items-start gap-3 flex-1">
            <div className="mt-1">
              {authenticated ? (
                <Checkbox
                  checked={isCompleted}
                  onCheckedChange={handleToggle}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
              ) : (
                <div className="h-4 w-4 rounded border-2 border-muted-foreground/30" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 flex items-center gap-2 ${isCompleted ? 'text-primary' : ''}`}>
                    {topic.title}
                    {isCompleted && <CheckCircle2 className="h-4 w-4" />}
                  </h3>
                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                </div>
                
                {hasSubtopics && (
                  <Badge variant="outline" className="text-xs">
                    {completedSubtopics}/{totalSubtopics}
                  </Badge>
                )}
              </div>

              {level === 0 && hasSubtopics && (
                <div className="flex gap-1 mt-2">
                  {topic.subtopics!.map((subtopic) => {
                    const isSubCompleted = roadmapProgress?.completedTopics.includes(subtopic.id);
                    return (
                      <div
                        key={subtopic.id}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          isSubCompleted ? 'bg-primary' : 'bg-muted'
                        }`}
                        title={subtopic.title}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {hasSubtopics && isExpanded && (
        <div className="space-y-2 animate-fade-in">
          {topic.subtopics!.map((subtopic) => (
            <RoadmapTree
              key={subtopic.id}
              topic={subtopic}
              roadmapId={roadmapId}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

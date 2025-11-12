import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const TopList = () => {
  const leaderboard = [
    { rank: 1, name: "Naurzbek", userId: "hackle777", country: "KZ", state: "Almaty", city: "Astana", rating: 2847, points: 15420 },
    { rank: 2, name: "Tolegen", userId: "Talea01", country: "KZ", state: "Almaty", city: "Astana", rating: 2756, points: 14890 },
    { rank: 3, name: "Naimur", userId: "Binarix", country: "KZ", state: "Almaty", city: "Astana", rating: 2698, points: 14320 },
    { rank: 4, name: "Ataturk", userId: "Atatuerk0171", country: "TR", state: "Ankara", city: "Ankara", rating: 2645, points: 13980 },
    { rank: 5, name: "lasif", userId: "Stalin", country: "RU", state: "Moscow Region", city: "Moscow", rating: 2589, points: 13640 },
    { rank: 6, name: "Trump", userId: "Mcdonalds", country: "USA", state: "Washington", city: "White House", rating: 2534, points: 13210 },
    { rank: 7, name: "Emma Wilson", userId: "CodeMaster", country: "UK", state: "England", city: "London", rating: 2487, points: 12890 },
    { rank: 8, name: "Chen Wei", userId: "ByteWarrior", country: "CN", state: "Beijing", city: "Beijing", rating: 2445, points: 12560 },
    { rank: 9, name: "Maria Garcia", userId: "DevQueen", country: "ES", state: "Madrid", city: "Madrid", rating: 2398, points: 12240 },
    { rank: 10, name: "John Smith", userId: "StackOverflow", country: "USA", state: "California", city: "San Francisco", rating: 2356, points: 11920 },
  ];

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-orange-400";
    return "text-foreground";
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold">
              <span className="text-gradient">Global Leaderboard</span>
            </h1>
            <p className="text-muted-foreground">
              Compete with developers worldwide and climb to the top!
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or username..."
                className="pl-10 bg-input border-border/50"
              />
            </div>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border/50 bg-secondary/20">
                  <tr>
                    <th className="text-left py-4 px-4 font-semibold">Rank</th>
                    <th className="text-left py-4 px-4 font-semibold">User</th>
                    <th className="text-left py-4 px-4 font-semibold">User ID</th>
                    <th className="text-left py-4 px-4 font-semibold">Country</th>
                    <th className="text-left py-4 px-4 font-semibold">State</th>
                    <th className="text-left py-4 px-4 font-semibold">City</th>
                    <th className="text-left py-4 px-4 font-semibold">Rating</th>
                    <th className="text-left py-4 px-4 font-semibold">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((player, index) => (
                    <tr
                      key={player.rank}
                      className={`border-b border-border/30 hover:bg-secondary/10 transition-colors ${
                        index < 3 ? "bg-secondary/5" : ""
                      }`}
                    >
                      <td className={`py-4 px-4 font-bold ${getRankColor(player.rank)}`}>
                        #{player.rank}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold">
                            {player.name[0]}
                          </div>
                          <span className="font-medium">{player.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{player.userId}</td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="border-primary/30">
                          {player.country}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{player.state}</td>
                      <td className="py-4 px-4 text-muted-foreground">{player.city}</td>
                      <td className="py-4 px-4">
                        <Badge className="bg-primary/20 text-primary border-primary/30">
                          {player.rating}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 font-semibold text-accent">
                        {player.points.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TopList;

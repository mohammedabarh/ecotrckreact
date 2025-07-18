import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Leaf,
  Recycle,
  Zap,
  Droplets,
  Car,
  TrendingUp,
  Plus,
  Calendar,
  Target,
} from "lucide-react";

export const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    setUser(user);
    
    // Get user profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (profileData) {
      setProfile(profileData);
    }

    // Get recent activities
    const { data: activitiesData } = await supabase
      .from("activities")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5);

    if (activitiesData) {
      setActivities(activitiesData);
    }

    // Get current week goals
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    const { data: goalsData } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", user.id)
      .gte("week_start", startOfWeek.toISOString().split('T')[0]);

    if (goalsData) {
      setGoals(goalsData);
    }

    setLoading(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "transport":
        return <Car className="w-4 h-4" />;
      case "recycle":
        return <Recycle className="w-4 h-4" />;
      case "energy":
        return <Zap className="w-4 h-4" />;
      case "water":
        return <Droplets className="w-4 h-4" />;
      default:
        return <Leaf className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} profile={profile} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header user={user} profile={profile} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-eco bg-clip-text text-transparent">
            Your Eco Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your environmental impact with beautiful visualizations and insights
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="group hover:shadow-eco-lg transition-all duration-300 hover:scale-105 bg-gradient-card animate-scale-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Eco Score</CardTitle>
              <div className="w-12 h-12 bg-eco/10 rounded-2xl flex items-center justify-center group-hover:bg-eco/20 transition-all duration-300">
                <Leaf className="w-6 h-6 text-eco group-hover:scale-110 transition-transform duration-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-eco mb-2">{profile?.eco_score || 0}</div>
              <p className="text-sm text-eco font-medium mb-3">
                Great progress!
              </p>
              <Badge variant="secondary" className="bg-eco/10 text-eco border-eco/20">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% vs last month
              </Badge>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-eco-lg transition-all duration-300 hover:scale-105 bg-gradient-card animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Carbon Saved</CardTitle>
              <div className="w-12 h-12 bg-eco/10 rounded-2xl flex items-center justify-center group-hover:bg-eco/20 transition-all duration-300">
                <Recycle className="w-6 h-6 text-eco group-hover:scale-110 transition-transform duration-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-eco mb-2">{profile?.total_carbon_saved || 0}</div>
              <p className="text-sm text-muted-foreground mb-3">kg CO2 this month</p>
              <Badge variant="secondary" className="bg-eco/10 text-eco border-eco/20">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8% vs last month
              </Badge>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-eco-lg transition-all duration-300 hover:scale-105 bg-gradient-card animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Energy Saved</CardTitle>
              <div className="w-12 h-12 bg-eco/10 rounded-2xl flex items-center justify-center group-hover:bg-eco/20 transition-all duration-300">
                <Zap className="w-6 h-6 text-eco group-hover:scale-110 transition-transform duration-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-eco mb-2">{profile?.total_energy_saved || 0}</div>
              <p className="text-sm text-muted-foreground mb-3">kWh this month</p>
              <Badge variant="secondary" className="bg-eco/10 text-eco border-eco/20">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15% vs last month
              </Badge>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-eco-lg transition-all duration-300 hover:scale-105 bg-gradient-card animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Water Saved</CardTitle>
              <div className="w-12 h-12 bg-eco/10 rounded-2xl flex items-center justify-center group-hover:bg-eco/20 transition-all duration-300">
                <Droplets className="w-6 h-6 text-eco group-hover:scale-110 transition-transform duration-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-eco mb-2">{profile?.total_water_saved || 0}</div>
              <p className="text-sm text-muted-foreground">liters this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card className="bg-gradient-card shadow-eco-md hover:shadow-eco-lg transition-all duration-300 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-10 h-10 bg-eco/10 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-eco" />
                </div>
                Recent Activities
              </CardTitle>
              <CardDescription>Your latest eco-friendly actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-eco/10 rounded-xl flex items-center justify-center">
                          {getActivityIcon(activity.activity_type)}
                        </div>
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(activity.created_at)}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-eco/10 text-eco border-eco/20">
                        +{activity.eco_points} eco points
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-eco/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-eco" />
                    </div>
                    <p className="text-muted-foreground mb-4">No activities yet</p>
                    <Button asChild className="shadow-eco-md hover:shadow-eco-lg transition-all duration-300">
                      <a href="/add-activity">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Activity
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Goals */}
          <Card className="bg-gradient-card shadow-eco-md hover:shadow-eco-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-10 h-10 bg-eco/10 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-eco" />
                </div>
                Weekly Goals
              </CardTitle>
              <CardDescription>Track your sustainable targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-medium">Reduce car usage</span>
                    <span className="text-eco font-medium">4 days / 5 days</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-3">
                    <div className="bg-gradient-eco h-3 rounded-full transition-all duration-500 shadow-sm" style={{ width: "80%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-medium">Recycle items</span>
                    <span className="text-eco font-medium">12 items / 20 items</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-3">
                    <div className="bg-gradient-eco h-3 rounded-full transition-all duration-500 shadow-sm" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-medium">Save energy</span>
                    <span className="text-eco font-medium">45 kWh / 50 kWh</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-3">
                    <div className="bg-gradient-eco h-3 rounded-full transition-all duration-500 shadow-sm" style={{ width: "90%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Users, TrendingUp, Globe, Plus, Calendar, Trophy, Target, UserPlus, MessageSquare, PenTool } from "lucide-react";
import { CreatePost } from "@/components/CreatePost";
import { PostCard } from "@/components/PostCard";
import { getCommunityPosts, fakeUsers } from "@/utils/fakeData";

export const Community = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [allActivities, setAllActivities] = useState<any[]>([]);
  const [allProfiles, setAllProfiles] = useState<any[]>([]);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    checkUser();
    loadCommunityData();
    loadCommunityPosts();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      setUser(user);
      
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }
    }
  };

  const loadCommunityData = async () => {
    // Load recent community activities
    const { data: activitiesData } = await supabase
      .from("activities")
      .select(`
        *,
        profiles!activities_user_id_fkey(username, avatar_url)
      `)
      .order("created_at", { ascending: false })
      .limit(20);

    if (activitiesData) {
      setAllActivities(activitiesData);
    }

    // Load top profiles
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("*")
      .order("eco_score", { ascending: false })
      .limit(10);

    if (profilesData) {
      setAllProfiles(profilesData);
    }

    // Load sample challenges (in a real app, this would come from the database)
    setChallenges([
      {
        id: 1,
        title: "30-Day Plastic Free Challenge",
        description: "Reduce plastic usage for 30 days",
        participants: 1245,
        timeLeft: "5 days left",
        reward: "100 eco points",
        progress: 75
      },
      {
        id: 2,
        title: "Walk to Work Week",
        description: "Walk or bike to work for a full week",
        participants: 892,
        timeLeft: "12 days left", 
        reward: "50 eco points",
        progress: 45
      },
      {
        id: 3,
        title: "Zero Waste Weekend",
        description: "Produce zero waste for an entire weekend",
        participants: 567,
        timeLeft: "2 days left",
        reward: "75 eco points", 
        progress: 90
      }
    ]);

    // Load sample groups (in a real app, this would come from the database)
    setGroups([
      {
        id: 1,
        name: "Urban Gardeners",
        description: "Share tips and experiences about growing food in the city",
        members: 2345,
        category: "Gardening",
        lastActivity: "2 hours ago"
      },
      {
        id: 2,
        name: "Climate Activists",
        description: "Organize and participate in climate action events",
        members: 1892,
        category: "Activism",
        lastActivity: "5 hours ago"
      },
      {
        id: 3,
        name: "Green Commuters",
        description: "Alternative transportation and carpooling network",
        members: 987,
        category: "Transport",
        lastActivity: "1 day ago"
      },
      {
        id: 4,
        name: "Sustainable Living",
        description: "Tips and tricks for eco-friendly lifestyle changes",
        members: 3421,
        category: "Lifestyle",
        lastActivity: "3 hours ago"
      }
    ]);
  };

  const loadCommunityPosts = () => {
    const communityPosts = getCommunityPosts();
    setPosts(communityPosts);
  };

  const handlePostCreated = () => {
    setShowCreatePost(false);
    loadCommunityPosts();
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

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} profile={profile} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Eco Community</h1>
          <p className="text-xl text-muted-foreground">
            Connect with eco-warriors around the world and share your sustainable journey
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-eco/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-eco" />
              </div>
              <CardTitle>50,000+</CardTitle>
              <CardDescription>Active Members</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-eco/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Globe className="w-6 h-6 text-eco" />
              </div>
              <CardTitle>2.5M kg</CardTitle>
              <CardDescription>CO2 Saved Together</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-eco/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-eco" />
              </div>
              <CardTitle>1.2M</CardTitle>
              <CardDescription>Activities Shared</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Community Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post Section */}
            {user && !showCreatePost && (
              <Card className="bg-gradient-card shadow-eco-md">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback>
                        {profile?.username?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      variant="outline" 
                      className="flex-1 justify-start"
                      onClick={() => setShowCreatePost(true)}
                    >
                      <PenTool className="w-4 h-4 mr-2" />
                      Share your eco story...
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Create Post Form */}
            {showCreatePost && (
              <CreatePost 
                user={user} 
                onPostCreated={handlePostCreated}
                onCancel={() => setShowCreatePost(false)}
              />
            )}

            {/* Community Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  currentUser={user}
                  onPostUpdate={loadCommunityPosts}
                />
              ))}
            </div>

            {/* Legacy Activities Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Recent Activities
                    </CardTitle>
                    <CardDescription>Latest eco-friendly actions from our community</CardDescription>
                  </div>
                  {user && (
                    <Button asChild size="sm">
                      <a href="/add-activity">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Activity
                      </a>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allActivities.length > 0 ? (
                    allActivities.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-3 bg-muted/30 rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={activity.profiles?.avatar_url} />
                          <AvatarFallback>
                            {activity.profiles?.username?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm">{activity.profiles?.username || "Anonymous"}</p>
                            <Badge variant="secondary" className="text-xs">
                              +{activity.eco_points} points
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(activity.created_at)}
                            </span>
                          </div>
                          <p className="text-sm">{activity.title}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">No activities shared yet</p>
                      {user && (
                        <Button asChild size="sm">
                          <a href="/add-activity">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Your First Activity
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Eco Leaders
                </CardTitle>
                <CardDescription>Top eco-warriors this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Use fake data for leaderboard */}
                  {fakeUsers.sort((a, b) => b.eco_score - a.eco_score).map((user, index) => (
                    <div key={user.id} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-eco/10 text-eco font-bold text-sm">
                        {index + 1}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback>
                          {user.username?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{user.username}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.eco_score} eco points
                        </p>
                      </div>
                      {index < 3 && (
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {!user && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Join the Community</CardTitle>
                  <CardDescription>
                    Sign up to share your eco activities and compete with others
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <a href="/auth">Join Now</a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Challenges Section */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Active Challenges
              </CardTitle>
              <CardDescription>Join challenges to earn extra points and make a bigger impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="p-6 bg-gradient-to-br from-primary/5 to-eco/5 rounded-lg border">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-eco/10 rounded-full flex items-center justify-center">
                        <Target className="w-5 h-5 text-eco" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {challenge.timeLeft}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-2">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-eco h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${challenge.progress}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {challenge.participants.toLocaleString()} joined
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {challenge.reward}
                        </Badge>
                      </div>
                      
                      <Button className="w-full mt-4" size="sm">
                        Join Challenge
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Groups Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Community Groups
              </CardTitle>
              <CardDescription>Connect with like-minded eco-warriors in specialized groups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groups.map((group) => (
                  <div key={group.id} className="p-6 bg-muted/30 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold mb-1">{group.name}</h3>
                        <Badge variant="outline" className="text-xs mb-2">
                          {group.category}
                        </Badge>
                      </div>
                      <MessageSquare className="w-5 h-5 text-muted-foreground" />
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {group.members.toLocaleString()} members
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Active {group.lastActivity}
                      </span>
                    </div>
                    
                    <Button variant="outline" className="w-full" size="sm">
                      Join Group
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Community;
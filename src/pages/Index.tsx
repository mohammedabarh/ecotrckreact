import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  Leaf, 
  TrendingUp, 
  Users, 
  Globe, 
  Target, 
  Recycle,
  Zap,
  Droplets,
  Car,
  Play
} from "lucide-react";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    checkUser();
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

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header user={user} profile={profile} />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-2 animate-bounce-slow bg-eco/10 text-eco border-eco/20">
            🌱 Join the Green Movement
          </Badge>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-eco to-eco-light bg-clip-text text-transparent leading-tight">
            Track Your Environmental Impact
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
            Join thousands of eco-conscious individuals making a real difference. Monitor your
            carbon footprint, set sustainable goals, and build a greener future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" asChild className="px-8 py-3 text-lg shadow-eco-lg hover:shadow-glow transition-all duration-300 animate-glow">
              <Link to="/auth">
                <Play className="w-5 h-5 mr-2" />
                Start Tracking Now
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="px-8 py-3 text-lg border-eco/30 hover:bg-eco/5 hover:border-eco transition-all duration-300">
              <Link to="/guidelines">Learn More</Link>
            </Button>
          </div>
        </div>
        
        {/* Floating eco icons */}
        <div className="absolute top-20 left-10 text-eco/20 animate-bounce-slow">
          <Leaf className="w-8 h-8" />
        </div>
        <div className="absolute top-32 right-16 text-eco/20 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
          <Recycle className="w-6 h-6" />
        </div>
        <div className="absolute bottom-20 left-20 text-eco/20 animate-bounce-slow" style={{ animationDelay: '1s' }}>
          <Globe className="w-7 h-7" />
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-6">Your Eco Dashboard</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your environmental impact with beautiful visualizations and real-time insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center group hover:shadow-eco-lg transition-all duration-300 hover:scale-105 bg-gradient-card animate-scale-in">
            <CardHeader className="pb-3">
              <div className="w-16 h-16 bg-eco/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-eco/20 transition-all duration-300">
                <Leaf className="w-8 h-8 text-eco group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">Eco Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2 text-eco">78</div>
              <p className="text-sm text-eco font-medium mb-3">Great progress!</p>
              <Badge variant="secondary" className="bg-eco/10 text-eco border-eco/20">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% vs last month
              </Badge>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-eco-lg transition-all duration-300 hover:scale-105 bg-gradient-card animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-3">
              <div className="w-16 h-16 bg-eco/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-eco/20 transition-all duration-300">
                <Recycle className="w-8 h-8 text-eco group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">Carbon Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2 text-eco">156</div>
              <p className="text-sm text-muted-foreground mb-3">kg CO2 this month</p>
              <Badge variant="secondary" className="bg-eco/10 text-eco border-eco/20">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8% vs last month
              </Badge>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-eco-lg transition-all duration-300 hover:scale-105 bg-gradient-card animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-3">
              <div className="w-16 h-16 bg-eco/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-eco/20 transition-all duration-300">
                <Zap className="w-8 h-8 text-eco group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">Energy Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2 text-eco">342</div>
              <p className="text-sm text-muted-foreground mb-3">kWh this month</p>
              <Badge variant="secondary" className="bg-eco/10 text-eco border-eco/20">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15% vs last month
              </Badge>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-eco-lg transition-all duration-300 hover:scale-105 bg-gradient-card animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="pb-3">
              <div className="w-16 h-16 bg-eco/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-eco/20 transition-all duration-300">
                <Droplets className="w-8 h-8 text-eco group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">Water Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2 text-eco">1250</div>
              <p className="text-sm text-muted-foreground">liters this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gradient-card shadow-eco-md hover:shadow-eco-lg transition-all duration-300 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-10 h-10 bg-eco/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-eco" />
                </div>
                Recent Activities
              </CardTitle>
              <CardDescription>Your latest eco-friendly actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-eco/10 rounded-xl flex items-center justify-center">
                      <Car className="w-5 h-5 text-eco" />
                    </div>
                    <div>
                      <p className="font-medium">Used public transport</p>
                      <p className="text-sm text-muted-foreground">Today</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-eco/10 text-eco border-eco/20">+12 eco points</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-eco/10 rounded-xl flex items-center justify-center">
                      <Recycle className="w-5 h-5 text-eco" />
                    </div>
                    <div>
                      <p className="font-medium">Recycled plastic bottles</p>
                      <p className="text-sm text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-eco/10 text-eco border-eco/20">+8 eco points</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-eco/10 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-eco" />
                    </div>
                    <div>
                      <p className="font-medium">Used renewable energy</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-eco/10 text-eco border-eco/20">+15 eco points</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-eco/10 rounded-xl flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-eco" />
                    </div>
                    <div>
                      <p className="font-medium">Water conservation</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-eco/10 text-eco border-eco/20">+10 eco points</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

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
      </section>

      {/* Community Stats */}
      <section className="bg-gradient-to-br from-muted/20 via-eco/5 to-muted/20 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-6">Join Our Eco Community</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with like-minded individuals and make a bigger impact together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group animate-scale-in">
              <div className="w-20 h-20 bg-gradient-eco rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-eco-md">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2 text-eco">50,000+</div>
              <p className="text-muted-foreground text-lg">Active eco warriors</p>
            </div>
            <div className="group animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 bg-gradient-eco rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-eco-md">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2 text-eco">2.5M kg</div>
              <p className="text-muted-foreground text-lg">CO2 prevented collectively</p>
            </div>
            <div className="group animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 bg-gradient-eco rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-eco-md">
                <Target className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2 text-eco">100+</div>
              <p className="text-muted-foreground text-lg">Environmental challenges</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-eco bg-clip-text text-transparent">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Start your sustainable journey today and see the impact you can make on our planet.
          </p>
          <Button size="lg" asChild className="px-10 py-4 text-lg shadow-eco-lg hover:shadow-glow transition-all duration-300 animate-glow">
            <Link to="/auth">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

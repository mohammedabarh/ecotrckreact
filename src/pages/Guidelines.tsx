import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Recycle, 
  Zap, 
  Droplets, 
  Car, 
  Home, 
  ShoppingBag,
  Globe,
  Target,
  TrendingUp,
  Users,
  BookOpen,
  Trash2,
  UtensilsCrossed,
  ShieldCheck
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const guidelineCategories = [
  {
    id: "overview",
    title: "Overview", 
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-primary/10 text-primary",
    description: "Start your eco journey with these fundamental principles",
    isOverview: true
  },
  {
    id: "energy",
    title: "Energy",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-yellow-500/10 text-yellow-600",
    description: "Reduce energy consumption and switch to renewables"
  },
  {
    id: "water",
    title: "Water",
    icon: <Droplets className="w-6 h-6" />,
    color: "bg-blue-500/10 text-blue-600", 
    description: "Conserve water resources through mindful usage"
  },
  {
    id: "transport",
    title: "Transport",
    icon: <Car className="w-6 h-6" />,
    color: "bg-purple-500/10 text-purple-600",
    description: "Choose sustainable transportation options"
  },
  {
    id: "waste",
    title: "Waste",
    icon: <Trash2 className="w-6 h-6" />,
    color: "bg-green-500/10 text-green-600",
    description: "Minimize waste through reduction, reuse, and recycling"
  },
  {
    id: "consumption",
    title: "Consumption",
    icon: <ShoppingBag className="w-6 h-6" />,
    color: "bg-orange-500/10 text-orange-600",
    description: "Make conscious purchasing decisions"
  },
  {
    id: "food",
    title: "Food",
    icon: <UtensilsCrossed className="w-6 h-6" />,
    color: "bg-red-500/10 text-red-600",
    description: "Adopt sustainable eating habits and reduce food waste"
  },
  {
    id: "community",
    title: "Community",
    icon: <Users className="w-6 h-6" />,
    color: "bg-eco/10 text-eco",
    description: "Engage with others to amplify your environmental impact"
  }
];

const guidelines = {
  overview: {
    intro: "Welcome to your comprehensive guide for sustainable living. Small daily actions can create significant environmental impact when adopted consistently.",
    principles: [
      {
        title: "Start Small",
        description: "Begin with simple changes that fit easily into your routine",
        icon: "🌱"
      },
      {
        title: "Be Consistent", 
        description: "Regular small actions have more impact than occasional big ones",
        icon: "📅"
      },
      {
        title: "Track Progress",
        description: "Monitor your impact to stay motivated and see real results",
        icon: "📊"
      },
      {
        title: "Share & Inspire",
        description: "Encourage others to join your sustainable journey",
        icon: "🤝"
      }
    ]
  },
  energy: [
    {
      title: "Switch to LED Bulbs",
      description: "Replace incandescent bulbs with energy-efficient LEDs",
      points: 10,
      impact: "75% less energy usage",
      difficulty: "Easy"
    },
    {
      title: "Unplug Electronics",
      description: "Disconnect devices when not in use to avoid phantom loads",
      points: 8,
      impact: "10% reduction in electricity bill",
      difficulty: "Easy"
    },
    {
      title: "Use Smart Thermostats",
      description: "Automatically optimize heating and cooling",
      points: 15,
      impact: "10-23% energy savings",
      difficulty: "Medium"
    },
    {
      title: "Install Solar Panels",
      description: "Generate clean renewable energy for your home",
      points: 50,
      impact: "80% reduction in grid electricity",
      difficulty: "Hard"
    }
  ],
  water: [
    {
      title: "Fix Leaky Faucets",
      description: "Repair water leaks promptly to prevent waste",
      points: 12,
      impact: "20L saved daily",
      difficulty: "Easy"
    },
    {
      title: "Take Shorter Showers",
      description: "Reduce shower time by 2-3 minutes",
      points: 8,
      impact: "15L saved per shower",
      difficulty: "Easy"
    },
    {
      title: "Install Low-Flow Fixtures",
      description: "Replace showerheads and faucets with water-efficient models",
      points: 20,
      impact: "30% water usage reduction",
      difficulty: "Medium"
    },
    {
      title: "Collect Rainwater",
      description: "Use rainwater for gardening and outdoor cleaning",
      points: 15,
      impact: "50L saved weekly",
      difficulty: "Medium"
    }
  ],
  transport: [
    {
      title: "Walk or Bike",
      description: "Choose human-powered transportation for short distances",
      points: 15,
      impact: "3kg CO2 saved per trip",
      difficulty: "Easy"
    },
    {
      title: "Use Public Transportation",
      description: "Take buses, trains, or subways instead of driving alone",
      points: 12,
      impact: "2.5kg CO2 saved per trip",
      difficulty: "Easy"
    },
    {
      title: "Carpool or Rideshare",
      description: "Share rides with others when possible",
      points: 8,
      impact: "1.5kg CO2 saved per trip",
      difficulty: "Easy"
    },
    {
      title: "Choose Electric Vehicles",
      description: "Switch to electric or hybrid vehicles",
      points: 100,
      impact: "50% reduction in transport emissions",
      difficulty: "Hard"
    }
  ],
  waste: [
    {
      title: "Recycle Properly",
      description: "Sort and recycle materials according to local guidelines",
      points: 10,
      impact: "1kg waste diverted from landfill",
      difficulty: "Easy"
    },
    {
      title: "Use Reusable Bags",
      description: "Bring your own bags when shopping",
      points: 5,
      impact: "5 plastic bags prevented",
      difficulty: "Easy"
    },
    {
      title: "Compost Organic Waste",
      description: "Turn food scraps into nutrient-rich soil",
      points: 15,
      impact: "2kg organic waste diverted",
      difficulty: "Medium"
    },
    {
      title: "Choose Products with Less Packaging",
      description: "Opt for items with minimal or recyclable packaging",
      points: 12,
      impact: "30% less packaging waste",
      difficulty: "Easy"
    }
  ],
  consumption: [
    {
      title: "Buy Local Products",
      description: "Support local businesses and reduce transportation emissions",
      points: 12,
      impact: "Reduced carbon footprint",
      difficulty: "Easy"
    },
    {
      title: "Choose Sustainable Brands",
      description: "Research and support environmentally responsible companies",
      points: 15,
      impact: "Supporting eco-friendly practices",
      difficulty: "Medium"
    },
    {
      title: "Buy Quality Over Quantity",
      description: "Invest in durable items that last longer",
      points: 20,
      impact: "Reduced waste generation",
      difficulty: "Medium"
    },
    {
      title: "Rent or Share Items",
      description: "Use sharing economy for occasional needs",
      points: 10,
      impact: "Maximized resource utilization",
      difficulty: "Easy"
    }
  ],
  food: [
    {
      title: "Reduce Meat Consumption",
      description: "Try meatless meals a few times per week",
      points: 25,
      impact: "8kg CO2 saved weekly",
      difficulty: "Medium"
    },
    {
      title: "Minimize Food Waste",
      description: "Plan meals and use leftovers creatively",
      points: 15,
      impact: "1.5kg food waste prevented weekly",
      difficulty: "Easy"
    },
    {
      title: "Grow Your Own Food",
      description: "Start a garden or grow herbs indoors",
      points: 20,
      impact: "Fresh produce + reduced packaging",
      difficulty: "Medium"
    },
    {
      title: "Choose Organic & Local",
      description: "Support sustainable farming practices",
      points: 18,
      impact: "Reduced pesticide use",
      difficulty: "Easy"
    }
  ],
  community: [
    {
      title: "Join Environmental Groups",
      description: "Participate in local environmental organizations",
      points: 25,
      impact: "Collective action amplification",
      difficulty: "Easy"
    },
    {
      title: "Organize Community Cleanups",
      description: "Lead or participate in neighborhood cleanup events",
      points: 30,
      impact: "Direct environmental improvement",
      difficulty: "Medium"
    },
    {
      title: "Share Knowledge",
      description: "Teach others about sustainable practices",
      points: 20,
      impact: "Multiplied environmental impact",
      difficulty: "Easy"
    },
    {
      title: "Advocate for Policy Change",
      description: "Support environmental policies and candidates",
      points: 35,
      impact: "Systemic change potential",
      difficulty: "Medium"
    }
  ]
};

export const Guidelines = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("overview");

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
    <div className="min-h-screen bg-background">
      <Header user={user} profile={profile} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Sustainable Living Guidelines</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive guide to making a positive environmental impact through practical daily actions
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {guidelineCategories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className="flex flex-col h-auto p-4 gap-2"
                onClick={() => setActiveCategory(category.id)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeCategory === category.id ? "bg-primary-foreground/20" : category.color
                }`}>
                  {category.icon}
                </div>
                <span className="text-xs font-medium">{category.title}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-8">
          {activeCategory === "overview" ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  Getting Started with Sustainable Living
                </CardTitle>
                <CardDescription>
                  Foundation principles for your eco-friendly journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="prose max-w-none">
                  <p className="text-muted-foreground">
                    {guidelines.overview.intro}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {guidelines.overview.principles.map((principle, index) => (
                    <div key={index} className="p-6 bg-muted/30 rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">{principle.icon}</div>
                        <div>
                          <h3 className="font-semibold mb-2">{principle.title}</h3>
                          <p className="text-sm text-muted-foreground">{principle.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <Card className="text-center">
                    <CardHeader>
                      <div className="w-12 h-12 bg-eco/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Target className="w-6 h-6 text-eco" />
                      </div>
                      <CardTitle className="text-lg">Simple Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Small daily changes that make a big difference
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardHeader>
                      <div className="w-12 h-12 bg-eco/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <TrendingUp className="w-6 h-6 text-eco" />
                      </div>
                      <CardTitle className="text-lg">Track Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Monitor your impact and earn points for actions
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardHeader>
                      <div className="w-12 h-12 bg-eco/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Globe className="w-6 h-6 text-eco" />
                      </div>
                      <CardTitle className="text-lg">Real Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        See measurable environmental benefits
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {(() => {
                    const category = guidelineCategories.find(c => c.id === activeCategory);
                    return (
                      <>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${category?.color}`}>
                          {category?.icon}
                        </div>
                        {category?.title} Guidelines
                      </>
                    );
                  })()}
                </CardTitle>
                <CardDescription>
                  {guidelineCategories.find(c => c.id === activeCategory)?.description}
                </CardDescription>
              </CardHeader>
               <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeCategory !== "overview" && Array.isArray(guidelines[activeCategory as keyof typeof guidelines]) && 
                    (guidelines[activeCategory as keyof typeof guidelines] as any[]).map((tip: any, tipIndex: number) => (
                    <div key={tipIndex} className="p-6 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold">{tip.title}</h3>
                        <div className="flex flex-col gap-1">
                          <Badge variant="secondary" className="text-xs">
                            +{tip.points} pts
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {tip.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {tip.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <ShieldCheck className="w-4 h-4 text-eco" />
                        <span className="text-eco font-medium">{tip.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Ready to Start Your Eco Journey?</CardTitle>
              <CardDescription>
                Join our community and start tracking your environmental impact today
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    You're already part of our eco community! Start logging your activities.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button asChild>
                      <a href="/add-activity">Log an Activity</a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/dashboard">View Dashboard</a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Sign up for free and start making a difference today
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button asChild>
                      <a href="/auth">Join EcoTrack</a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/community">View Community</a>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Guidelines;
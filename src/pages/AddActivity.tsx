import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Car, Recycle, Zap, Droplets, Leaf, Plus } from "lucide-react";

const activityTypes = [
  {
    value: "transport",
    label: "Public Transport",
    icon: <Car className="w-4 h-4" />,
    defaultPoints: 12,
    defaultCarbon: 2.5,
  },
  {
    value: "recycle",
    label: "Recycling",
    icon: <Recycle className="w-4 h-4" />,
    defaultPoints: 8,
    defaultCarbon: 1.2,
  },
  {
    value: "energy",
    label: "Renewable Energy",
    icon: <Zap className="w-4 h-4" />,
    defaultPoints: 15,
    defaultCarbon: 3.8,
    defaultEnergy: 5.2,
  },
  {
    value: "water",
    label: "Water Conservation",
    icon: <Droplets className="w-4 h-4" />,
    defaultPoints: 10,
    defaultWater: 15.5,
  },
  {
    value: "other",
    label: "Other",
    icon: <Leaf className="w-4 h-4" />,
    defaultPoints: 5,
  },
];

export const AddActivity = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    activity_type: "",
    title: "",
    description: "",
    eco_points: 0,
    carbon_saved: 0,
    energy_saved: 0,
    water_saved: 0,
  });
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
    
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (profileData) {
      setProfile(profileData);
    }
  };

  const handleActivityTypeChange = (value: string) => {
    const selectedType = activityTypes.find(type => type.value === value);
    if (selectedType) {
      setFormData(prev => ({
        ...prev,
        activity_type: value,
        title: selectedType.label,
        eco_points: selectedType.defaultPoints,
        carbon_saved: selectedType.defaultCarbon || 0,
        energy_saved: selectedType.defaultEnergy || 0,
        water_saved: selectedType.defaultWater || 0,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Insert the activity
      const { error: activityError } = await supabase
        .from("activities")
        .insert([
          {
            user_id: user.id,
            ...formData,
          }
        ]);

      if (activityError) throw activityError;

      // Update user profile with new totals
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          eco_score: (profile?.eco_score || 0) + formData.eco_points,
          total_carbon_saved: (profile?.total_carbon_saved || 0) + formData.carbon_saved,
          total_energy_saved: (profile?.total_energy_saved || 0) + formData.energy_saved,
          total_water_saved: (profile?.total_water_saved || 0) + formData.water_saved,
        })
        .eq("user_id", user.id);

      if (profileError) throw profileError;

      toast({
        title: "Success",
        description: "Activity added successfully!",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedType = activityTypes.find(type => type.value === formData.activity_type);

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} profile={profile} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Add Eco Activity</h1>
            <p className="text-muted-foreground">
              Log your latest eco-friendly action and earn points
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                New Activity
              </CardTitle>
              <CardDescription>
                Share your sustainable action with the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="activity_type">Activity Type</Label>
                  <Select value={formData.activity_type} onValueChange={handleActivityTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {activityTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            {type.icon}
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Used public transport to work"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Add more details about your eco-friendly action..."
                    rows={3}
                  />
                </div>

                {selectedType && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eco_points">Eco Points</Label>
                      <Input
                        id="eco_points"
                        type="number"
                        value={formData.eco_points}
                        onChange={(e) => setFormData(prev => ({ ...prev, eco_points: parseInt(e.target.value) || 0 }))}
                        min="0"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="carbon_saved">Carbon Saved (kg CO2)</Label>
                      <Input
                        id="carbon_saved"
                        type="number"
                        step="0.1"
                        value={formData.carbon_saved}
                        onChange={(e) => setFormData(prev => ({ ...prev, carbon_saved: parseFloat(e.target.value) || 0 }))}
                        min="0"
                      />
                    </div>

                    {selectedType.value === "energy" && (
                      <div className="space-y-2">
                        <Label htmlFor="energy_saved">Energy Saved (kWh)</Label>
                        <Input
                          id="energy_saved"
                          type="number"
                          step="0.1"
                          value={formData.energy_saved}
                          onChange={(e) => setFormData(prev => ({ ...prev, energy_saved: parseFloat(e.target.value) || 0 }))}
                          min="0"
                        />
                      </div>
                    )}

                    {selectedType.value === "water" && (
                      <div className="space-y-2">
                        <Label htmlFor="water_saved">Water Saved (liters)</Label>
                        <Input
                          id="water_saved"
                          type="number"
                          step="0.1"
                          value={formData.water_saved}
                          onChange={(e) => setFormData(prev => ({ ...prev, water_saved: parseFloat(e.target.value) || 0 }))}
                          min="0"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => navigate("/dashboard")} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading || !formData.activity_type} className="flex-1">
                    {isLoading ? "Adding..." : "Add Activity"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AddActivity;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PenTool, Image, Send, X } from "lucide-react";
import { addNewPost } from "@/utils/fakeData";

interface CreatePostProps {
  user: any;
  onPostCreated: () => void;
  onCancel: () => void;
}

export const CreatePost = ({ user, onPostCreated, onCancel }: CreatePostProps) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "article",
    image_url: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in title and content",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call with fake data
      addNewPost({
        user_id: user?.id || "1", // Use current user or fallback
        title: formData.title,
        content: formData.content,
        type: formData.type,
        image_url: formData.image_url || null
      });

      toast({
        title: "Success",
        description: "Your post has been created!",
      });

      // Reset form
      setFormData({
        title: "",
        content: "",
        type: "article", 
        image_url: ""
      });

      onPostCreated();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-gradient-card shadow-eco-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <PenTool className="w-5 h-5" />
              Create New Post
            </CardTitle>
            <CardDescription>
              Share your eco-friendly journey with the community
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Post Type</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => setFormData({...formData, type: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select post type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="article">Article</SelectItem>
                <SelectItem value="photo">Photo Post</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="What's your eco story about?"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Share your experience, tips, or thoughts..."
              rows={4}
              required
            />
          </div>

          {formData.type === "photo" && (
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <div className="flex gap-2">
                <Image className="w-5 h-5 mt-2 text-muted-foreground" />
                <Input
                  id="image"
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Add an image URL to make your post more engaging
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                "Creating..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Create Post
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";
import { addNewComment } from "@/utils/fakeData";

interface PostCardProps {
  post: any;
  currentUser?: any;
  onPostUpdate?: () => void;
}

export const PostCard = ({ post, currentUser, onPostUpdate }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState(post.comments || []);
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    if (diffDays === 0) {
      if (diffHours === 0) return "Just now";
      return `${diffHours}h ago`;
    }
    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Unliked" : "Liked",
      description: liked ? "Removed from favorites" : "Added to favorites",
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in to comment",
        variant: "destructive",
      });
      return;
    }

    const comment = addNewComment(post.id, currentUser.id || "1", newComment);
    setLocalComments([...localComments, comment]);
    setNewComment("");
    
    toast({
      title: "Comment Added",
      description: "Your comment has been posted",
    });

    if (onPostUpdate) {
      onPostUpdate();
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.substring(0, 100) + "...",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Post link copied to clipboard",
      });
    }
  };

  return (
    <Card className="bg-gradient-card shadow-eco-md hover:shadow-eco-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.user?.avatar_url} />
            <AvatarFallback>
              {post.user?.username?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold">{post.user?.username || "Anonymous"}</p>
              <Badge variant="outline" className="text-xs">
                {post.type}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {formatDate(post.created_at)}
              </span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">{post.content}</p>
        
        {post.image_url && (
          <div className="rounded-lg overflow-hidden">
            <img 
              src={post.image_url} 
              alt={post.title}
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        {/* Interaction Buttons */}
        <div className="flex items-center gap-4 pt-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`gap-2 ${liked ? 'text-red-500' : ''}`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            {post.likes + (liked ? 1 : 0)}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            {localComments.length}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-4 pt-4 border-t border-border">
            {localComments.map((comment: any) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.user?.avatar_url} />
                  <AvatarFallback className="text-xs">
                    {comment.user?.username?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{comment.user?.username || "Anonymous"}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Comment */}
            {currentUser && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser?.avatar_url} />
                  <AvatarFallback className="text-xs">
                    {currentUser?.username?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    rows={2}
                    className="flex-1"
                  />
                  <Button 
                    size="sm" 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Leaf, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-eco/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-8 h-8 text-eco" />
          </div>
          <h1 className="text-6xl font-bold mb-4 text-foreground">404</h1>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          <Button asChild size="lg" className="px-8">
            <a href="/">
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </a>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;

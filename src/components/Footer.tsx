import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Leaf, 
  Github, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
  Users,
  Globe,
  BookOpen,
  Shield,
  Info
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-eco/10 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-eco" />
              </div>
              <span className="font-bold text-lg">EcoTrack</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering individuals to track, understand, and reduce their environmental 
              footprint while building a sustainable community.
            </p>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Platform</h3>
            <nav className="space-y-2">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-eco transition-colors"
              >
                <Users className="w-3 h-3" />
                Dashboard
              </Link>
              <Link 
                to="/add-activity" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-eco transition-colors"
              >
                <Globe className="w-3 h-3" />
                Track Activity
              </Link>
              <Link 
                to="/community" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-eco transition-colors"
              >
                <Heart className="w-3 h-3" />
                Community
              </Link>
              <Link 
                to="/guidelines" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-eco transition-colors"
              >
                <BookOpen className="w-3 h-3" />
                Guidelines
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <nav className="space-y-2">
              <a 
                href="#" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-eco transition-colors"
              >
                <BookOpen className="w-3 h-3" />
                Help Center
              </a>
              <a 
                href="#" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-eco transition-colors"
              >
                <Info className="w-3 h-3" />
                About Us
              </a>
              <a 
                href="#" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-eco transition-colors"
              >
                <Shield className="w-3 h-3" />
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-eco transition-colors"
              >
                <Globe className="w-3 h-3" />
                Terms of Service
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-3 h-3 text-eco" />
                hello@ecotrack.com
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-3 h-3 text-eco" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3 text-eco" />
                San Francisco, CA
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2024 EcoTrack. Made with</span>
            <Heart className="w-3 h-3 text-eco fill-eco" />
            <span>for the planet.</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>Status: All systems operational</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-eco rounded-full"></div>
              <span>50,000+ users</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
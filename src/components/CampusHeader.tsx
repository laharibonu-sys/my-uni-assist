import { GraduationCap, MessageCircle } from "lucide-react";
import campusHero from "@/assets/campus-hero.jpg";

export default function CampusHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={campusHero} 
          alt="Campus view" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero/90"></div>
      </div>
      
      {/* Content */}
      <div className="relative px-6 py-12 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 mr-3">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
            Campus AI Assistant
          </h1>
        </div>
        
        <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto mb-6">
          Get instant answers about class schedules, campus facilities, dining options, 
          library services, and administrative procedures.
        </p>
        
        <div className="flex items-center justify-center gap-2 text-primary-foreground/80 text-sm">
          <MessageCircle size={16} />
          <span>Powered by AI • Available 24/7</span>
        </div>
      </div>
    </div>
  );
}
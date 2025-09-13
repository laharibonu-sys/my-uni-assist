import CampusHeader from "@/components/CampusHeader";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-background">
      <CampusHeader />
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;
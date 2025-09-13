import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Calendar, MapPin, Utensils, BookOpen, FileText } from "lucide-react";

interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

const quickActions = [
  { icon: Calendar, label: "Class Schedules", query: "Show me my class schedules" },
  { icon: MapPin, label: "Campus Facilities", query: "Where can I find campus facilities?" },
  { icon: Utensils, label: "Dining Options", query: "What dining options are available?" },
  { icon: BookOpen, label: "Library Services", query: "Tell me about library services" },
  { icon: FileText, label: "Admin Procedures", query: "Help with administrative procedures" },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your campus AI assistant. I can help you with schedules, facilities, dining, library services, and administrative procedures. How can I assist you today?",
      type: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you're looking for information about that. To provide you with accurate campus information, I'll need to connect to our database. This feature requires backend integration.",
        type: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInput("");
  };

  const handleQuickAction = (query: string) => {
    setInput(query);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-chat">
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div className={`
                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                ${message.type === 'user' 
                  ? 'bg-gradient-primary text-primary-foreground' 
                  : 'bg-gradient-secondary text-secondary-foreground'
                }
              `}>
                {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <Card className={`
                max-w-[80%] p-4 shadow-soft transition-smooth
                ${message.type === 'user' 
                  ? 'bg-primary text-primary-foreground ml-12' 
                  : 'bg-card mr-12'
                }
              `}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className={`
                  text-xs mt-2 block opacity-70
                  ${message.type === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'}
                `}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </Card>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="p-4 border-t bg-background/50 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-muted-foreground mb-3 text-center">Quick actions to get started:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center gap-2 h-auto p-3 hover:shadow-soft transition-smooth"
                  onClick={() => handleQuickAction(action.query)}
                >
                  <action.icon size={16} />
                  <span className="text-xs text-center">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t bg-background/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about campus information..."
            className="flex-1 bg-background shadow-soft border-border/50 focus:shadow-medium transition-smooth"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button 
            onClick={handleSend}
            size="icon"
            className="bg-gradient-primary hover:shadow-medium transition-smooth"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
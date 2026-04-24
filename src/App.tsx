import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Bot, Vote, Calendar, Info, Globe2, Mic } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simulated App State
const useAppState = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [language, setLanguage] = useState<'en' | 'es' | 'hi'>('en');
    
    return { theme, setTheme, language, setLanguage };
}

export default function App() {
  const { theme } = useAppState();

  return (
    <div className={cn("min-h-screen font-sans transition-colors duration-300", theme)}>
        <div className="bg-background text-foreground min-h-screen flex flex-col">
          <Router>
             <Routes>
                <Route path="/" element={<Dashboard />} />
             </Routes>
          </Router>
        </div>
    </div>
  );
}

function Dashboard() {
   const [activeTab, setActiveTab] = useState<'assistant' | 'timeline' | 'resources'>('assistant');
   
   return (
       <div className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 space-y-6">
           <header className="flex justify-between items-center mb-8">
               <div className="flex items-center gap-3">
                   <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                       <Vote size={28} />
                   </div>
                   <div>
                       <h1 className="text-2xl font-bold tracking-tight">CivicGuide AI</h1>
                       <p className="text-sm text-muted-foreground">Your interactive election concierge</p>
                   </div>
               </div>
               
               <div className="flex items-center gap-2">
                   <button className="p-2 rounded-full hover:bg-muted transition-colors">
                       <Globe2 size={20} />
                   </button>
               </div>
           </header>

           <div className="grid md:grid-cols-3 gap-6">
               <div className="md:col-span-2 space-y-6">
                   <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-8 opacity-10">
                           <Bot size={120} />
                       </div>
                       
                       <div className="relative z-10 flex gap-4 mb-6 border-b border-white/10 pb-4">
                           {['assistant', 'timeline', 'resources'].map(tab => (
                               <button 
                                  key={tab}
                                  onClick={() => setActiveTab(tab as any)}
                                  className={cn(
                                      "px-4 py-2 rounded-full text-sm font-medium transition-all capitalize",
                                      activeTab === tab ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-white/5 text-muted-foreground"
                                  )}
                               >
                                   {tab}
                               </button>
                           ))}
                       </div>

                       <div className="min-h-[400px]">
                           {activeTab === 'assistant' && <AiAssistant />}
                           {activeTab === 'timeline' && <ElectionTimeline />}
                       </div>
                   </div>
               </div>

               <div className="space-y-6">
                   <div className="glass-card rounded-3xl p-6">
                       <h3 className="font-semibold mb-4 flex items-center gap-2">
                           <Info size={18} className="text-primary"/> 
                           Quick Context
                       </h3>
                       <div className="space-y-3">
                           <ContextPill title="Next Milestone" desc="Voter Registration Closes" date="Oct 15, 2026" />
                           <ContextPill title="Your District" desc="7th Congressional" />
                           <ContextPill title="Polling Station" desc="Lincoln High School (1.2mi)" />
                       </div>
                   </div>
               </div>
           </div>
       </div>
   )
}

function AiAssistant() {
    return (
        <div className="flex flex-col h-[400px]">
            <div className="flex-1 overflow-y-auto space-y-4 p-2">
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Bot size={16} className="text-primary"/>
                    </div>
                    <div className="bg-white/5 rounded-2xl rounded-tl-none px-4 py-3 text-sm leading-relaxed max-w-[80%] border border-white/10">
                        Hello! I'm CivicGuide, your AI election assistant. I can help you understand voter registration requirements, early voting timelines, or explain how the electoral college works. What would you like to know?
                    </div>
                </div>
            </div>
            
            <div className="mt-4 flex gap-2 relative">
                <input 
                    type="text" 
                    placeholder="Ask about the election process..." 
                    className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 text-muted-foreground transition-colors">
                    <Mic size={18} />
                </button>
            </div>
        </div>
    )
}

function ElectionTimeline() {
    const steps = [
        { phase: "Registration", desc: "Check eligibility and register to vote", date: "Until Oct 15", status: "active" },
        { phase: "Early Voting", desc: "Cast ballot before election day", date: "Oct 20 - Nov 2", status: "upcoming" },
        { phase: "Election Day", desc: "Final day to cast your vote", date: "Nov 5, 2026", status: "upcoming" },
    ];

    return (
        <div className="space-y-6 pt-4">
            {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 relative">
                    {idx !== steps.length - 1 && (
                        <div className="absolute left-[15px] top-8 bottom-[-24px] w-[2px] bg-white/10" />
                    )}
                    <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 z-10 bg-background",
                        step.status === 'active' ? "border-primary text-primary" : "border-white/20 text-muted-foreground"
                    )}>
                        <Calendar size={14} />
                    </div>
                    <div className="pb-6">
                        <h4 className="font-semibold">{step.phase}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
                        <span className="inline-block mt-2 text-xs font-medium bg-white/5 px-2 py-1 rounded text-primary/80">
                            {step.date}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

function ContextPill({ title, desc, date }: { title: string, desc: string, date?: string }) {
    return (
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
            <p className="text-xs text-muted-foreground mb-1">{title}</p>
            <p className="text-sm font-medium">{desc}</p>
            {date && <p className="text-xs text-primary mt-1">{date}</p>}
        </div>
    )
}

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  TrendingUp, 
  Newspaper, 
  ShieldAlert, 
  GraduationCap, 
  MessageSquare,
  Sparkles,
  HelpCircle,
  Activity,
  ArrowRight,
  RotateCcw,
  Zap,
  Info,
  CheckCircle2,
  ListFilter,
  Layers,
  Globe,
  Settings,
  Flame,
  UserCheck,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { ViewType, Agent, AnalysisResult, DebateMessage } from './types';
import { 
  INITIAL_AGENTS, 
  SUGGESTED_PROMPTS, 
  MOCK_ANALYSES, 
  INSTANT_LESSONS, 
  generateCustomAnalysis 
} from './data';
import { 
  AgentCard, 
  AgentTimeline, 
  ConfidenceGauge, 
  DebatePanel, 
  FinancialInsightCard, 
  RiskScoreCard, 
  EducationCard,
  InteractiveLessonCard,
  getAgentIcon
} from './components/FinCouncilComponents';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewType>('landing');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  // Custom prompt search input state
  const [queryInput, setQueryInput] = useState('');
  
  // Simulation states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [activeAgentIdx, setActiveAgentIdx] = useState(-1);
  const [simulatedAgents, setSimulatedAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [simulatedMessages, setSimulatedMessages] = useState<DebateMessage[]>([]);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);

  // References
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Automatically scroll debate log when new transcripts arrive
  useEffect(() => {
    const chatContainer = document.getElementById('debate-panel-scroll');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [simulatedMessages]);

  // Clean timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Primary function: Starts the sequential Multi-Agent Committee simulation
  const startCommitteeSimulation = (rawQuery: string) => {
    const formattedQuery = rawQuery.trim();
    if (!formattedQuery) return;

    // Reset parameters
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Select predefined analyses or generate a custom one
    let targetResult = MOCK_ANALYSES['nvda']; // fallback
    const key = formattedQuery.toLowerCase();
    
    if (key.includes('nvda') || key.includes('nvidia')) {
      targetResult = MOCK_ANALYSES['nvda'];
    } else if (key.includes('msft') || key.includes('btc') || key.includes('bitcoin') || key.includes('microsoft')) {
      targetResult = MOCK_ANALYSES['msft-btc'];
    } else if (key.includes('retirement') || key.includes('retire') || key.includes('pension')) {
      targetResult = MOCK_ANALYSES['retirement'];
    } else {
      targetResult = generateCustomAnalysis(formattedQuery);
    }

    setCurrentQuery(formattedQuery);
    setCurrentResult(targetResult);
    setIsAnalyzing(true);
    setActiveAgentIdx(0);
    setSimulatedMessages([]);
    
    // Set all agents to idle first
    const cleanAgents: Agent[] = INITIAL_AGENTS.map(a => ({ ...a, status: 'idle', output: undefined }));
    setSimulatedAgents(cleanAgents);

    // Switch to Dashboard Tab to watch the action
    setActiveTab('dashboard');

    // Trigger the simulation machine
    runSimulationStep(0, targetResult, cleanAgents, []);
  };

  // State Machine that fires agents sequentially mimicking real compilation and debates!
  const runSimulationStep = (
    step: number, 
    result: AnalysisResult, 
    agentsState: Agent[], 
    messagesState: DebateMessage[]
  ) => {
    // 6 core agents. 0: exec, 1: market, 2: news, 3: risk, 4: comm, 5: edu, 6: finalize
    if (step >= INITIAL_AGENTS.length) {
      // Completed last agent deliberation. Compile final reports.
      const finalAgents = agentsState.map(a => ({ ...a, status: 'completed' as const }));
      setSimulatedAgents(finalAgents);
      setActiveAgentIdx(-1);
      setIsAnalyzing(false);
      
      // Auto transition to recommendation report tab!
      setTimeout(() => {
        setActiveTab('recommendation');
      }, 1000);
      return;
    }

    setActiveAgentIdx(step);

    // Transition current agent to 'thinking'
    const updatedAgents = agentsState.map((agent, index) => {
      if (index === step) {
        return { ...agent, status: 'thinking' as const };
      }
      if (index < step) {
        return { ...agent, status: 'completed' as const };
      }
      return { ...agent, status: 'idle' as const };
    });
    setSimulatedAgents(updatedAgents);

    // Grab debate lines written by this agent
    const currentAgent = INITIAL_AGENTS[step];
    const matchingDebateLines = result.debateHistory.filter(
      msg => msg.senderId === currentAgent.id
    );

    // Formulate active content preview on completed report
    let reportText = '';
    if (currentAgent.id === 'executive') {
      reportText = `Initialized objective criteria matrix for: "${result.query}". Setup operational guidelines.`;
    } else if (currentAgent.id === 'market') {
      reportText = `Calculated Fair Value boundaries. Volatility indices suggest momentum resistance at short-term standard deviations.`;
    } else if (currentAgent.id === 'news') {
      reportText = `Indexed high positive volume media transcripts. Quantified qualitative catalyst ratios successfully.`;
    } else if (currentAgent.id === 'risk') {
      reportText = `Stress tests complete. Approved max ${result.riskAssessment.sizingLimit} weighting boundaries.`;
    } else if (currentAgent.id === 'committee') {
      reportText = `Moderated adversarial grid debates. Resolved default groupthink biases regarding high valuation metrics.`;
    } else if (currentAgent.id === 'education') {
      reportText = `Decoupled jargon files: Generated immediate interactive footnotes matching specific key terms.`;
    }

    // Thinking Delay to simulate active analysis
    timerRef.current = setTimeout(() => {
      // 1. Post matching script dialogues to the live feed transcript container
      const nextMessages = [...messagesState, ...matchingDebateLines];
      setSimulatedMessages(nextMessages);

      // 2. Set reports on finished agent
      const completedAgents = updatedAgents.map((agent, index) => {
        if (index === step) {
          return { ...agent, status: 'completed' as const, output: reportText };
        }
        return agent;
      });
      setSimulatedAgents(completedAgents);

      // 3. Trigger next sequential agent stage
      runSimulationStep(step + 1, result, completedAgents, nextMessages);

    }, 3200); // 3.2 seconds per agent deliberation loop for realistic visualization
  };

  const cancelActiveWork = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsAnalyzing(false);
    setActiveAgentIdx(-1);
  };

  return (
    <div className={`flex h-screen w-full font-sans overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'dark-theme bg-[#050505] text-zinc-150' : 'light-theme bg-[#FCFCFD] text-zinc-800'} selection:bg-emerald-500/30 selection:text-emerald-300`}>
      
      {/* SIDEBAR NAVIGATION (Sleek Interface Sidebar) */}
      <aside className={`hidden md:flex flex-col w-64 border-r p-6 shrink-0 h-full overflow-y-auto justify-between relative transition-colors duration-300 ${theme === 'dark' ? 'border-white/10 bg-[#070707]' : 'border-zinc-200/80 bg-white'}`}>
        <div className="space-y-8">
          {/* Brand Logo & Title */}
          <div 
            onClick={() => setActiveTab('landing')} 
            className="flex items-center gap-3 cursor-pointer select-none group"
            id="brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-555 via-emerald-400 to-teal-400 p-[1px] shadow-[0_0_15px_rgba(16,185,129,0.25)] group-hover:scale-105 transition-transform duration-300">
              <div className={`w-full h-full rounded-[11px] flex items-center justify-center transition-colors duration-300 ${theme === 'dark' ? 'bg-[#070707]' : 'bg-slate-50'}`}>
                <Brain size={20} className="text-emerald-550 group-hover:animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className={`font-display font-extrabold text-lg tracking-tight flex items-center gap-1 leading-none transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-zinc-950'}`}>
                FinCouncil <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 tracking-normal border border-emerald-500/20">AI</span>
              </h1>
              <span className="text-[9px] text-zinc-500 font-mono tracking-wide mt-1 block">CONCILIARY INTEL ENGINE</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-2 pt-4" id="nav-tabs">
            {[
              { id: 'landing', label: 'Overview', icon: <Activity size={15} /> },
              { id: 'dashboard', label: 'Committee Desk', icon: <MessageSquare size={15} />, count: isAnalyzing },
              { id: 'agents', label: 'The Council', icon: <Brain size={15} /> },
              { id: 'recommendation', label: 'Recommendation', icon: <TrendingUp size={15} />, disabled: !currentResult },
              { id: 'learning', label: 'Learning Center', icon: <GraduationCap size={15} /> },
              { id: 'architecture', label: 'Architecture', icon: <Layers size={15} /> }
            ].map((item) => {
              const isSelected = activeTab === item.id;
              if (item.disabled) return null;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ViewType)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all border-l-2 cursor-pointer ${
                    isSelected 
                      ? 'bg-emerald-500/5 text-emerald-500 border-emerald-400 font-bold shadow-[inset_0_0_20px_rgba(16,185,129,0.03)]' 
                      : `border-transparent hover:text-emerald-550 ${theme === 'dark' ? 'text-zinc-400 hover:bg-zinc-900/40' : 'text-zinc-500 hover:bg-zinc-50'}`
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isSelected ? 'text-emerald-500' : 'text-zinc-500'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.count ? (
                    <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 mt-8">
          {/* Upgrade to Pro Premium Segment */}
          <div className={`border rounded-2xl p-4 text-center relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#090b0a] border-white/5' : 'bg-zinc-50 border-zinc-200'}`}>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest font-semibold">Pro Level</span>
            <h4 className={`font-display font-bold text-xs mt-2.5 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>FinCouncil Premium</h4>
            <p className="text-[10px] text-zinc-500 mt-1 leading-snug">Mobilize raw Llama 70B & Deep Research agents.</p>
            <button 
              onClick={() => alert("Premium Tier simulation unlocked. Standard sandbox is active.")}
              className="mt-4 w-full bg-emerald-400 text-black text-[10px] font-bold py-2 rounded-xl hover:bg-emerald-300 hover:scale-[1.01] transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            >
              Upgrade Session
            </button>
          </div>

          {/* Quick Dual Theme Switcher Footer Row */}
          <div className={`pt-4 border-t flex items-center justify-between transition-colors duration-300 ${theme === 'dark' ? 'border-white/5' : 'border-zinc-200/80'}`}>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-500'}`} />
              <span className="text-[10px] font-mono font-medium text-zinc-500 uppercase tracking-wider select-none">
                {theme === 'dark' ? 'Obsidian Black' : 'Alabaster White'}
              </span>
            </div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-xl transition-all border shrink-0 flex items-center justify-center cursor-pointer ${
                theme === 'dark' 
                  ? 'bg-zinc-900 border-white/5 hover:border-emerald-500/30 text-amber-400' 
                  : 'bg-zinc-100 border-zinc-200 hover:border-emerald-600/30 text-indigo-650'
              }`}
              title="Toggle application look"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT PORTAL */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* TOP STATUS HEADER WITH ACTIVE SESSION TRACKING */}
        <header className={`h-16 border-b flex items-center justify-between px-6 lg:px-8 backdrop-blur-md shrink-0 transition-colors duration-300 ${theme === 'dark' ? 'border-white/10 bg-[#070707]/60' : 'border-zinc-200/80 bg-white/75'}`}>
          <div className="flex items-center gap-3">
            {/* Mobile Adaptive Logo */}
            <div className="md:hidden flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('landing')}>
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                <Brain size={16} className="text-black" />
              </div>
              <span className="font-display font-extrabold text-sm text-white">
                FinCouncil<span className="text-emerald-400">AI</span>
              </span>
            </div>

            {/* Current Workspace Activity */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider">Active Workspace:</span>
              {isAnalyzing ? (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/20 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-medium animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Processing &quot;{currentQuery.substring(0, 20)}{currentQuery.length > 20 ? '...' : ''}&quot;
                </span>
              ) : currentQuery ? (
                <span className="inline-flex items-center gap-1 bg-zinc-900 text-zinc-300 px-2 py-0.5 rounded border border-white/5 text-[10px] font-mono font-semibold">
                  Ready &quot;{currentQuery.substring(0, 24)}{currentQuery.length > 24 ? '...' : ''}&quot;
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-zinc-900/60 text-zinc-500 px-2 py-0.5 rounded border border-transparent text-[10px] font-mono">
                  Engine Ready
                </span>
              )}
            </div>
          </div>

          {/* Right Accessories: Status + Action button + Avatar */}
          <div className="flex items-center gap-3">
            <span className="hidden lg:flex items-center gap-1.5 text-[9px] font-mono font-medium text-emerald-400 bg-emerald-950/30 border border-emerald-500/25 px-2.5 py-1 rounded-full uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Dual Gemini 2.5 Active
            </span>

            {/* Header Theme Toggler (Visible on all sizes, particularly useful for mobile/tablet) */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-lg transition-all border flex items-center justify-center cursor-pointer ${
                theme === 'dark' 
                  ? 'bg-zinc-900 border-white/10 text-amber-400 hover:border-emerald-500/30' 
                  : 'bg-zinc-100 border-zinc-200 text-indigo-600 hover:border-emerald-600/30'
              }`}
              title="Toggle look"
            >
              {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
            </button>

            <button 
              onClick={() => {
                cancelActiveWork();
                setActiveTab('dashboard');
              }}
              className={`px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                theme === 'dark'
                  ? 'text-white border border-white/10 bg-zinc-900 hover:bg-zinc-805 hover:border-emerald-500/30'
                  : 'text-zinc-950 border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-emerald-600/30'
              }`}
            >
              <Sparkles size={11} className="text-emerald-500" />
              <span>Ask Council</span>
            </button>

            {/* Custom Premium Avatar */}
            <div className={`flex items-center gap-2 pl-2 border-l ${theme === 'dark' ? 'border-white/10' : 'border-zinc-200'}`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-200 border border-white/20 flex items-center justify-center text-[10px] font-bold text-black select-none">
                JD
              </div>
              <span className={`hidden md:inline text-xs font-semibold ${theme === 'dark' ? 'text-zinc-350' : 'text-zinc-850'}`}>Portfolio Demo</span>
            </div>
          </div>
        </header>

        {/* MOBILE DRAWER TAB BUTTONS */}
        <div className={`md:hidden sticky top-0 z-45 overflow-x-auto py-2 px-3 flex gap-1.5 scrollbar-none shrink-0 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#070707] border-b border-white/5' : 'bg-white border-b border-zinc-200'}`}>
          {[
            { id: 'landing', label: 'Overview' },
            { id: 'dashboard', label: `Desk ${isAnalyzing ? '●' : ''}` },
            { id: 'agents', label: 'The Council' },
            ...(currentResult ? [{ id: 'recommendation', label: 'Report' }] : []),
            { id: 'learning', label: 'Academy' },
            { id: 'architecture', label: 'Specs' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ViewType)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium shrink-0 transition-all ${
                activeTab === tab.id 
                  ? 'bg-emerald-400 text-black font-bold' 
                  : theme === 'dark'
                  ? 'bg-zinc-900 text-zinc-400 hover:text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* PAGE CONTENT CONTAINER AREA */}
        <div className="flex-1 overflow-y-auto p-5 lg:p-8" id="view-layer">
          <AnimatePresence mode="wait">

            {/* ==========================================
                A. LANDING / HERO OVERVIEW TAB
            ========================================== */}
            {activeTab === 'landing' && (
              <motion.div
                key="landing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              className="space-y-16 relative"
              id="landing-view"
            >
              {/* Subtle architectural tech backdrop image */}
              <div 
                className={`absolute inset-0 bg-cover bg-center pointer-events-none -m-5 lg:-m-8 rounded-3xl transition-opacity duration-500 ${theme === 'dark' ? 'bg-[url("https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1920&q=80")] opacity-5' : 'bg-[url("https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1920&q=80")] opacity-[0.035]'}`} 
                style={{ 
                  maskImage: 'radial-gradient(circle, black 30%, transparent 75%)', 
                  WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 75%)' 
                }}
              />

              {/* TWO-COLUMN INTUITIVE HERO DESK */}
              <section className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6">
                {/* Column 1: Core Value Proposition */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                    <Sparkles size={11} className="text-emerald-400 animate-spin" />
                    Next-Gen AI Committee Consensus
                  </span>
                  
                  <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
                    Your AI Financial <br />
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent italic">
                      Committee
                    </span>
                  </h2>

                  <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-sans">
                    FinCouncil AI mobilizes a group of highly specialized, adversarial AI agents working sequentially to research equities, verify reports, manage risk sizing limits, and build clear recommendations.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className="w-full sm:w-auto px-6 py-3.5 bg-emerald-400 text-black hover:bg-emerald-300 font-bold rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.25)] flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                      <span>Ask FinCouncil</span>
                      <ArrowRight size={16} />
                    </button>
                    <button
                      onClick={() => setActiveTab('agents')}
                      className="w-full sm:w-auto px-6 py-3.5 bg-zinc-900 hover:bg-zinc-805 text-white border border-white/10 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer animate-fade-in"
                    >
                      Meet the Agents
                    </button>
                  </div>
                </div>

                {/* Column 2: REAL COINS & LIQUID ASSETS SHOWCASE */}
                <div className="lg:col-span-5 relative">
                  {/* Subtle decorative gold orb glow in background */}
                  <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-emerald-500/10 rounded-full filter blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
                  
                  <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-zinc-950/60 p-[3px] shadow-2xl group/coin z-10">
                    <div className="relative rounded-[13px] overflow-hidden aspect-[4/3]">
                      <img 
                        src="https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&w=600&q=80" 
                        alt="Cryptocurrency Assets - Physical Bitcoin and Ethereum" 
                        className="w-full h-full object-cover group-hover/coin:scale-105 transition-transform duration-[700ms] ease-out select-none"
                        referrerPolicy="no-referrer"
                      />
                      {/* Dark overlay mask */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080a09] via-black/10 to-transparent pointer-events-none" />
                      
                      {/* Asset streaming indicator badge */}
                      <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-md border border-emerald-500/30 px-2 py-1 rounded-md flex items-center gap-1.5 shadow-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[9px] font-mono font-bold tracking-wider text-emerald-400 uppercase">Live Asset Stream</span>
                      </div>
                      
                      {/* Label badge on the real physical coins */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-[#10b981] font-mono tracking-wider block font-bold">SECURED PORTFOLIO STANDARD</span>
                          <span className="text-sm font-bold text-white tracking-tight">FinCouncil Monitored Assets</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-black/85 flex items-center justify-center border border-white/10">
                          <Activity size={12} className="text-emerald-400 animate-pulse" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Live Market Assets Data Grid */}
                    <div className="p-4 space-y-3 bg-[#080a09]/95 divide-y divide-white/5">
                      <div className="flex items-center justify-between text-xs pb-2.5">
                        <span className="text-zinc-300 flex items-center gap-2 font-medium">
                          <span className="text-yellow-500 font-bold font-mono">₿</span>
                          <span>Bitcoin</span>
                          <span className="text-[9px] font-mono bg-zinc-900 border border-white/5 px-1 py-0.5 rounded text-zinc-500">BTC</span>
                        </span>
                        <div className="text-right">
                          <span className="font-mono text-white font-bold">$102,480.50</span>
                          <span className="text-emerald-400 font-mono text-[9px] block font-semibold">+4.28%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs py-2.5">
                        <span className="text-zinc-300 flex items-center gap-2 font-medium">
                          <span className="text-indigo-400 font-bold font-mono">Ξ</span>
                          <span>Ethereum</span>
                          <span className="text-[9px] font-mono bg-zinc-900 border border-white/5 px-1 py-0.5 rounded text-zinc-500">ETH</span>
                        </span>
                        <div className="text-right">
                          <span className="font-mono text-white font-bold">$3,745.20</span>
                          <span className="text-emerald-400 font-mono text-[9px] block font-semibold">+2.31%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs pt-2.5">
                        <span className="text-zinc-300 flex items-center gap-2 font-medium">
                          <span className="text-amber-500 font-bold text-base leading-none">●</span>
                          <span>Physical Gold</span>
                          <span className="text-[9px] font-mono bg-zinc-900 border border-white/5 px-1 py-0.5 rounded text-zinc-500">GLD</span>
                        </span>
                        <div className="text-right">
                          <span className="font-mono text-white font-bold">$2,864.10 / oz</span>
                          <span className="text-rose-400 font-mono text-[9px] block font-semibold">-0.12%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* METRIC WRAPPERS */}
              <section className="grid grid-cols-2 md:grid-cols-4 gap-4" id="stats-ribbon">
                {[
                  { label: 'DELIBERATING AGENTS', value: '06', note: 'Role defined structure' },
                  { label: 'COGNITIVE BACKENDS', value: 'Gemini 2.5', note: 'Underpinned by Pro & Flash' },
                  { label: 'RISK FRAMEWORK', value: 'ADK Layer', note: 'Rigorous stress scenarios' },
                  { label: 'LEARNING CRADLE', value: 'MCP Fed', note: 'Anti-jargon tutoring' }
                ].map((stat, i) => (
                  <div key={i} className="glass-panel p-4 rounded-xl border border-white/5 text-center">
                    <span className="text-[9px] text-zinc-500 font-mono tracking-widest block uppercase">{stat.label}</span>
                    <span className="text-2xl font-display font-extrabold text-white mt-1 block">{stat.value}</span>
                    <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">{stat.note}</span>
                  </div>
                ))}
              </section>

              {/* FEATURES GRID SECTION */}
              <section className="space-y-6">
                <div className="text-center max-w-xl mx-auto">
                  <h3 className="font-display font-bold text-2xl text-white">Advanced Fintech Agent Capabilities</h3>
                  <p className="text-xs text-zinc-400 leading-normal mt-1">Multi-perspective deliberation ensures robust outputs without single-agent confirmation biases.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" id="features-grid">
                  {[
                    {
                      title: 'Multi-Agent Analysis',
                      desc: 'Adversarial feedback design forces simultaneous quantitative and narrative stress assessments.',
                      icon: <Brain size={20} className="text-emerald-400" />,
                      tab: 'agents' as const
                    },
                    {
                      title: 'Financial Coaching',
                      desc: 'Understands personal retirement planning, asset distribution timelines, and compound objectives.',
                      icon: <TrendingUp size={20} className="text-blue-400" />,
                      tab: 'dashboard' as const
                    },
                    {
                      title: 'Risk Assessment',
                      desc: 'Derives position bounds, technical stop limits, and challenges bullish outlook assumptions dynamically.',
                      icon: <ShieldAlert size={20} className="text-rose-400" />,
                      tab: 'dashboard' as const
                    },
                    {
                      title: 'Financial Education',
                      desc: 'Breaks down complex market jargon instantly, generating adaptive quiz blocks to test retail competence.',
                      icon: <GraduationCap size={20} className="text-cyan-400" />,
                      tab: 'learning' as const
                    }
                  ].map((feat, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveTab(feat.tab)}
                      className="glass-panel p-5 rounded-2xl border border-white/10 glass-panel-hover cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center mb-4">
                          {feat.icon}
                        </div>
                        <h4 className="font-display font-bold text-white text-base leading-tight">{feat.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed mt-2">{feat.desc}</p>
                      </div>
                      <span className="text-[10px] font-mono font-semibold text-emerald-400 flex items-center gap-1 mt-4 group">
                        Execute Module <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* ARCHITECTURE WORKFLOW MAP */}
              <section className="glass-panel p-6 rounded-2xl border border-white/10 bg-zinc-950/20 relative overflow-hidden" id="concept-timeline">
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-emerald-500/10 -translate-y-1/2 z-0 hidden lg:block" />
                
                <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#10b981]">Consensus Blueprint</span>
                  <h3 className="font-display font-bold text-2xl text-white mt-1">Structured Committee Workflow Cycle</h3>
                  <p className="text-xs text-zinc-400 leading-normal">Watch how data triggers and consensus loops deliver institutional-grade portfolio intelligence.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
                  {[
                    { nr: '01', agent: 'Executive Officer', action: 'Objectives setup & briefs', color: 'border-emerald-500/30' },
                    { nr: '02', agent: 'Market Modeler', action: 'Quantitative ratios computed', color: 'border-blue-500/30' },
                    { nr: '03', agent: 'News SCRAPER', action: 'Transcript & sentiment analysis', color: 'border-yellow-500/30' },
                    { nr: '04', agent: 'Risk Controller', action: 'Worst case & size caps', color: 'border-rose-500/30' },
                    { nr: '05', agent: 'Committee Moderator', action: 'Challenging consensus', color: 'border-purple-500/30' },
                    { nr: '06', agent: 'Consensus Yield', action: 'A jargon-free roadmap', color: 'border-cyan-500/30' }
                  ].map((cycle, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${cycle.color} text-center flex flex-col items-center relative transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-900/60' : 'bg-slate-50/50 shadow-sm border-zinc-200'}`}>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-400 font-bold">{cycle.nr}</span>
                      <h4 className="font-display font-semibold text-white text-xs mt-3">{cycle.agent}</h4>
                      <p className="text-[11px] text-zinc-500 leading-tight mt-1">{cycle.action}</p>
                      
                      {/* Arrow indicator between cards on desktop */}
                      {i < 5 && (
                        <div className="hidden lg:block absolute top-1/2 -right-3.5 -translate-y-1/2 z-20 bg-zinc-900/80 p-1.5 rounded-full border border-white/5 shadow-md">
                          <ArrowRight size={8} className="text-emerald-500" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* BRIEF BOTTOM CONTACT FOOTER */}
              <footer className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-zinc-500 text-xs gap-4 relative z-10" id="landing-footer">
                <div>
                  <p>© 2026 FinCouncil AI. All Rights Reserved. Model output indices simulated. No real capital guarantees.</p>
                </div>
                <div className="flex gap-4 font-mono text-[10px]">
                  <a href="#brand-logo" onClick={() => setActiveTab('architecture')} className="hover:text-emerald-400">System Blueprint</a>
                  <span>|</span>
                  <a href="#brand-logo" onClick={() => setActiveTab('learning')} className="hover:text-emerald-400">FinAcademy</a>
                  <span>|</span>
                  <span className="text-zinc-600">Built for Portfolio Demos</span>
                </div>
              </footer>
            </motion.div>
          )}


          {/* ==========================================
              B. DASHBOARD & INTERACTIVE SIMULATOR (COMMITTEE DESK)
          ========================================== */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 relative"
              id="committee-desk"
            >
              {/* Subtle financial briefing backdrop image */}
              <div 
                className={`absolute inset-0 bg-cover bg-center pointer-events-none -m-5 lg:-m-8 rounded-3xl transition-opacity duration-500 ${theme === 'dark' ? 'bg-[url("https://images.unsplash.com/photo-1642156814191-a652f64377cf?auto=format&fit=crop&w=1920&q=80")] opacity-5' : 'bg-[url("https://images.unsplash.com/photo-1642156814191-a652f64377cf?auto=format&fit=crop&w=1920&q=80")] opacity-[0.035]'}`} 
                style={{ 
                  maskImage: 'radial-gradient(circle, black 35%, transparent 80%)', 
                  WebkitMaskImage: 'radial-gradient(circle, black 35%, transparent 80%)' 
                }}
              />

              {/* Active Workspace Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400">Council Chamber</span>
                  <h2 className="font-display font-extrabold text-3xl text-white mt-1">Committee Analytics Desk</h2>
                  <p className="text-xs text-zinc-400">Post a financial query to trigger the multi-agent debate process.</p>
                </div>

                {isAnalyzing && (
                  <button 
                    onClick={cancelActiveWork}
                    className="self-start md:self-center px-3py-1.5 text-xs text-rose-400 border border-rose-500/20 hover:bg-rose-950/10 rounded-lg shrink-0 flex items-center gap-1.5 animate-pulse uppercase font-mono font-semibold"
                  >
                    <RotateCcw size={12} className="animate-spin" />
                    Cancel Deliberation
                  </button>
                )}
              </div>

              {/* INPUT MODULE & SUGGESTIONS */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-zinc-950/30 relative overflow-hidden" id="analytics-input-module">
                {/* Background flow light */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                
                <p className="text-xs font-semibold text-zinc-300 font-sans mb-3 flex items-center gap-1.5">
                  <Flame size={14} className="text-yellow-400 animate-pulse" />
                  What investment thesis or financial vector should we evaluate today?
                </p>

                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      disabled={isAnalyzing}
                      placeholder="e.g., Should I buy TSLA? or Compare Gold vs Real Estate..."
                      value={queryInput}
                      onChange={(e) => setQueryInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') startCommitteeSimulation(queryInput);
                      }}
                      className="w-full bg-[#0d100e] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-650 focus:outline-none focus:border-emerald-500/50"
                    />
                    {queryInput && (
                      <button 
                        onClick={() => setQueryInput('')}
                        disabled={isAnalyzing}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-500 hover:text-white"
                      >
                        CLEAR
                      </button>
                    )}
                  </div>
                  <button
                    disabled={isAnalyzing || !queryInput.trim()}
                    onClick={() => startCommitteeSimulation(queryInput)}
                    className={`px-6 py-3.5 rounded-xl font-bold font-sans text-sm tracking-wide shrink-0 transition-all flex items-center justify-center gap-2 ${
                      isAnalyzing || !queryInput.trim() 
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                        : 'bg-emerald-400 text-black hover:bg-emerald-300 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                    }`}
                  >
                    <span>Analyze</span>
                    <Activity size={14} className={isAnalyzing ? 'animate-pulse' : ''} />
                  </button>
                </div>

                {/* SUGGESTED PRE-LOADED SESSIONS */}
                <div className="mt-5 pt-4 border-t border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">Preset Committee Subjects:</span>
                  <div className="flex flex-wrap gap-2.5">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt.id}
                        disabled={isAnalyzing}
                        onClick={() => {
                          setQueryInput(prompt.text);
                          startCommitteeSimulation(prompt.text);
                        }}
                        className="bg-zinc-900/60 border border-white/5 hover:border-emerald-500/20 px-3 py-2 rounded-xl text-xs text-zinc-300 flex items-center gap-2 text-left cursor-pointer transition-colors"
                      >
                        <span className="text-sm shrink-0">{prompt.icon}</span>
                        <div>
                          <p className="font-semibold text-zinc-200">{prompt.text}</p>
                          <span className="text-[8px] font-mono text-zinc-500 uppercase block tracking-wider mt-0.5">{prompt.category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SIMULATOR SCREENPLAY GRID (ONLY IF CONCERNED) */}
              {isAnalyzing || simulatedMessages.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="deliberation-cradle">
                  
                  {/* Left Column: Timeline progression & Active Status Cards (7 Column span) */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Visual wire connector block */}
                    <AgentTimeline agents={simulatedAgents} activeIdx={activeAgentIdx} />

                    {/* Active agent status block holding spotlight */}
                    <div className="space-y-4">
                      <h4 className="font-display font-semibold text-white text-sm uppercase font-mono tracking-wider flex items-center gap-1">
                        <UserCheck size={14} className="text-emerald-400" />
                        Active Chamber Spotlight:
                      </h4>

                      {/* We display the designated active agent details in big lights */}
                      {activeAgentIdx !== -1 ? (
                        <AgentCard 
                          agent={simulatedAgents[activeAgentIdx]} 
                          isActive={true} 
                        />
                      ) : (
                        <div className="glass-panel p-6 rounded-xl border border-white/10 text-center text-zinc-400 text-xs">
                          <CheckCircle2 size={24} className="text-emerald-400 mx-auto mb-2 animate-bounce" />
                          <p className="font-bold text-white text-sm">Review Cycle Complete!</p>
                          <p className="mt-1">All agent sub-reports have been reconciled. The synthesized final recommendations are certified.</p>
                          <button
                            onClick={() => setActiveTab('recommendation')}
                            className="mt-4 px-4 py-2 bg-emerald-400 text-black text-xs font-bold rounded-lg hover:bg-emerald-300"
                          >
                            Open Recommendation Report
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Live debate dialogue transcripts (5 Column span) */}
                  <div className="lg:col-span-5 h-[520px]">
                    <DebatePanel 
                      messages={simulatedMessages} 
                      activeAgentId={activeAgentIdx !== -1 ? simulatedAgents[activeAgentIdx].id : null} 
                    />
                  </div>

                </div>
              ) : (
                /* Prompt Placeholder when workspace is waiting */
                <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-zinc-950/10">
                  <Brain size={40} className="text-zinc-700 mx-auto animate-pulse mb-4" />
                  <p className="font-display font-bold text-base text-zinc-400">Chamber Operational</p>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1 leading-relaxed">
                    The AI committee is currently on standby. Please write a dynamic prompt or select a preset option above to start the sequential analysis workflow.
                  </p>
                </div>
              )}
            </motion.div>
          )}


          {/* ==========================================
              C. FLAGSHIP RECOMMENDATION VIEW
          ========================================== */}
          {activeTab === 'recommendation' && currentResult && (
            <motion.div
              key="recommendation"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 relative"
              id="recommendation-deck"
            >
              {/* Subtle trend charts backdrop image */}
              <div 
                className={`absolute inset-0 bg-cover bg-center pointer-events-none -m-5 lg:-m-8 rounded-3xl transition-opacity duration-500 ${theme === 'dark' ? 'bg-[url("https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1920&q=80")] opacity-5' : 'bg-[url("https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1920&q=80")] opacity-[0.035]'}`} 
                style={{ 
                  maskImage: 'radial-gradient(circle, black 35%, transparent 80%)', 
                  WebkitMaskImage: 'radial-gradient(circle, black 35%, transparent 80%)' 
                }}
              />

              {/* Report Header Block */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-6 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      CERTIFIED BRIEF #{(currentResult.confidenceScore * 13).toString(16).toUpperCase()}
                    </span>
                    <span className="text-zinc-500 text-xs font-mono">• Generated just now</span>
                  </div>
                  <h2 className="font-display font-extrabold text-3xl text-white mt-1.5 leading-tight">
                    Advisory: &quot;{currentResult.query}&quot;
                  </h2>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setQueryInput(currentResult.query);
                      setActiveTab('dashboard');
                    }}
                    className="px-3.5 py-2 text-xs font-semibold bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-805 rounded-xl transition-colors shrink-0"
                  >
                    Re-run Debate Cycle
                  </button>
                  <button
                    onClick={() => setActiveTab('learning')}
                    className="px-3.5 py-2 text-xs font-semibold bg-[#10b981]/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-950/30 rounded-xl transition-colors shrink-0 flex items-center gap-1"
                  >
                    <GraduationCap size={14} />
                    <span>Learning Center</span>
                  </button>
                </div>
              </div>

              {/* Executive Summary Widget */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Consensus Gauge Card */}
                <div className="lg:col-span-1">
                  <ConfidenceGauge 
                    score={currentResult.confidenceScore} 
                    verdict={currentResult.verdict} 
                  />
                </div>

                {/* Narrative Summary Outline */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs uppercase font-mono tracking-widest text-zinc-500 mb-3 block">Committee Executive Summary</h3>
                    <p className="text-sm text-zinc-200 leading-relaxed font-sans font-medium">
                      {currentResult.summary}
                    </p>
                  </div>

                  {/* Highlights overview */}
                  <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 bg-zinc-900/60 rounded-xl border border-white/5">
                      <span className="font-mono text-[10px] uppercase text-zinc-500 block">Sizing Guideline</span>
                      <p className="font-bold text-white text-sm mt-1">{currentResult.riskAssessment.sizingLimit}</p>
                    </div>
                    <div className="p-3.5 bg-zinc-900/60 rounded-xl border border-white/5">
                      <span className="font-mono text-[10px] uppercase text-zinc-500 block">Stop-Loss Parameters</span>
                      <p className="font-bold text-rose-450 text-sm mt-1">{currentResult.riskAssessment.stopLoss}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* High-Fidelity Details: Technical Bull/Bear Metrics vs Adversarial Risk Assessments */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="analysis-core-cards">
                <FinancialInsightCard result={currentResult} />
                <RiskScoreCard result={currentResult} />
              </div>

              {/* Target Asset Class Collateral Section (Real-World Bullion and Blockchain Coins verification) */}
              <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-zinc-950/40 p-1 flex flex-col md:flex-row items-stretch select-none" id="real-coins-collateral">
                {/* Left side text with abstract details */}
                <div className="p-6 md:w-1/2 flex flex-col justify-between relative z-10">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono uppercase bg-yellow-500/10 text-yellow-500 border border-yellow-500/25 px-2 py-0.5 rounded font-bold">Asset Spot Matrix</span>
                    <h3 className="font-display font-extrabold text-white text-xl">Real-World Reference Collateral</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      Our adversarial engine maps target vectors directly against liquid physical and cryptographic indexes. Verify physical storage indicators, bullion backing standards, and digital ledger allocations.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-[#0c0e0d] border border-white/5 p-3 rounded-xl">
                      <span className="text-[9px] text-zinc-500 font-mono block">CUSTODY PROVENANCE</span>
                      <span className="text-xs font-bold text-white font-mono mt-1 block">UTXO & Vaulted Spot</span>
                    </div>
                    <div className="bg-[#0c0e0d] border border-white/5 p-3 rounded-xl">
                      <span className="text-[9px] text-zinc-500 font-mono block">AUDITED COVERAGE</span>
                      <span className="text-xs font-bold text-emerald-400 font-mono mt-1 block">Certified Reserve Audits</span>
                    </div>
                  </div>
                </div>

                {/* Right side beautifully showing real coins / gold bars */}
                <div className="md:w-1/2 relative min-h-[180px] overflow-hidden rounded-xl border border-white/5">
                  <img 
                    src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80" 
                    alt="Glistening Physical Bitcoin and Wealth Bullion" 
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#070908] via-[#070908]/40 to-transparent hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070908] via-transparent to-transparent md:hidden" />
                  
                  {/* Neon node overlay indicator */}
                  <div className="absolute bottom-4 right-4 bg-black/95 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-mono font-bold text-white uppercase tracking-widest">Spot Ledger Certified</span>
                  </div>
                </div>
              </div>

              {/* Interactive Retail Education Definitions Block */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Info size={16} className="text-cyan-400" />
                  <h4 className="font-display font-semibold text-white">Interactive Glossary Footnotes</h4>
                </div>
                <EducationCard result={currentResult} />
              </div>
            </motion.div>
          )}


          {/* ==========================================
              D. THE COUNCIL MEMBERS (AGENT LIST)
          ========================================== */}
          {activeTab === 'agents' && (
            <motion.div
              key="agents"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 relative"
              id="agents-profiles"
            >
              {/* Subtle neural matrix backdrop image */}
              <div 
                className={`absolute inset-0 bg-cover bg-center pointer-events-none -m-5 lg:-m-8 rounded-3xl transition-opacity duration-500 ${theme === 'dark' ? 'bg-[url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80")] opacity-5' : 'bg-[url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80")] opacity-[0.035]'}`} 
                style={{ 
                  maskImage: 'radial-gradient(circle, black 35%, transparent 80%)', 
                  WebkitMaskImage: 'radial-gradient(circle, black 35%, transparent 80%)' 
                }}
              />

              <div className="text-center max-w-2xl mx-auto py-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#10b981]">Committee Rosters</span>
                <h2 className="font-display font-extrabold text-3xl text-white mt-1.5">The specialized Agents of FinCouncil</h2>
                <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                  Each committee member is guided by separate prompt sets and rigorous system parameters to construct diverse viewpoints and identify flaws.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {INITIAL_AGENTS.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} isActive={false} />
                ))}
              </div>
            </motion.div>
          )}


          {/* ==========================================
              E. LEARNING CENTER / ACADEMY
          ========================================== */}
          {activeTab === 'learning' && (
            <motion.div
              key="learning"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 relative"
              id="academy-cradles"
            >
              {/* Subtle study workspace backdrop image */}
              <div 
                className={`absolute inset-0 bg-cover bg-center pointer-events-none -m-5 lg:-m-8 rounded-3xl transition-opacity duration-500 ${theme === 'dark' ? 'bg-[url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80")] opacity-5' : 'bg-[url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80")] opacity-[0.035]'}`} 
                style={{ 
                  maskImage: 'radial-gradient(circle, black 35%, transparent 80%)', 
                  WebkitMaskImage: 'radial-gradient(circle, black 35%, transparent 80%)' 
                }}
              />

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-6 gap-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400">FinAcademy Suite</span>
                  <h2 className="font-display font-extrabold text-3xl text-white mt-1.5 leading-none">Personalized Learning Academy</h2>
                  <p className="text-xs text-zinc-400 mt-1">Read the custom articles crafted by the Education Agent and test your knowledge utilizing interactive quizzes.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('dashboard')} 
                  className="px-4 py-2 bg-emerald-400 text-black text-xs font-bold rounded-lg hover:bg-emerald-300 transition-colors"
                >
                  Run New Assessment Term
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {INSTANT_LESSONS.map((lesson) => (
                  <InteractiveLessonCard key={lesson.id} lesson={lesson} theme={theme} />
                ))}
              </div>
            </motion.div>
          )}


          {/* ==========================================
              F. SYSTEM ARCHITECTURE PAGE
          ========================================== */}
          {activeTab === 'architecture' && (
            <motion.div
              key="architecture"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 relative"
              id="system-blueprints"
            >
              {/* Subtle cloud servers backdrop image */}
              <div 
                className={`absolute inset-0 bg-cover bg-center pointer-events-none -m-5 lg:-m-8 rounded-3xl transition-opacity duration-500 ${theme === 'dark' ? 'bg-[url("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80")] opacity-5' : 'bg-[url("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80")] opacity-[0.035]'}`} 
                style={{ 
                  maskImage: 'radial-gradient(circle, black 35%, transparent 80%)', 
                  WebkitMaskImage: 'radial-gradient(circle, black 35%, transparent 80%)' 
                }}
              />

              {/* Architecture Title Block */}
              <div className="border-b border-white/5 pb-6">
                <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400">Technical Spec Matrix</span>
                <h2 className={`font-display font-extrabold text-3xl mt-1.5 leading-none ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>FinCouncil AI Blueprint &amp; System Flow</h2>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'}`}>Under the hood of the sequential deliberation loops, MCP data routers, and Gemini Context models.</p>
              </div>

              {/* Interactive Vector Workflow Graphic */}
              <div className={`glass-panel p-6 rounded-2xl border border-white/10 transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950/40' : 'bg-white'}`} id="architectural-blueprint-graphic">
                <h4 className={`text-xs uppercase tracking-wider font-mono mb-4 flex items-center gap-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  <Layers size={14} className="text-emerald-400" />
                  System Blueprint Diagram
                </h4>

                <div className={`flex flex-col lg:flex-row items-center justify-between gap-6 py-6 border border-dashed rounded-xl p-4 transition-colors duration-300 ${theme === 'dark' ? 'border-white/5 bg-zinc-950/40' : 'border-zinc-200 bg-slate-50'}`}>
                  
                  {/* Web Client Frame */}
                  <div className={`w-full lg:w-1/4 p-4 rounded-xl border border-emerald-500/25 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0d100e]' : 'bg-emerald-50/20'} text-center`}>
                    <span className="text-[9px] text-zinc-500 font-mono tracking-wider block">UI PORTAL</span>
                    <h5 className={`font-display font-bold text-xs mt-1 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>SaaS Interface Layout</h5>
                    <p className={`text-[10px] font-sans leading-snug mt-1.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'}`}>Client posts query inputs (e.g., &quot;Buy NVDA?&quot;)</p>
                    <div className="mt-3.5 flex justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="text-zinc-500 transform lg:rotate-0 rotate-90 my-2">
                    <ArrowRight size={20} className="text-emerald-500" />
                  </div>

                  {/* ADK Orchestrator Node */}
                  <div className={`w-full lg:w-1/3 p-4 rounded-xl border border-blue-500/25 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0f18]' : 'bg-blue-50/20'} text-center relative`}>
                    <div className="absolute top-1.5 right-1.5 flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    </div>
                    <span className="text-[9px] text-[#3b82f6] font-mono tracking-wider block">ADK AGENT CONTROLLER</span>
                    <h5 className={`font-display font-bold text-xs mt-1 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Session Context Loop &amp; Sequencer</h5>
                    <p className={`text-[10px] leading-snug mt-1.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'}`}>Executes steps (Executive → Market → News → Risk → Committee → Education) sequential context accumulation.</p>
                    
                    <div className={`mt-4 pt-3 border-t text-[9px] font-mono text-zinc-500 flex justify-between ${theme === 'dark' ? 'border-white/5' : 'border-zinc-200'}`}>
                      <span>Pro 2.5 context frame</span>
                      <span>Flash fast reasoning</span>
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="text-zinc-500 transform lg:rotate-0 rotate-90 my-2">
                    <ArrowRight size={20} className="text-emerald-500" />
                  </div>

                  {/* MCP Data Access Node */}
                  <div className={`w-full lg:w-1/4 p-4 rounded-xl border border-yellow-500/25 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#120f09]' : 'bg-yellow-50/25'} text-center`}>
                    <span className="text-[9px] text-yellow-400 font-mono tracking-wider block">MCP DATA CONNECTOR</span>
                    <h5 className={`font-display font-bold text-xs mt-1 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Live Telemetry Adapter</h5>
                    <p className={`text-[10px] leading-snug mt-1.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'}`}>Siphons real-time transcript scrapes, news trends &amp; market vectors.</p>
                    <span className={`text-[9px] font-mono mt-2 block py-1.5 rounded border transition-colors duration-300 ${theme === 'dark' ? 'bg-yellow-950/20 text-yellow-500 border-yellow-500/10' : 'bg-yellow-100/60 text-yellow-800 border-yellow-300 font-bold'}`}>Read/Write Context Protocol</span>
                  </div>

                </div>
              </div>

              {/* Detailed Breakdown Panels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="architect-breakdowns">
                {[
                  {
                    title: 'ADK (Agent Development Kit)',
                    desc: 'A modular, event-driven agent layout facilitating explicit functional separation. Rather than single generic prompts, ADK maps custom system guides, dialogue biases, and expected output parameters to individual nodes.',
                    bullets: ['Hardened adversarial focus', 'Modular system directive registers', 'Integrated state machine routing'],
                    color: 'from-blue-500/5 to-transparent border-blue-500/20'
                  },
                  {
                    title: 'MCP (Model Context Protocol)',
                    desc: 'The communication layer enabling AI models to safely index real-time datasets. MCP adapters integrate with public secure APIs to pull actual earnings call transcripts, macro-economic yields, and news signals without manual data-entry.',
                    bullets: ['Dynamic schema definitions', 'Pre-authorized secure credentials', 'On-demand context inclusion'],
                    color: 'from-yellow-400/5 to-transparent border-yellow-500/20'
                  },
                  {
                    title: 'Dual Gemini 2.5 Integration',
                    desc: 'We utilize Google Gemini 2.5 Pro for deep multi-asset qualitative reasoning and policy analysis, coupled with Gemini 2.5 Flash for rapid intermediate transcript synthesis and vocabulary breakdown.',
                    bullets: ['Extremly high context token limits', 'Low latency agent discussions', 'Superb logical structure fidelity'],
                    color: 'from-emerald-500/5 to-transparent border-emerald-500/20'
                  }
                ].map((spec, index) => (
                  <div key={index} className={`glass-panel p-5 rounded-2xl border bg-gradient-to-b ${spec.color} flex flex-col justify-between`}>
                    <div>
                      <h4 className={`font-display font-bold text-base leading-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{spec.title}</h4>
                      <p className={`text-xs leading-relaxed mt-2.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>{spec.desc}</p>
                    </div>

                    <div className={`mt-5 pt-4 border-t space-y-1.5 ${theme === 'dark' ? 'border-white/5' : 'border-zinc-200'}`}>
                      {spec.bullets.map((b, bIdx) => (
                        <div key={bIdx} className={`flex items-center gap-1.5 text-xs ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                          <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  </div>
  );
}

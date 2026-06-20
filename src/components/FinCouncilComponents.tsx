import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  TrendingUp, 
  Newspaper, 
  GraduationCap, 
  CheckCircle2, 
  HelpCircle, 
  Activity, 
  FileText, 
  Brain, 
  ChevronRight, 
  AlertTriangle, 
  Percent, 
  Award, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Zap,
  BookOpen,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Agent, AnalysisResult, DebateMessage, Lesson } from '../types';

// Helper to render agent icon
export function getAgentIcon(id: string, size = 20) {
  switch (id) {
    case 'executive': return <Brain size={size} className="text-emerald-400" />;
    case 'market': return <TrendingUp size={size} className="text-blue-400" />;
    case 'news': return <Newspaper size={size} className="text-yellow-400" />;
    case 'risk': return <ShieldAlert size={size} className="text-rose-400" />;
    case 'committee': return <MessageSquare size={size} className="text-purple-400" />;
    case 'education': return <GraduationCap size={size} className="text-cyan-400" />;
    default: return <Sparkles size={size} className="text-emerald-400" />;
  }
}

// ==========================================
// 1. AGENT CARD COMPONENT
// ==========================================
interface AgentCardProps {
  agent: Agent;
  isActive: boolean;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, isActive }) => {
  const isThinking = agent.status === 'thinking';
  const isCompleted = agent.status === 'completed';

  return (
    <motion.div
      id={`agent-card-${agent.id}`}
      layout
      className={`glass-panel p-5 rounded-xl border relative transition-all duration-300 overflow-hidden ${
        isThinking 
          ? 'border-emerald-500/70 shadow-[0_0_15px_rgba(16,185,129,0.2)] bg-emerald-950/10' 
          : isCompleted 
          ? 'border-emerald-500/20 bg-emerald-950/5' 
          : 'border-white/10 opacity-70 hover:opacity-100'
      }`}
    >
      {/* Background active glow */}
      {isThinking && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <div className="flex items-start justify-between relative z-10">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-zinc-900 border border-white/10 shrink-0">
            {agent.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-white text-base">{agent.name}</h3>
              {isCompleted && (
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              )}
            </div>
            <p className="text-xs text-emerald-400 font-medium font-mono">{agent.role}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="shrink-0">
          {isThinking ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase animate-pulse">
              <Activity size={10} className="animate-spin text-emerald-400" />
              Deliberating
            </span>
          ) : isCompleted ? (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700/50 uppercase">
              Standby
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium text-zinc-500 uppercase">
              Idle
            </span>
          )}
        </div>
      </div>

      <p className="mt-3 text-sm text-zinc-300 leading-relaxed font-sans">{agent.description}</p>

      {/* Task Guidelines / Instructions list */}
      <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
        <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">System Directives:</p>
        <ul className="space-y-1.5">
          {agent.instructions.map((inst, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
              <span className="text-emerald-500 mt-1 shrink-0">→</span>
              <span>{inst}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Streaming Terminal Simulation */}
      {isThinking && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-black/80 rounded-lg border border-emerald-500/20 font-mono text-[11px] text-emerald-400 leading-normal"
        >
          <div className="flex items-center gap-1.5 border-b border-emerald-500/10 pb-1.5 mb-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-emerald-500/50 ml-1">agent_agent_deliberator.sh</span>
          </div>
          <div className="space-y-1">
            <p className="text-emerald-500/60">&gt; RUNNING_AGENT_PIPELINE --role=&quot;{agent.role}&quot;</p>
            <p className="text-emerald-400 animate-pulse">&gt; Analyzing parameters and indexing sources...</p>
            <p className="text-emerald-500/40 font-light">&gt; Computing risk ratios and target projections.</p>
          </div>
        </motion.div>
      )}

      {/* Output summary box when complete */}
      {isCompleted && agent.output && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 bg-zinc-900/40 rounded-lg border border-white/5 font-sans text-xs text-zinc-300 leading-relaxed"
        >
          <div className="flex items-center gap-1 text-emerald-400 font-medium mb-1.5 font-mono">
            <CheckCircle2 size={12} />
            <span>Submitted Report:</span>
          </div>
          {agent.output}
        </motion.div>
      )}
    </motion.div>
  );
};

// ==========================================
// 2. TIMELINE PROGRESSION
// ==========================================
interface AgentTimelineProps {
  agents: Agent[];
  activeIdx: number;
}

export const AgentTimeline: React.FC<AgentTimelineProps> = ({ agents, activeIdx }) => {
  return (
    <div id="committee-timeline" className="glass-panel p-6 rounded-2xl border border-white/10 mb-8 overflow-x-auto">
      <div className="min-w-[640px] relative px-4 py-2">
        {/* Connection Wire Bar */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-zinc-800 -translate-y-1/2 z-0" />
        
        {/* Dynamic active light bar */}
        <div 
          className="absolute top-1/2 left-0 h-[3px] bg-gradient-to-r from-emerald-500 to-emerald-400 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ 
            width: `${Math.min(100, (activeIdx / (agents.length - 1)) * 100)}%`
          }}
        />

        <div className="flex justify-between relative z-10">
          {agents.map((agent, i) => {
            const isDone = i < activeIdx;
            const isCurrent = i === activeIdx;
            const statusLabel = isCurrent ? 'thinking' : isDone ? 'completed' : 'idle';

            return (
              <div key={agent.id} className="flex flex-col items-center">
                {/* Visual node */}
                <motion.div
                  animate={isCurrent ? { scale: [1, 1.15, 1], borderColor: '#10b981' } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 bg-zinc-950 transition-all duration-300 ${
                    isDone 
                      ? 'border-emerald-500 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
                      : isCurrent 
                      ? 'border-emerald-400 text-emerald-400 bg-emerald-950/40' 
                      : 'border-zinc-800 text-zinc-600'
                  }`}
                >
                  {isDone ? <CheckCircle2 size={18} className="text-emerald-400 animate-bounce" /> : agent.avatar}
                </motion.div>

                {/* Info Text */}
                <div className="text-center mt-3">
                  <p className={`text-xs font-semibold font-display ${isCurrent ? 'text-emerald-400 font-bold' : isDone ? 'text-zinc-200' : 'text-zinc-500'}`}>
                    {agent.name.split(' ')[0]}
                  </p>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5 mt-0.5">
                    {statusLabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. CONFIDENCE GAUGE
// ==========================================
interface ConfidenceGaugeProps {
  score: number;
  verdict: string;
}

export const ConfidenceGauge: React.FC<ConfidenceGaugeProps> = ({ score, verdict }) => {
  // SVG circular properties
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Decide colors based on verdict/score
  const getColors = () => {
    if (verdict.includes('Highly Bearish') || verdict.includes('Bearish')) {
      return { text: 'text-rose-400', stroke: 'stroke-rose-500', bg: 'bg-rose-500/10' };
    }
    if (verdict.includes('Neutral')) {
      return { text: 'text-yellow-400', stroke: 'stroke-yellow-500', bg: 'bg-yellow-500/10' };
    }
    return { text: 'text-emerald-400', stroke: 'stroke-emerald-500', bg: 'bg-emerald-500/10' };
  };

  const colors = getColors();

  return (
    <div id="confidence-gauge" className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Absolute glow ring */}
      <div className={`absolute w-32 h-32 rounded-full ${colors.bg} blur-3xl pointer-events-none -top-10 -right-10`} />

      <h4 className="text-xs uppercase tracking-wider text-zinc-500 font-mono mb-4">Committee Consensus Weight</h4>

      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* Background Grey Circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            className="stroke-zinc-850 fill-none"
            strokeWidth="8"
          />
          {/* Active Color Ring */}
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            className={`fill-none ${colors.stroke}`}
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>

        {/* Text inside the circle */}
        <div className="absolute flex flex-col items-center justify-center">
          <motion.span 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-display font-extrabold text-white"
          >
            {score}%
          </motion.span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 mt-1">Confidence</span>
        </div>
      </div>

      <div className="mt-4">
        <span className="text-xs text-zinc-400">Consensus Verdict:</span>
        <div className={`text-xl font-display font-extrabold tracking-tight mt-1 ${colors.text}`}>
          {verdict}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. COMBINED DEBATE PANEL
// ==========================================
interface DebatePanelProps {
  messages: DebateMessage[];
  activeAgentId: string | null;
}

export const DebatePanel: React.FC<DebatePanelProps> = ({ messages, activeAgentId }) => {
  return (
    <div id="debate-panel" className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[520px]">
      <div className="p-4 border-b border-white/10 bg-zinc-900/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <h3 className="font-display font-semibold text-white text-base">Deliberation Feed</h3>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase">
          Live Transcription
        </span>
      </div>

      {/* Messages Feed */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4 bg-zinc-950/40">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => {
            const isCIO = msg.senderId === 'executive';
            const isModerator = msg.senderId === 'committee';

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`flex gap-3 items-start ${isCIO ? 'flex-row' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold select-none shrink-0 ${
                  isCIO 
                    ? 'bg-emerald-950 border border-emerald-500/30' 
                    : isModerator 
                    ? 'bg-purple-950 border border-purple-500/30' 
                    : 'bg-zinc-900 border border-white/10'
                }`}>
                  {msg.avatar}
                </div>

                {/* Content block */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-display font-bold text-zinc-100">{msg.senderName}</span>
                    <span className="text-[9px] font-mono tracking-wide text-zinc-500 uppercase">{msg.senderRole}</span>
                  </div>

                  <div className={`mt-1.5 p-3 rounded-xl text-xs text-zinc-300 leading-relaxed border ${
                    isCIO 
                      ? 'bg-emerald-950/20 border-emerald-500/10' 
                      : isModerator 
                      ? 'bg-purple-950/20 border-purple-500/15 text-purple-200 italic' 
                      : 'bg-zinc-900/40 border-white/5'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Dynamic thinking loading bubble */}
        {activeAgentId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-3 text-zinc-400"
          >
            <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/10 animate-pulse flex items-center justify-center">
              💬
            </div>
            <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-3">
              <div className="flex gap-1.5 justify-center py-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 5. FINANCIAL INSIGHT CARD (VALUATIONS)
// ==========================================
export const FinancialInsightCard: React.FC<{ result: AnalysisResult }> = ({ result }) => {
  return (
    <div id="financial-insights" className="glass-panel p-6 rounded-2xl border border-white/10 h-full">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={18} className="text-emerald-400" />
        <h4 className="font-display font-semibold text-white">Quantitative Valuation Metrics</h4>
      </div>

      <div className="space-y-4">
        {/* Summary note */}
        <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-900/40 p-3 rounded-lg border border-white/5">
          {result.summary}
        </p>

        {/* Bull Case Section */}
        <div className="mt-4">
          <p className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 mb-2">Bullish Accelerators:</p>
          <ul className="space-y-2">
            {result.bullCase.map((item, idx) => (
              <li key={idx} className="flex gap-2 text-xs text-zinc-300">
                <span className="text-emerald-500 font-bold font-mono">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bear Case Section */}
        <div className="mt-4 pt-3 border-t border-white/5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-rose-400 mb-2">Bearish Catalysts:</p>
          <ul className="space-y-2">
            {result.bearCase.map((item, idx) => (
              <li key={idx} className="flex gap-2 text-xs text-zinc-300">
                <span className="text-rose-500 font-bold font-mono">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. RISK AUDIT CARD
// ==========================================
export const RiskScoreCard: React.FC<{ result: AnalysisResult }> = ({ result }) => {
  const isHighRisk = result.riskAssessment.level === 'High';

  return (
    <div id="risk-audit-card" className="glass-panel p-6 rounded-2xl border border-white/10 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert size={18} className="text-rose-400" />
          <h4 className="font-display font-semibold text-white">Adversarial Risk Audit</h4>
        </div>
        <span className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-full border ${
          isHighRisk 
            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
        }`}>
          {result.riskAssessment.level} Risk Rating
        </span>
      </div>

      <div className="space-y-4">
        {/* Safe Position Limits */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-zinc-900/40 rounded-xl border border-white/5">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Max Sizing Limit</span>
            <p className="text-sm font-semibold text-white mt-1">{result.riskAssessment.sizingLimit}</p>
          </div>
          <div className="p-3 bg-zinc-900/40 rounded-xl border border-white/5">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Stop-Loss Parameters</span>
            <p className="text-sm font-semibold text-rose-400 mt-1">{result.riskAssessment.stopLoss}</p>
          </div>
        </div>

        {/* Explicit systemic warnings */}
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">Stress Warning Triggers:</p>
          <ul className="space-y-2">
            {result.riskAssessment.warnings?.map((warning, index) => (
              <li key={index} className="flex items-start gap-2 bg-rose-950/15 border border-rose-500/10 p-2.5 rounded-lg text-xs text-zinc-300">
                <AlertTriangle size={14} className="text-rose-400 shrink-0 mt-0.5" />
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 7. EDUCATION NOTES CARD
// ==========================================
export const EducationCard: React.FC<{ result: AnalysisResult }> = ({ result }) => {
  return (
    <div id="education-card" className="glass-panel p-6 rounded-2xl border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap size={18} className="text-cyan-400" />
        <h4 className="font-display font-semibold text-white">Retail Learning Center (Committee Explanations)</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {result.educationalNotes.map((note, index) => (
          <div key={index} className="p-4 bg-zinc-900/40 rounded-xl border border-white/5 flex flex-col justify-between">
            <div>
              <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/50 rounded-full border border-cyan-500/20">
                Jargon Unpacked
              </span>
              <h5 className="font-display font-bold text-white text-sm mt-2">{note.term}</h5>
              <p className="text-xs text-zinc-400 leading-normal mt-1.5">{note.definition}</p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-zinc-800/40">
              <span className="text-[9px] text-emerald-400 font-mono font-semibold uppercase tracking-widest block mb-1">Actionable Lesson</span>
              <p className="text-xs text-zinc-300 leading-normal">{note.actionableLesson}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 8. INTERACTIVE QUIZ CRADLE
// ==========================================
interface LessonCardProps {
  lesson: Lesson;
  theme?: 'dark' | 'light';
}

export const InteractiveLessonCard: React.FC<LessonCardProps> = ({ lesson, theme = 'dark' }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const handleResetQuiz = () => {
    setSelectedIdx(null);
    setQuizSubmitted(false);
  };

  const isCorrect = selectedIdx === lesson.quiz.correctIndex;

  return (
    <div id={`lesson-${lesson.id}`} className={`glass-panel p-6 rounded-2xl border ${
      theme === 'dark' 
        ? 'border-white/10 bg-zinc-900/20' 
        : 'border-zinc-200 bg-white shadow-sm'
    }`}>
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b ${
        theme === 'dark' ? 'border-zinc-500/10' : 'border-zinc-200'
      }`}>
        <span className={`whitespace-nowrap px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full self-start ${
          theme === 'dark'
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            : 'bg-emerald-50 text-emerald-700 border border-emerald-600/20'
        }`}>
          {lesson.category}
        </span>
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 shrink-0 whitespace-nowrap">
          <span>🏷️ {lesson.difficulty}</span>
          <span>•</span>
          <span>⏱️ {lesson.duration}</span>
        </div>
      </div>

      <h3 className={`font-display text-lg font-bold mt-1 ${
        theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'
      }`}>{lesson.title}</h3>

      <p className={`text-xs leading-relaxed mt-2 italic p-2.5 rounded border ${
        theme === 'dark'
          ? 'text-zinc-400 bg-zinc-900/40 border-white/5'
          : 'text-zinc-650 bg-zinc-50 border-zinc-200'
      }`}>
        &quot;{lesson.summary}&quot;
      </p>

      <div className="mt-4 space-y-3">
        {lesson.content.map((p, i) => (
          <p key={i} className={`text-xs leading-relaxed ${
            theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
          }`}>{p}</p>
        ))}
      </div>

      {/* Quiz Section */}
      <div className={`mt-6 pt-5 border-t ${
        theme === 'dark' ? 'border-white/10' : 'border-zinc-200'
      }`}>
        <div className={`flex items-center gap-1.5 text-xs uppercase tracking-widest font-mono font-semibold mb-3 ${
          theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
        }`}>
          <BookOpen size={14} />
          <span>Interactive Homework Quiz</span>
        </div>
        
        <p className={`text-xs font-semibold mb-3 ${
          theme === 'dark' ? 'text-white' : 'text-zinc-800'
        }`}>{lesson.quiz.question}</p>

        <div className="space-y-2">
          {lesson.quiz.options.map((opt, oIdx) => {
            const isSelected = selectedIdx === oIdx;
            let btnClass = theme === 'dark'
              ? 'bg-zinc-900/40 border-white/5 hover:border-white/20 text-zinc-300'
              : 'bg-white border-zinc-200 hover:border-zinc-300 text-zinc-800 shadow-sm';
            
            if (isSelected) {
              btnClass = quizSubmitted 
                ? isCorrect 
                  ? (theme === 'dark'
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-semibold'
                      : 'bg-emerald-50 border-emerald-500 text-emerald-700 font-semibold')
                  : (theme === 'dark'
                      ? 'bg-rose-500/10 border-rose-500 text-rose-400 font-semibold'
                      : 'bg-rose-50 border-rose-500 text-rose-700 font-semibold')
                : (theme === 'dark'
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 font-semibold'
                    : 'bg-cyan-50 border-cyan-400 text-cyan-800 font-semibold');
            } else if (quizSubmitted && oIdx === lesson.quiz.correctIndex) {
              btnClass = theme === 'dark'
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 font-semibold'
                : 'bg-emerald-50 border-emerald-500 text-emerald-700 font-semibold'; // Show correct answer
            }

            return (
              <button
                key={oIdx}
                disabled={quizSubmitted}
                onClick={() => setSelectedIdx(oIdx)}
                className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all duration-200 cursor-pointer flex justify-between items-center ${btnClass}`}
              >
                <span>{opt}</span>
                {quizSubmitted && oIdx === lesson.quiz.correctIndex && (
                  <CheckCircle2 size={12} className={theme === 'dark' ? 'text-emerald-400 shrink-0' : 'text-emerald-600 shrink-0'} />
                )}
              </button>
            );
          })}
        </div>

        {/* Actions & Explanations */}
        <div className={`mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border ${
          theme === 'dark'
            ? 'bg-zinc-900/20 border-white/5'
            : 'bg-zinc-50 border-zinc-200'
        }`}>
          {!quizSubmitted ? (
            <>
              <span className="text-[10px] text-zinc-500 font-mono">Select an option to test your literacy:</span>
              <button
                disabled={selectedIdx === null}
                onClick={() => setQuizSubmitted(true)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors ${
                  selectedIdx !== null 
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-black cursor-pointer' 
                    : theme === 'dark'
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            </>
          ) : (
            <div className="w-full">
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-bold ${
                  isCorrect 
                    ? (theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700')
                    : (theme === 'dark' ? 'text-rose-400' : 'text-rose-700')
                }`}>
                  {isCorrect ? '✓ Correct Answer!' : '✗ Oops, try again!'}
                </span>
                <button 
                  onClick={handleResetQuiz}
                  className={`text-[10px] hover:underline font-mono ${
                    theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
                  }`}
                >
                  Reset quiz
                </button>
              </div>
              <p className={`text-[11px] leading-relaxed font-sans mt-1 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                <span className={`font-semibold ${
                  theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'
                }`}>Explanation:</span> {lesson.quiz.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

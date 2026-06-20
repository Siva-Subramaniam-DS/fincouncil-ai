import { Agent, AnalysisResult, RecommendedPrompt, Lesson } from './types';

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'executive',
    name: 'Executive Agent',
    role: 'Chief Investment Officer',
    avatar: '💼',
    description: 'Coordinates the committee, synthesizes multi-agent viewpoints, and drives final strategic consensus.',
    instructions: [
      'Sets target objectives for the specific financial request.',
      'Sifts through multi-faceted suggestions and resolves agent deadlock.',
      'Produces the high-level operational brief and investment thesis.'
    ],
    status: 'idle'
  },
  {
    id: 'market',
    name: 'Market Agent',
    role: 'Quantitative Lead & Valuation Modeler',
    avatar: '📈',
    description: 'Deep dives into charts, financial statements, valuation ratios, and technical price signals.',
    instructions: [
      'Calculates core performance metrics (PEG, forward P/E, debt-to-equity).',
      'Provides definitive support/resistance levels, momentum scores, and price target bounds.',
      'Identifies quantitative trends and volume divergences.'
    ],
    status: 'idle'
  },
  {
    id: 'news',
    name: 'News & Sentiment Agent',
    role: 'Global Intelligence Broadcaster & Narrative Catalyst Tracker',
    avatar: '📰',
    description: 'Scrapes earnings transcripts, parses financial media, and quantifies public narrative sentiment ratios.',
    instructions: [
      'Monitors corporate transcripts, leadership shifts, and regulatory filings.',
      'Measures and screens bullish vs. bearish social media sentiment volumes.',
      'Identifies macro catalysts (AI demand, supply chains, chip fabrications).'
    ],
    status: 'idle'
  },
  {
    id: 'risk',
    name: 'Risk Agent',
    role: 'Chief Risk Management Officer',
    avatar: '🛡️',
    description: 'Challenges bullish assumptions, computes extreme stress tests, and mandates position parameters.',
    instructions: [
      'Outlines risk stress tests (inflation spike, regulatory bans, competitor breakthroughs).',
      'Establishes maximum prudent sizing guidelines and exact stop-loss thresholds.',
      'Provides warning triggers to alert the committee regarding systemic traps.'
    ],
    status: 'idle'
  },
  {
    id: 'committee',
    name: 'Committee Agent',
    role: 'Deliberation Facilitator & Debate Moderator',
    avatar: '🏛️',
    description: 'Moderates structured debates between agents, challenges consensus, and stimulates critical thinking.',
    instructions: [
      'Ensures every agent defends their claims against fierce counter-arguments.',
      'Bridges opinions together by triggering dynamic cross-agent dialogues.',
      'Actively acts to prevent dangerous default groupthink.'
    ],
    status: 'idle'
  },
  {
    id: 'education',
    name: 'Education Agent',
    role: 'Financial Literacy & Retail Coach',
    avatar: '🎓',
    description: 'Clarifies complex jargon, provides context, and creates personalized financial literacy checkpoints.',
    instructions: [
      'Translates intimidating Wall Street metrics into plain English for normal investors.',
      'Extracts key definitions (CoWoS, Forward P/E, Standard Deviation) in mid-deliberation.',
      'Compiles immediate takeaways and customized learning recommendations.'
    ],
    status: 'idle'
  }
];

export const SUGGESTED_PROMPTS: RecommendedPrompt[] = [
  {
    id: 'nvda',
    text: 'Should I buy NVDA?',
    icon: '🚀',
    category: 'Equity Growth'
  },
  {
    id: 'msft-btc',
    text: 'Compare MSFT and BTC',
    icon: '⚖️',
    category: 'Asset Allocation'
  },
  {
    id: 'retirement',
    text: 'Build a retirement plan',
    icon: '👵',
    category: 'Financial Planning'
  }
];

export const MOCK_ANALYSES: Record<string, AnalysisResult> = {
  nvda: {
    query: 'Should I buy NVDA?',
    confidenceScore: 84,
    verdict: 'Slightly Bullish',
    summary: 'The committee recognizes NVIDIA\'s unprecedented dominant ecosystem in AI computing standard hardware, fortified by the proprietary CUDA software stack and state-of-the-art Blackwell / Hopper architectures. However, short-term valuation margins are highly compressed, pricing in significant multi-year sequential growth with minimal safety margin. Extreme dependency on foundry bottlenecks (TSMC/CoWoS packing) remains a risk catalyst.',
    bullCase: [
      'Unmatched market share (~90%) in enterprise-tier AI GPU hardware pipelines.',
      'CUDA ecosystem acts as an extremely sticky software moat, presenting massive barriers of entry for AMD and Intel.',
      'Blackwell rollout is tracking full capacities with deep order books from global hyperscalers.',
      'Excellent return on equity (ROE) and operating margins exceeding 55%.'
    ],
    bearCase: [
      'Extremely high forward valuation multiples (Forward P/E ~42x) leave the security vulnerable to high volatility on minor misses.',
      'Severe hardware supply chain bottlenecks driven by high TSMC CoWoS packaging limitations.',
      'Hyperscaler capital expenditure cycles might slow down if generative AI consumer monetizations take longer to mature.',
      'Geopolitical tensions surrounding Taiwan fabrication plants threaten operational continuity.'
    ],
    riskAssessment: {
      level: 'High',
      sizingLimit: '3% to 5% of overall asset portfolio',
      stopLoss: '$112.50 (supporting standard deviation breakout boundary)',
      warnings: [
        'Geopolitical risk regarding Taiwanese foundry dependency.',
        'High margin expectations where minor forward projection adjustments lead to 15%+ drawdowns.',
        'Intense heat around cooling infrastructure supply limitations.'
      ]
    },
    educationalNotes: [
      {
        term: 'Forward P/E Ratio',
        definition: 'A version of the price-to-earnings (P/E) ratio that uses forecasted earnings over the next 12 months rather than historic trailing data.',
        actionableLesson: 'Always check if the projected growth matches the high ratio. An expensive forward P/E relative to peer averages means you are paying a premium for expected future performance.'
      },
      {
        term: 'CoWoS (Chip-on-Wafer-on-Substrate)',
        definition: 'An advanced 2.5D packaging technology developed by TSMC that allows multi-die high-bandwidth memory configuration on a single silicon carrier.',
        actionableLesson: 'Companies can have infinite software demand, but physical engineering constraints (like fab slot limits) set the real ceiling on current quarter distributions.'
      },
      {
        term: 'CUDA (Compute Unified Device Architecture)',
        definition: 'NVIDIA\'s proprietary parallel computing platform and programming model that allows developers to run general-purpose computations on GPUs.',
        actionableLesson: 'Software integrations are often sticker and harder to displace than raw hardware. Look for hardware ecosystems that have an inseparable software layer.'
      }
    ],
    debateHistory: [
      {
        senderId: 'executive',
        senderName: 'Executive Agent',
        senderRole: 'Chief Investment Officer',
        avatar: '💼',
        content: 'Initiating specific committee review for NVIDIA (NVDA). Current price hover warrants deep evaluation of forward growth margins vs risk parameters. Market Agent, walk us through the quantitative metrics.'
      },
      {
        senderId: 'market',
        senderName: 'Market Agent',
        senderRole: 'Quantitative Lead',
        avatar: '📈',
        content: 'My model forecasts high double-digit earnings growth, with a conservative Forward P/E of 42x. Operating margins have skyrocketed past 55% as scale efficiencies take effect. Technical momentum displays a strong relative strength index (RSI 58) with support at $115. Valuation calculations imply fair value range of $135 - $145 based on projected Blackwell shipments.'
      },
      {
        senderId: 'news',
        senderName: 'News & Sentiment Agent',
        senderRole: 'Global Intelligence',
        avatar: '📰',
        content: 'Qualitative transcripts confirm hyperscalers (Microsoft, Meta, AWS) are increasing AI capex by 25% YoY. Signal ratio is 4.2 Bullish elements to Bearish indicators. However, earnings transcripts mention persistent bottlenecks in advanced packaging.'
      },
      {
        senderId: 'committee',
        senderName: 'Committee Agent',
        senderRole: 'Debate Moderator',
        avatar: '🏛️',
        content: 'Excellent data alignment. But let\'s avoid uniform agreement. Risk Agent, poke holes in this growth narrative immediately. What happens if TSMC packaging fails, or capital expenditure peaks?'
      },
      {
        senderId: 'risk',
        senderName: 'Risk Agent',
        senderRole: 'Chief Risk Officer',
        avatar: '🛡️',
        content: 'The bullish case relies heavily on zero friction. In our extreme stress-tests (e.g. 10% reduction in TSMC CoWoS capacity or a minor hyperscaler pause), NVDA multiple contracts to 30x, provoking a rapid 30% price drawdown. Risk rating is HIGH. I mandate a strict 3% - 5% sizing cap with a technical stop-loss trigger at $112.50 to preserve capital.'
      },
      {
        senderId: 'committee',
        senderName: 'Committee Agent',
        senderRole: 'Debate Moderator',
        avatar: '🏛️',
        content: 'Market Agent, how do you reconcile a high price target with this severe geopolitical and foundry tail-risk?'
      },
      {
        senderId: 'market',
        senderName: 'Market Agent',
        senderRole: 'Quantitative Lead',
        avatar: '📈',
        content: 'That is valid. But NVDA is diversifying fabrication nodes to Samsung and Intel potentially by 2027. CUDA locked-in software makes AMD migration highly impractical for enterprise clusters. The risk is high, but the premium is fundamentally justified.'
      },
      {
        senderId: 'education',
        senderName: 'Education Agent',
        senderRole: 'Retail Coach',
        avatar: '🎓',
        content: 'Investors, let\'s highlight what\'s happening here. Forward P/E measures future price earnings ratio. The debate details that while profits are growing fast, a high premium translates to rapid drops if anything delays CoWoS advanced physical chip packaging.'
      },
      {
        senderId: 'executive',
        senderName: 'Executive Agent',
        senderRole: 'Chief Investment Officer',
        avatar: '💼',
        content: 'Understood. We reach a collective consensus: Slightly Bullish outlook. High conviction on technology superiority, but strict guardrails on positioning limits (max 5%) and stop loss parameters active.'
      }
    ]
  },
  'msft-btc': {
    query: 'Compare MSFT and BTC',
    confidenceScore: 78,
    verdict: 'Neutral',
    summary: 'An intra-portfolio struggle between ultra-stability enterprise equity and speculative macro-hedging digital liquidity. Microsoft (MSFT) provides high predictable recurring revenues, heavy corporate cloud integration, and a pivotal OpenAI stake, yielding high defensiveness. Bitcoin (BTC) is an asymmetric hedge acting on gloabal M2 money supply, displaying high beta, major cyclical drawdowns, and high potential upside. The committee favors a blended core-and-satellite strategy over binary execution.',
    bullCase: [
      'MSFT: Unrivaled enterprise cloud SaaS dominance (Azure) and solid pricing power with Copilot subscriptions.',
      'BTC: Institutional adoption via Spot ETFs promotes sustained long-term wealth inflows.',
      'MSFT: Robust capital returns (dividends and consistent buybacks) acting as reliable cash generation.',
      'BTC: Absolute algorithmic scarcity (21M cap) serves as a potent hedge against global monetary devaluations.'
    ],
    bearCase: [
      'MSFT: Maturing growth rate in Azure might disappoint investors paying high premium multiples (~32x Forward P/E).',
      'BTC: Subject to volatile regulatory restrictions and severe multi-quarter drawdowns (exceeding 60% historically).',
      'MSFT: Massive hardware capital expenditures threaten margins in the medium term.',
      'BTC: Generates zero operating yield, cashflow, or earnings metrics, operating purely on supply/demand and liquidity.'
    ],
    riskAssessment: {
      level: 'Medium',
      sizingLimit: 'MSFT: Up to 12% | BTC: Up to 4% (allocation based on risk profile)',
      stopLoss: 'BTC: Keep dynamic trailing stop-loss | MSFT: $385 (macro cloud support trendline)',
      warnings: [
        'Over-correlation during systemic equity sell-offs (liquidity events).',
        'Regulatory shifts in crypto custody and sovereign stablecoin policies.',
        'Slowing corporate digital spending cycles.'
      ]
    },
    educationalNotes: [
      {
        term: 'M2 Money Supply',
        definition: 'A measure of the money supply that includes cash, checking deposits, and easily convertible near-money assets like savings deposits.',
        actionableLesson: 'Assets like Bitcoin often move in tandem with global liquidity adjustments. When M2 spikes, speculative scarce assets tend to benefit significantly.'
      },
      {
        term: 'Beta Metric',
        definition: 'A measure of an asset\'s volatility relative to the broader market index (generally the S&P 500, which has a Beta of 1.0).',
        actionableLesson: 'A beta of 1.2 is moderately volatile; but Bitcoin exhibits a rolling annualized beta of 2.0+, indicating giant swings that demand high psychological discipline.'
      },
      {
        term: 'Recurring Software Revenues',
        definition: 'SaaS business model where clients subscribe regularly, creating steady cash predictability contrasted with one-off retail sales.',
        actionableLesson: 'Steady subscription streams secure MSFT from severe economic downturns since companies rarely cancel critical infrastructure like cloud services.'
      }
    ],
    debateHistory: [
      {
        senderId: 'executive',
        senderName: 'Executive Agent',
        senderRole: 'Chief Investment Officer',
        avatar: '💼',
        content: 'Today we address an allocation dilemma. Is it wiser to deploy capital into enterprise stable growth like MSFT, or digital scarce assets like BTC? Market Agent, compare the numbers.'
      },
      {
        senderId: 'market',
        senderName: 'Market Agent',
        senderRole: 'Quantitative Lead',
        avatar: '📈',
        content: 'MSFT is a fortress: Revenue of $245B, beta of 1.15, free cash flow margins of ~30%. However, growth is steady (12% CAGR). BTC has an annual volatility of 50%+, but compound annual growth rates have beaten global indices 8 of the last 10 years. BTC is completely uncorrelated with corporate debt.'
      },
      {
        senderId: 'news',
        senderName: 'News & Sentiment Agent',
        senderRole: 'Global Intelligence',
        avatar: '📰',
        content: 'Institutional momentum lists BTC spot ETF net inflows exceeding $18B. News triggers depict positive regulation. Conversely, Azure growth stories are highly saturated, making surprise positive earnings rarer.'
      },
      {
        senderId: 'committee',
        senderName: 'Committee Agent',
        senderRole: 'Debate Moderator',
        avatar: '🏛️',
        content: 'We are pitting static yieldless digital gold against highly useful corporate intelligence software. Risk Agent, lay out the traps. What happens when severe macro liquidity tightens?'
      },
      {
        senderId: 'risk',
        senderName: 'Risk Agent',
        senderRole: 'Chief Risk Officer',
        avatar: '🛡️',
        content: 'In severe global credit crunches, correlation goes to 1. BTC drops first and fastest as hedge funds cover margin calls—downside stress is 55%. MSFT has a AAA credit rating (higher than the US govt), allowing it to borrow cheap even in recessions. I advise: use MSFT as your defensive core (12% limit) and BTC as a satellite returns accelerator (max 4% limit).'
      },
      {
        senderId: 'education',
        senderName: 'Education Agent',
        senderRole: 'Retail Coach',
        avatar: '🎓',
        content: 'This represents an essential lesson: Portfolio Construction! Combining low-volatility recurring yield with highly asymmetric asset class volatility maximizes long-term Sharpe Ratio performance.'
      },
      {
        senderId: 'executive',
        senderName: 'Executive Agent',
        senderRole: 'Chief Investment Officer',
        avatar: '💼',
        content: 'Perfect synthesis. We declare a Neutral-Blended consensus. Do not choose between them; run a 75/25 relative balance to diversify foundational safety with global asset distribution.'
      }
    ]
  },
  retirement: {
    query: 'Build a retirement plan',
    confidenceScore: 92,
    verdict: 'Bullish',
    summary: 'The committee unanimously endorses a robust, automated multi-decade wealth accumulation system. The strategy optimizes compounding by utilizing low-cost index funds, dividend growth Aristocrats, and progressive tax-advantaged accounts (Roth IRA / 401k), shifting actively into short-duration debt instruments as the distribution target phase nears to insulate against market drawdowns.',
    bullCase: [
      'Historical compounding rates of global diversified equities (S&P 500, MSCI) averaging 8-10% annually.',
      'Automated dollar-cost averaging (DCA) completely removes emotional market-timing mistakes.',
      'Reinvested dividends compound exponentially over multi-year horizons.',
      'Dynamic rebalancing mitigates retirement sequence-of-returns risk.'
    ],
    bearCase: [
      'Persistently high inflation metrics can erode real Purchasing Power of conservative static fixed budgets.',
      'Prolonged Japanese-style sideways indices could disrupt early-stage withdrawal projections.',
      'Underfunded public security benefits may lead to higher future capital gains tax liabilities.'
    ],
    riskAssessment: {
      level: 'Low',
      sizingLimit: '100% of long-term life savings allocation, diversified across indices and safe debt',
      stopLoss: 'No speculative stop-loss; utilize systematic rebalancing bands',
      warnings: [
        'Sequence of returns risk: A major crash immediately before retirement is the most critical threat.',
        'Heavy cash concentration that lags behind CPI inflation metrics.',
        'High management fees from expensive active funds.'
      ]
    },
    educationalNotes: [
      {
        term: 'Sequence of Returns Risk',
        definition: 'The danger that the timing of market drawdowns will damage an investor\'s overall portfolio value, specifically if negative returns occur early in the withdrawal phase.',
        actionableLesson: 'Transition a portion of your wealth to fixed cash bonds or Treasury bills 3-5 years prior to retirement to avoid being forced to liquidate shares at market bottoms.'
      },
      {
        term: 'Dollar-Cost Averaging (DCA)',
        definition: 'The practice of investing a fixed dollar amount on a regular, automated schedule, regardless of whether prices are high or low.',
        actionableLesson: 'This mathematically guarantees you purchase more shares when prices are cheap, and fewer shares when they are historically expensive.'
      },
      {
        term: 'Dividend Aristocrat',
        definition: 'An S&P 500 company that has successfully increased its dividend payouts every single year for at least 25 consecutive years.',
        actionableLesson: 'Aristocrats offer reliable income streams and robust balance sheets, functioning as structural anchors during market volatility.'
      }
    ],
    debateHistory: [
      {
        senderId: 'executive',
        senderName: 'Executive Agent',
        senderRole: 'Chief Investment Officer',
        avatar: '💼',
        content: 'We are designing a lifetime financial trajectory. This is about stability, predictable compounding, and sequence management. Market Agent, outline the optimal asset allocations.'
      },
      {
        senderId: 'market',
        senderName: 'Market Agent',
        senderRole: 'Quantitative Lead',
        avatar: '📈',
        content: 'For a three-decade horizon, we use 80% diversified equities (such as low-fee S&P 500, dividend growth funds) and 20% international & real estate. As the target retirement year approaches, we systematically transition 3% annually toward capital preservation yields.'
      },
      {
        senderId: 'news',
        senderName: 'News & Sentiment Agent',
        senderRole: 'Global Intelligence',
        avatar: '📰',
        content: 'Our demographic indexes confirm high global lifespans. Traditional calculations must now plan for 30+ years in retirement, which makes pure cash or low-interest savings plans highly dangerous due to compound cost inflation.'
      },
      {
        senderId: 'risk',
        senderName: 'Risk Agent',
        senderRole: 'Chief Risk Officer',
        avatar: '🛡️',
        content: 'I agree. Inflation is the silent wealth killer. Our stress-test shows that 3% historical inflation cuts purchasing power in half over 24 years. We must hedge with global assets and high yield vehicles. However, sequence risk is high. Dynamic rebalancing is required to avoid selling down equity during severe market corrections.'
      },
      {
        senderId: 'committee',
        senderName: 'Committee Agent',
        senderRole: 'Debate Moderator',
        avatar: '🏛️',
        content: 'Education Agent, how do we express these complex sequence dynamics so that anyone can construct this without panic?'
      },
      {
        senderId: 'education',
        senderName: 'Education Agent',
        senderRole: 'Retail Coach',
        avatar: '🎓',
        content: 'Explain it simply: use three financial buckets: Red (immediate, cash/yield for 2 years), Yellow (intermediate, growth income 5 years), Green (long-term equity growth). This takes the emotional stress out of retirement.'
      },
      {
        senderId: 'executive',
        senderName: 'Executive Agent',
        senderRole: 'Chief Investment Officer',
        avatar: '💼',
        content: 'Perfect. We endorse the Three-Bucket automated retirement framework. Highly recommended structural baseline.'
      }
    ]
  }
};

export const INSTANT_LESSONS: Lesson[] = [
  {
    id: 'l1',
    title: 'Understanding Multi-Agent Systems in Fintech',
    category: 'Trading Metrics',
    difficulty: 'Intermediate',
    duration: '6 mins',
    summary: 'Discover how specialized AI roles prevent groupthink and stress-test modern investment theses.',
    content: [
      'In traditional finance, human analysts often fall victim to confirmation bias, searching only for information that validates their initial buy rating.',
      'Multi-Agent architectures solve this by assigning adversarial personas. For example, the Risk Agent is hard-coded to actively dismantle the Market Agent\'s valuation assumptions.',
      'The Deluxe Committee facilitates this debate, ensuring that opposing indicators (e.g., supply chain bottle necks and geopolitical shifts) are weighed objectively before committing asset capital.'
    ],
    quiz: {
      question: 'What is the primary cognitive advantage of employing a multi-agent framework over a single AI query?',
      options: [
        'Multi-agent processes run faster on standard computers.',
        'It generates different adversarial viewpoints to prevent confirmation bias and groupthink.',
        'It eliminates the need for any financial risk assessments.',
        'It guarantees 100% profitable stock selections.'
      ],
      correctIndex: 1,
      explanation: 'By setting up hardcoded adversarial roles (like Risk vs. Growth), multi-agent systems force structured deliberation, simulating active committee reviews.'
    }
  },
  {
    id: 'l2',
    title: 'Demystifying Advanced Semiconductor Supply Chains',
    category: 'Macro',
    difficulty: 'Advanced',
    duration: '8 mins',
    summary: 'An exploration of CoWoS packaging, wafer fabrication fab slots, and modern foundry geopolitical risks.',
    content: [
      'Modern artificial intelligence relies on extreme parallel computing. This requires specialized packaging where memory sits directly next to logic units.',
      'Taiwan Semiconductor Manufacturing Company (TSMC) dominates this via CoWoS (Chip-on-Wafer-on-Substrate). Physical limits on these machinery lines dictate the world\'s entire supply of high-end GPUs.',
      'When evaluating growth giants like NVIDIA, analysts must monitor actual physical foundry bottlenecks as closely as software sales forecasts.'
    ],
    quiz: {
      question: 'What does CoWoS stand for, and why is it a bottleneck for AI chip scaling?',
      options: [
        'Consumer Wafer Systems; it is highly expensive to sell to retail buyers.',
        'Chip-on-Wafer-on-Substrate; it is a complex physical packaging constraint that limits supply speed.',
        'Cloud Oriented Web Operating Software; it lacks support for Linux hosts.',
        'Coordinated Wafer Storage; it requires immense storage facilities.'
      ],
      correctIndex: 1,
      explanation: 'CoWoS is high precision 2.5D packaging. Even if silicon wafers are printed quickly, putting the memory and processor together requires physical CoWoS machines, creating a supply hard-cap.'
    }
  },
  {
    id: 'l3',
    title: 'Managing Sequence of Returns Risk',
    category: 'Risk Management',
    difficulty: 'Advanced',
    duration: '5 mins',
    summary: 'How to calculate safety buffers to protect lifetime portfolios from immediate pre-retirement crashes.',
    content: [
      'If market crashes occur when you are 35, you have decades to wait out the rebound. However, if a crash occurs during your first year of retirement, it is catastrophic.',
      'Liquidation during a bear market means your principal shrinks so rapidly that future rebounds cannot compound enough capital back to sustain your retirement budget.',
      'Building sequence protection involves creating safe liquid cash buffers, utilizing dividend-paying equities, or dynamically adjusting capital weightings.'
    ],
    quiz: {
      question: 'Which investor suffers the worst impact from Sequence of Returns Risk?',
      options: [
        'An investor who experiences a severe market correction 20 years before their expected retirement.',
        'An investor who compounds returns steadily at 7% every year.',
        'An investor who experiences a massive market crash immediately before or during their early withdrawal years.',
        'An investor who holds 100% gold and cash across their entire lifetime.'
      ],
      correctIndex: 2,
      explanation: 'Experiencing a major bear market right when you stop saving and start withdrawing forces you to lock in permanent paper losses, permanently reducing your retirement horizon.'
    }
  }
];

export function generateCustomAnalysis(customQuery: string): AnalysisResult {
  const confidence = Math.floor(Math.random() * 20) + 70; // 70-90
  const verdicts: Array<AnalysisResult['verdict']> = ['Slightly Bullish', 'Neutral', 'Bullish', 'Slightly Bullish'];
  const verdict = verdicts[Math.floor(Math.random() * verdicts.length)];
  
  return {
    query: customQuery,
    confidenceScore: confidence,
    verdict: verdict,
    summary: `The Committee conducted an ad-hoc deliberation regarding "${customQuery}". The consensus highlights a balanced outlook, emphasizing structural industry tailwinds accompanied by macro uncertainties and inflationary valuation multiples.`,
    bullCase: [
      `Strong sector-specific tailwinds and expanding global total addressable market (TAM).`,
      `Resilient margin profiles and operational scalability inherent in modern technology paradigms.`,
      `Accelerating digital integrations and automation adoption trends.`,
      `High free cash flow generation potential compared to legacy sector competitors.`
    ],
    bearCase: [
      `Imminent regulatory changes concerning enterprise compliance and data protection.`,
      `Macro susceptibility towards high interest rate fluctuations and credit tightning.`,
      `Heightened client concentration or customer churn risk under competitive pricing wars.`,
      `Possibility of physical logistics friction or international trade tariff implementations.`
    ],
    riskAssessment: {
      level: 'Medium',
      sizingLimit: '2% to 4% core model weight',
      stopLoss: '8% below current local technical support levels',
      warnings: [
        'Sudden competitive innovations from aggressive startups.',
        'Potential geopolitical or raw resource supply friction channels.',
        'Sensitivity toward changes in overall global liquidity cycles.'
      ]
    },
    educationalNotes: [
      {
        term: 'Ad-hoc Portfolio Weighting',
        definition: 'The calculated asset allocation percentage assigned to a specific dynamic position base, tailored to the security\'s systemic risk metrics.',
        actionableLesson: 'Always bound high-beta allocations to smaller weights to protect your portfolio\'s foundational base from unexpected drawdown clusters.'
      },
      {
        term: 'Total Addressable Market (TAM)',
        definition: 'The overall revenue opportunity that is available to a company\'s products or services if they achieved 100% market share.',
        actionableLesson: 'TAM defines the absolute speed limits of growth. Ensure a company is entering massive expanding oceans rather than minor highly congested lakes.'
      }
    ],
    debateHistory: [
      {
        senderId: 'executive',
        senderName: 'Executive Agent',
        senderRole: 'Chief Investment Officer',
        avatar: '💼',
        content: `I have called an emergency session to analyze: "${customQuery}". Let us establish quick findings. Market Agent, initiate the parameters.`
      },
      {
        senderId: 'market',
        senderName: 'Market Agent',
        senderRole: 'Quantitative Lead',
        avatar: '📈',
        content: `Analyzing digital asset arrays. Moving averages indicate high support density. However, systemic beta calculations remain high, demanding premium discount rates.`
      },
      {
        senderId: 'news',
        senderName: 'News & Sentiment Agent',
        senderRole: 'Global Intelligence',
        avatar: '📰',
        content: `Media indexing indicates overall high engagement with positive catalyst ratios. But the narrative is slightly overloaded with retail focus, signaling dynamic volatility risk.`
      },
      {
        senderId: 'risk',
        senderName: 'Risk Agent',
        senderRole: 'Chief Risk Officer',
        avatar: '🛡️',
        content: `High risk detected. We must challenge this optimism. Position sizing should under no circumstances exceed 4%. Technical stops are absolutely mandatory here to bypass sudden capital erosion.`
      },
      {
        senderId: 'committee',
        senderName: 'Committee Agent',
        senderRole: 'Debate Moderator',
        avatar: '🏛️',
        content: `We have outlined clear boundaries. Education Agent, summarize the takeaways for retail tracking before we submit final decisions.`
      },
      {
        senderId: 'education',
        senderName: 'Education Agent',
        senderRole: 'Retail Coach',
        avatar: '🎓',
        content: 'Focus on Total Addressable Market (TAM) and defensive positioning limits to isolate the asset without risking foundational capital security.'
      },
      {
        senderId: 'executive',
        senderName: 'Executive Agent',
        senderRole: 'Chief Investment Officer',
        avatar: '💼',
        content: `Understood. Generating and certifying advisory verdict now. Let\'s deliver our synthesized recommendation to the user.`
      }
    ]
  };
}

import { Question, UITheme, ThemeId, Language } from './types';

// Buy Me a Coffee configuration
export const BUY_ME_A_COFFEE_URL = 'https://buymeacoffee.com/aigeniestudio';

export const TRANSLATIONS = {
  [Language.EN]: {
    start: "Reveal Your 2025",
    subtitle: "Review your year. Write the next chapter.",
    joined: "14,203 reflections completed.",
    styleTitle: "Visual Style",
    styleSub: "Choose the vibe for your era.",
    confirmStyle: "Confirm Aesthetic",
    back: "Back",
    next: "Next",
    finish: "Finalize",
    skip: "Skip",
    exit: "Exit",
    onboardingTitle: "Before You Begin",
    onboarding1: "This questionnaire is adapted from one of the most recognized year-in-review frameworks used globally for personal reflection. It keeps the original structure and adds updated questions on finance and AI.",
    onboarding2: "Set aside at least ten quiet minutes for yourself. Answer honestly and without rushing.",
    onboarding3: "You may skip questions, but no more than ten. Multiple choice is allowed, but we encourage you to write your own answers.",
    onboarding4: "At the end, you’ll receive a personalized report that integrates all your answers into clear insights, themes, and opportunities. Take your time. This is for you.",
    onboardingBtn: "Analyze Me",
    onboardingTap: "Tap to reveal",
  },
  [Language.ES]: {
    start: "Revelar Mi Arquetipo",
    subtitle: "Más que un resumen. Una auditoría psicológica de tu 2025.",
    joined: "14,203 personajes analizados hoy.",
    styleTitle: "Estilo Visual",
    styleSub: "Elige la estética de tu era.",
    confirmStyle: "Confirmar Estilo",
    back: "Atrás",
    next: "Siguiente",
    finish: "Finalizar",
    skip: "Saltar",
    exit: "Salir",
    onboardingTitle: "Antes de Empezar",
    onboarding1: "Este cuestionario está adaptado de uno de los marcos de revisión anual más reconocidos a nivel mundial. Mantiene la estructura original y añade cinco preguntas actualizadas sobre finanzas e IA.",
    onboarding2: "Reserva al menos diez minutos de tranquilidad para ti. Responde con honestidad y sin prisas.",
    onboarding3: "Puedes saltar preguntas, pero no más de diez. Se permite la opción múltiple, pero te animamos a escribir tus propias respuestas.",
    onboarding4: "Al final, recibirás un informe personalizado que integra todas tus respuestas en ideas claras, temas y oportunidades. Tómate tu tiempo.",
    onboardingBtn: "Analízame",
    onboardingTap: "Toca para continuar",
  },
  [Language.PT]: {
    start: "Revelar Meu Arquétipo",
    subtitle: "Não é só um resumo. É uma auditoria psicológica de 2025.",
    joined: "14,203 personagens analisados hoje.",
    styleTitle: "Estilo Visual",
    styleSub: "Escolha a vibe da sua era.",
    confirmStyle: "Confirmar Estilo",
    back: "Voltar",
    next: "Próximo",
    finish: "Finalizar",
    skip: "Pular",
    exit: "Sair",
    onboardingTitle: "Antes de Começar",
    onboarding1: "Este questionário é adaptado de um dos frameworks de revisão anual mais reconhecidos globalmente. Mantém a estrutura original e adiciona cinco perguntas atualizadas sobre finanças e IA.",
    onboarding2: "Reserve pelo menos dez minutos de silêncio para você. Responda honestamente e sem pressa.",
    onboarding3: "Você pode pular perguntas, mas não mais que dez. Múltipla escolha é permitida, mas encorajamos você a escrever suas próprias respostas.",
    onboarding4: "No final, você receberá um relatório personalizado que integra todas as suas respostas em insights claros, temas e oportunidades. Leve o seu tempo.",
    onboardingBtn: "Me Analise",
    onboardingTap: "Toque para continuar",
  },
  [Language.CN]: {
    start: "生成我的年度人设",
    subtitle: "拒绝流水账。这是对你 2025 的深度心理审计。",
    joined: "今日已有 14,203 份档案生成。",
    styleTitle: "视觉风格",
    styleSub: "选择你的年度氛围。",
    confirmStyle: "确认风格",
    back: "返回",
    next: "下一题",
    finish: "完成",
    skip: "跳过",
    exit: "退出",
    onboardingTitle: "开始之前",
    onboarding1: "本问卷改编自全球最受认可的年度回顾框架。保留了原有结构，并新增了关于财务和AI的关键问题——这两个领域塑造了现代增长和长期主导权。",
    onboarding2: "请为自己留出至少十分钟安静的时间。诚实回答，不要匆忙。",
    onboarding3: "你可以跳过问题，但最多不超过十个。我们提供了快捷选项，但更鼓励你写下自己的答案。",
    onboarding4: "最终，你将获得一份个性化报告，将你的所有回答整合为清晰的洞察、主题和机会。慢慢来，这是属于你的时刻。",
    onboardingBtn: "开始分析",
    onboardingTap: "点击继续",
  },
  [Language.JP]: {
    start: "私のアーキタイプを診断",
    subtitle: "単なる振り返りではありません。2025年の心理監査です。",
    joined: "今日、14,203人のキャラクターが分析されました。",
    styleTitle: "ビジュアルスタイル",
    styleSub: "あなたの時代の雰囲気を選んでください。",
    confirmStyle: "スタイルを確定",
    back: "戻る",
    next: "次へ",
    finish: "完了",
    skip: "スキップ",
    exit: "終了",
    onboardingTitle: "始める前に",
    onboarding1: "このアンケートは、世界的に認知された年間レビューの枠組みを適応させたものです。元の構造を維持しつつ、金融とAIに関する5つの質問を追加しました。",
    onboarding2: "少なくとも10分間、静かな時間を確保してください。正直に、急がずに答えてください。",
    onboarding3: "質問をスキップすることはできますが、10問までです。多肢選択も可能ですが、自分の言葉で書くことをお勧めします。",
    onboarding4: "最後に、すべての回答を明確な洞察、テーマ、機会に統合したパーソナライズされたレポートを受け取ります。自分のために時間をかけてください。",
    onboardingBtn: "分析を開始",
    onboardingTap: "タップして続ける",
  }
};

export const FORTUNE_MESSAGES: Record<Language, string[]> = {
  [Language.EN]: [
    "Your 2026 plot armor is thickening.",
    "Leave the cringe in 2025.",
    "Main Character Energy loading...",
    "The glow up is scheduled for Q1 2026.",
    "Trust the algorithm of the universe.",
    "A canon event is approaching."
  ],
  [Language.ES]: [
    "Tu armadura de trama para 2026 se está engrosando.",
    "Deja el 'cringe' en 2025.",
    "Cargando energía de protagonista...",
    "El 'glow up' está programado para el Q1 2026.",
    "Confía en el algoritmo del universo."
  ],
  [Language.PT]: [
    "Sua armadura de enredo para 2026 está ficando forte.",
    "Deixe o 'cringe' em 2025.",
    "Carregando energia de protagonista...",
    "O 'glow up' está agendado para o Q1 2026.",
    "Confie no algoritmo do universo."
  ],
  [Language.CN]: [
    "2026 年，你会感谢现在的自己。",
    "别回头，精彩的都在后面。",
    "你的 2025 只是预告片，正片即将上映。",
    "该断的断，该舍的舍，2026 满血复活。",
    "宇宙正在为你重新洗牌。",
    "主角光环充能中..."
  ],
  [Language.JP]: [
    "2026年のプロットアーマーが強化されています。",
    "2025年の恥は置いていきましょう。",
    "主人公エネルギー充填中...",
    "グローアップは2026年第1四半期に予定されています。",
    "宇宙のアルゴリズムを信じて。",
    "カノンイベントが近づいています。"
  ]
};

export const THEMES: Record<ThemeId, UITheme> = {
  [ThemeId.POP_GLASS]: {
    id: ThemeId.POP_GLASS,
    name: 'Pop Glass',
    description: 'Clean, bubbly, and optimistic.',
    bgClass: 'bg-blue-50',
    cardClass: 'glass-panel text-slate-800',
    fontDisplay: 'font-display',
    fontBody: 'font-sans',
    textClass: 'text-slate-900',
    textSecondaryClass: 'text-slate-500',
    buttonClass: 'bg-blue-600 text-white shadow-lg hover:bg-blue-700',
    chipClass: 'bg-white/50 border border-white/40 backdrop-blur-sm text-slate-700 hover:bg-white',
    inputClass: 'bg-white/50 border-b-2 border-slate-200 focus:border-blue-500 text-slate-900 placeholder:text-slate-400',
    progressBarClass: 'bg-blue-500',
    progressBarBgClass: 'bg-blue-200',
    accentColorClass: 'text-blue-600'
  },
  [ThemeId.TURRELL]: {
    id: ThemeId.TURRELL,
    name: 'Neon Void',
    description: 'Deep, atmospheric, and cinematic.',
    bgClass: 'bg-black',
    cardClass: 'bg-black/40 border border-white/10 backdrop-blur-xl text-white',
    fontDisplay: 'font-grand', // Changed to Anton (Grand)
    fontBody: 'font-mono', // Keep mono for body contrast
    textClass: 'text-white',
    textSecondaryClass: 'text-white/60',
    buttonClass: 'bg-fuchsia-600 text-white shadow-[0_0_20px_rgba(192,38,211,0.5)] hover:bg-fuchsia-500',
    chipClass: 'bg-white/5 border border-white/20 text-white hover:bg-white/10',
    inputClass: 'bg-transparent border-b-2 border-white/20 focus:border-fuchsia-500 text-white placeholder:text-white/30',
    progressBarClass: 'bg-fuchsia-500 shadow-[0_0_10px_#d946ef]',
    progressBarBgClass: 'bg-gray-800',
    accentColorClass: 'text-fuchsia-400'
  },
  [ThemeId.JOURNAL]: {
    id: ThemeId.JOURNAL,
    name: 'The Journal',
    description: 'Classic, tactical, and grounded.',
    bgClass: 'bg-[#F2F0E9]', // Bone white/paper
    cardClass: 'bg-white border-2 border-stone-800 shadow-hard text-stone-900',
    fontDisplay: 'font-serif',
    fontBody: 'font-serif',
    textClass: 'text-stone-900',
    textSecondaryClass: 'text-stone-600',
    buttonClass: 'bg-stone-900 text-stone-50 shadow-none hover:bg-stone-700',
    chipClass: 'bg-[#F2F0E9] border-2 border-stone-300 text-stone-900 font-bold hover:border-stone-900 hover:bg-white',
    inputClass: 'bg-transparent border-b-2 border-stone-300 focus:border-stone-900 text-stone-900 placeholder:text-stone-400 font-serif',
    progressBarClass: 'bg-stone-900',
    progressBarBgClass: 'bg-stone-300',
    accentColorClass: 'text-stone-500 italic'
  }
};

// Updated List based on user request (46 Questions)
// Questions 1-20 (Image 1), 21-40 (Image 2), 41-46 (Text)
const QUESTIONS_BASE: Question[] = [
  { id: 1, text: "What did you do this year that you’d never done before?", category: "Experiences", options: ["Traveled solo", "Learned a new skill", "Quit a job", "Started a business", "Fell in love"], placeholder: "Something new..." },
  { id: 2, text: "Did you keep your new year’s resolutions?", category: "Goals", options: ["Yes, nailed it", "Partially", "No", "I didn't make any"] },
  { id: 3, text: "Did anyone close to you give birth?", category: "Family & Life", options: ["Yes", "No"] },
  { id: 4, text: "Did anyone close to you die?", category: "Family & Life", options: ["Yes", "No"] },
  { id: 5, text: "What cities/states/countries did you visit?", category: "Travel", options: ["Asia", "Europe", "North America", "South America", "Staycation"], placeholder: "List your map..." },
  { id: 6, text: "What would you like to have next year that you lacked this year?", category: "Desires", options: ["Money", "Time", "Love", "Peace", "Health", "Purpose"] },
  { id: 7, text: "What date(s) from this year will remain etched upon your memory, and why?", category: "Moments", placeholder: "A specific day..." },
  { id: 8, text: "What was your biggest achievement of the year?", category: "Highs", options: ["Career growth", "Personal growth", "Survival", "Creativity"], placeholder: "Big or small..." },
  { id: 9, text: "What was your biggest failure?", category: "Lows", options: ["Burnout", "A broken relationship", "A missed opportunity", "Financial loss"], placeholder: "Be honest..." },
  { id: 10, text: "What other hardships did you face?", category: "Lows", options: ["Loneliness", "Anxiety", "Health issues", "Family drama"], placeholder: "Struggles, obstacles..." },
  { id: 11, text: "Did you suffer illness or injury?", category: "Health", options: ["Yes (Physical)", "Yes (Mental)", "Both", "None"] },
  { id: 12, text: "What was the best thing you bought?", category: "Material", options: ["Tech/Gadget", "Experience/Trip", "Course/Education", "Clothing"], placeholder: "Worth every penny..." },
  { id: 13, text: "Whose behavior merited celebration?", category: "People", options: ["My partner", "My parents", "My best friend", "Myself"], placeholder: "Who impressed you?" },
  { id: 14, text: "Whose behavior made you appalled?", category: "People", options: ["A politician", "A boss", "An ex", "A fake friend"], placeholder: "Who let you down?" },
  { id: 15, text: "Where did most of your money go?", category: "Finance", options: ["Rent/Bills", "Food & Drink", "Travel", "Shopping", "Savings"], placeholder: "Top expense..." },
  { id: 16, text: "What did you get really, really, really excited about?", category: "Joy", options: ["A trip", "A concert", "A new job", "A release"], placeholder: "A release, an event, a moment..." },
  { id: 17, text: "What song will always remind you of this year?", category: "Music", placeholder: "Your 2025 Anthem..." },
  { id: 18, text: "Compared to this time last year, are you: happier or sadder? Thinner or fatter? Richer or poorer?", category: "Comparison", options: ["Happier", "Sadder", "Richer", "Poorer", "Fitter", "Softer"] },
  { id: 19, text: "What do you wish you’d done more of?", category: "Regrets", options: ["Exercising", "Reading", "Saving money", "Connecting with friends", "Sleeping"], placeholder: "Time with friends, sleep, work..." },
  { id: 20, text: "What do you wish you’d done less of?", category: "Regrets", options: ["Doomscrolling", "Worrying", "Working overtime", "Pleasing others", "Spending"], placeholder: "Worrying, scrolling, working..." },
  
  // Phase 2
  { id: 21, text: "How are you spending the holidays?", category: "Closing Out", options: ["Family gathering", "Friendsmas", "Solo & Chill", "Traveling"], placeholder: "Plans..." },
  { id: 22, text: "Did you fall in love this year?", category: "Love", options: ["Yes!", "No", "With myself", "It's complicated"] },
  { id: 23, text: "Do you hate anyone now that you didn’t hate this time last year?", category: "Relationships", options: ["Yes", "No", "Indifferent now"] },
  { id: 24, text: "What was your favorite show?", category: "Culture Diet", placeholder: "TV Series..." },
  { id: 25, text: "What was the best book you read?", category: "Culture Diet", placeholder: "Title..." },
  { id: 26, text: "What was your greatest musical discovery of the year?", category: "Culture Diet", placeholder: "Artist or Genre..." },
  { id: 27, text: "What was your favorite film?", category: "Culture Diet", placeholder: "Movie title..." },
  { id: 28, text: "What was your favorite meal?", category: "Sensory", placeholder: "Dish and place..." },
  { id: 29, text: "What did you want and get?", category: "Wins", options: ["A new job", "Peace of mind", "A specific item", "Closure"], placeholder: "A goal achieved..." },
  { id: 30, text: "What did you want and not get?", category: "Losses", options: ["Lottery win", "A promotion", "A relationship", "More time"], placeholder: "Missed opportunities..." },
  { id: 31, text: "What did you do on your birthday?", category: "Milestones", options: ["Big party", "Intimate dinner", "Cried", "Worked", "Traveled"], placeholder: "Celebration details..." },
  { id: 32, text: "What one thing would have made your year immeasurably more satisfying?", category: "Reflection", options: ["More money", "More time", "A partner", "Better health"], placeholder: "A missing piece..." },
  { id: 33, text: "How would you describe your personal fashion this year?", category: "Style", options: ["Comfort first", "Minimalist", "Experimental", "Corporate", "Goblincore"], placeholder: "Aesthetic, colors, vibe..." },
  { id: 34, text: "What kept you sane?", category: "Survival", options: ["Friends", "Therapy", "Memes", "Coffee", "My pet"], placeholder: "A hobby, a person, a habit..." },
  { id: 35, text: "Which celebrity/public figure did you admire the most?", category: "Inspiration", placeholder: "Who did you look up to?" },
  { id: 36, text: "What political issue stirred you the most?", category: "Worldview", placeholder: "Local or global..." },
  { id: 37, text: "Who did you miss?", category: "Longing", placeholder: "Name them..." },
  { id: 38, text: "Who was the best new person you met?", category: "Connection", placeholder: "A new friend..." },
  { id: 39, text: "What valuable life lesson did you learn this year?", category: "Wisdom", options: ["Trust your gut", "Health is wealth", "Nothing is permanent", "Focus on yourself"], placeholder: "The moral of the story..." },
  { id: 40, text: "What is a quote that sums up your year?", category: "Summary", placeholder: "Your tagline..." },

  // New Finance & AI Section
  { id: 41, text: "What was your biggest financial win or failure this year?", category: "Money", options: ["Saved a lot", "Paid off debt", "Invested well", "Overspent", "Lost money"], placeholder: "Profit or Loss..." },
  { id: 42, text: "What new income stream did you build or begin exploring?", category: "Money", options: ["Side hustle", "Freelancing", "Investments", "None yet"], placeholder: "New sources..." },
  { id: 43, text: "How did your relationship with money change this year?", category: "Money Mindset", options: ["More anxious", "More confident", "Indifferent", "More strategic"] },
  { id: 44, text: "Which AI tools had the biggest impact on your work or life?", category: "AI & Future", options: ["ChatGPT", "Gemini", "Claude", "Midjourney", "None"], placeholder: "Tools..." },
  { id: 45, text: "What was the most impressive thing AI helped you accomplish?", category: "AI & Future", options: ["Writing/Editing", "Coding", "Brainstorming", "Planning/Org", "Nothing"], placeholder: "Project or task..." },
  { id: 46, text: "What role do you want AI to play in your life next year?", category: "AI & Future", options: ["Co-pilot", "Teacher", "Automator", "Minimal role"] }
];

// Simplified Chinese Translations with Options
const QUESTIONS_CN: Question[] = [
  { id: 1, text: "今年你做了哪些从未做过的事？", category: "体验", options: ["独自旅行", "学会新技能", "辞职", "创业", "坠入爱河"], placeholder: "新爱好、新地方、新感觉..." },
  { id: 2, text: "你遵守了去年的新年决心吗？", category: "目标", options: ["是的，完美达成", "部分达成", "没有", "我没立flag"] },
  { id: 3, text: "身边有亲友生孩子了吗？", category: "生活", options: ["有", "没有"] },
  { id: 4, text: "身边有亲友离世了吗？", category: "生活", options: ["有", "没有"] },
  { id: 5, text: "你去了哪些城市/国家？", category: "旅行", options: ["亚洲", "欧洲", "北美", "国内游", "宅在卧室"], placeholder: "列出你的足迹..." },
  { id: 6, text: "明年你想要拥有哪些今年缺失的东西？", category: "愿望", options: ["钱", "时间", "爱", "平静", "健康", "目标"], placeholder: "时间、金钱、爱、平静..." },
  { id: 7, text: "这一年哪个日子让你刻骨铭心，为什么？", category: "时刻", placeholder: "具体的一天..." },
  { id: 8, text: "今年最大的成就是什么？", category: "高光", options: ["升职加薪", "个人成长", "活着就好", "创作/产出"], placeholder: "无论大小..." },
  { id: 9, text: "今年最大的失败是什么？", category: "低谷", options: ["职业倦怠", "关系破裂", "错失机会", "投资亏损"], placeholder: "诚实一点..." },
  { id: 10, text: "还经历了哪些困难？", category: "挑战", options: ["孤独", "焦虑", "健康问题", "家庭矛盾"], placeholder: "挣扎与障碍..." },
  { id: 11, text: "生病或受伤了吗？", category: "健康", options: ["身体上的", "心理上的", "都有", "没有"] },
  { id: 12, text: "买过最好的东西是什么？", category: "物质", options: ["数码/电子产品", "旅行/体验", "课程/教育", "衣服/包"], placeholder: "物超所值..." },
  { id: 13, text: "谁的行为值得喝彩？", category: "人物", options: ["伴侣", "父母", "最好的朋友", "我自己"], placeholder: "谁让你印象深刻？" },
  { id: 14, text: "谁的行为让你感到震惊/厌恶？", category: "人物", options: ["政客", "老板", "前任", "假朋友"], placeholder: "谁让你失望了？" },
  { id: 15, text: "钱都花哪儿了？", category: "财务", options: ["房租/房贷", "吃喝", "旅行", "购物", "存起来了"], placeholder: "主要开销..." },
  { id: 16, text: "什么事让你超级兴奋？", category: "快乐", options: ["一次旅行", "演唱会", "新工作", "某个发布"], placeholder: "一个瞬间、活动或发布..." },
  { id: 17, text: "哪首歌会让你想起这一年？", category: "音乐", placeholder: "你的2025主题曲..." },
  { id: 18, text: "与去年此时相比，你：更快乐还是难过？更瘦还是更胖？更富还是更穷？", category: "对比", options: ["更快乐", "更难过", "更富", "更穷", "更健康", "更颓废"] },
  { id: 19, text: "你希望自己多做点什么？", category: "遗憾", options: ["运动", "读书", "存钱", "陪朋友", "睡觉"], placeholder: "陪伴朋友、睡觉、工作..." },
  { id: 20, text: "你希望自己少做点什么？", category: "遗憾", options: ["刷手机", "焦虑内耗", "加班", "取悦他人", "乱花钱"], placeholder: "焦虑、刷屏、加班..." },
  
  // Phase 2
  { id: 21, text: "假期怎么过的？", category: "收尾", options: ["家庭聚会", "朋友聚餐", "独自充电", "旅行"], placeholder: "计划..." },
  { id: 22, text: "今年坠入爱河了吗？", category: "爱", options: ["是的！", "没有", "爱上了自己", "一言难尽"] },
  { id: 23, text: "有没有去年不讨厌，今年却讨厌的人？", category: "关系", options: ["有", "没有", "现在无感了"] },
  { id: 24, text: "最喜欢的剧集？", category: "文化", placeholder: "电视剧/综艺..." },
  { id: 25, text: "读过最好的一本书？", category: "文化", placeholder: "书名..." },
  { id: 26, text: "最大的音乐发现？", category: "文化", placeholder: "歌手或流派..." },
  { id: 27, text: "最喜欢的电影？", category: "文化", placeholder: "电影名..." },
  { id: 28, text: "最喜欢的一顿饭？", category: "感官", placeholder: "菜名和地点..." },
  { id: 29, text: "想要且得到了什么？", category: "得", options: ["新工作", "内心的平静", "某样东西", "释怀"], placeholder: "达成的目标..." },
  { id: 30, text: "想要却没得到什么？", category: "失", options: ["中彩票", "升职", "一段关系", "更多时间"], placeholder: "错过的机会..." },
  { id: 31, text: "生日怎么过的？", category: "里程碑", options: ["大派对", "安静晚餐", "大哭一场", "加班", "旅行"], placeholder: "庆祝细节..." },
  { id: 32, text: "哪件事如果发生了，会让你这一年圆满很多？", category: "反思", options: ["更有钱", "更多时间", "有个伴侣", "身体更健康"], placeholder: "缺失的一块拼图..." },
  { id: 33, text: "如何形容你今年的穿搭风格？", category: "风格", options: ["舒适第一", "极简", "实验性/大胆", "职场风", "怎么舒服怎么来"], placeholder: "美学、颜色、氛围..." },
  { id: 34, text: "是什么让你保持理智？", category: "生存", options: ["朋友", "心理咨询", "梗图/Meme", "咖啡", "宠物"], placeholder: "爱好、人、习惯..." },
  { id: 35, text: "最欣赏哪位名人/公众人物？", category: "灵感", placeholder: "你的榜样是谁？" },
  { id: 36, text: "哪个政治/社会议题最触动你？", category: "世界观", placeholder: "本地或全球..." },
  { id: 37, text: "你想念谁？", category: "思念", placeholder: "名字..." },
  { id: 38, text: "认识的最棒的新朋友是谁？", category: "连接", placeholder: "新朋友..." },
  { id: 39, text: "学到了什么宝贵的人生一课？", category: "智慧", options: ["相信直觉", "健康是财富", "没有什么是永恒的", "专注自己"], placeholder: "故事的寓意..." },
  { id: 40, text: "用一句名言/话总结你的一年。", category: "总结", placeholder: "你的标语..." },
  
  // Finance & AI
  { id: 41, text: "今年财务上最大的胜利或失败是什么？", category: "金钱", options: ["存了很多钱", "还清债务", "投资获利", "超支", "投资亏损"], placeholder: "盈利或亏损..." },
  { id: 42, text: "建立了或开始探索什么新的收入来源？", category: "金钱", options: ["副业", "自由职业", "投资理财", "暂时没有"], placeholder: "新的搞钱路子..." },
  { id: 43, text: "你与金钱的关系发生了什么变化？", category: "金钱观", options: ["变得更焦虑", "变得更有底气", "无所谓了", "更有规划了"] },
  { id: 44, text: "哪个AI工具对你的工作/生活影响最大？", category: "AI与未来", options: ["ChatGPT", "Gemini", "Claude", "Midjourney", "无"], placeholder: "列举工具..." },
  { id: 45, text: "AI帮你完成的最令人印象深刻的事情是什么？", category: "AI与未来", options: ["写作/编辑", "写代码", "头脑风暴", "计划/组织", "没啥用"], placeholder: "项目、解决的问题..." },
  { id: 46, text: "明年希望AI在生活中扮演什么角色？", category: "AI与未来", options: ["副驾驶/助手", "老师/导师", "自动化工具", "无关紧要"] }
];

export const QUESTIONS_DB: Record<Language, Question[]> = {
  [Language.EN]: QUESTIONS_BASE,
  [Language.CN]: QUESTIONS_CN,
  // Fallback other languages to English base with prefixes
  [Language.ES]: QUESTIONS_BASE.map(q => ({...q, text: `(ES) ${q.text}`})),
  [Language.PT]: QUESTIONS_BASE.map(q => ({...q, text: `(PT) ${q.text}`})),
  [Language.JP]: QUESTIONS_BASE.map(q => ({...q, text: `(JP) ${q.text}`}))
};
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, ArrowLeft, Play, Info, ExternalLink, RefreshCw } from 'lucide-react';
import gamesData from './games.json';
import { generateLogo } from './logoGenerator';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [customLogo, setCustomLogo] = useState(null);
  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);
  const [currentTheme, setCurrentTheme] = useState({
    name: 'Default',
    primary: 'green-500',
    primaryHover: 'green-400',
    accent: 'green-600',
    shadow: 'rgba(34,197,94,0.3)',
    bg: 'bg-black',
    text: 'text-slate-200',
    heading: 'text-white',
    card: 'bg-slate-900',
    border: 'border-slate-800',
    header: 'bg-slate-900/50'
  });
  const [view, setView] = useState('library'); // 'library' or 'themes'

  const themes = [
    { 
      name: 'Default', 
      primary: 'green-500', 
      primaryHover: 'green-400', 
      accent: 'green-600', 
      shadow: 'rgba(34,197,94,0.3)',
      bg: 'bg-black',
      text: 'text-slate-200',
      heading: 'text-white',
      card: 'bg-slate-900',
      border: 'border-slate-800',
      header: 'bg-slate-900/50'
    },
    { 
      name: 'Cyber', 
      primary: 'sky-400', 
      primaryHover: 'sky-300', 
      accent: 'sky-500', 
      shadow: 'rgba(56,189,248,0.3)',
      bg: 'bg-white',
      text: 'text-sky-600',
      heading: 'text-sky-900',
      card: 'bg-sky-50',
      border: 'border-sky-100',
      header: 'bg-white/80'
    },
    { 
      name: 'Crimson', 
      primary: 'orange-500', 
      primaryHover: 'orange-400', 
      accent: 'orange-600', 
      shadow: 'rgba(249,115,22,0.3)',
      bg: 'bg-red-950',
      text: 'text-orange-200',
      heading: 'text-orange-500',
      card: 'bg-red-900/20',
      border: 'border-orange-500/50',
      header: 'bg-red-950/80'
    },
    { 
      name: 'Royal', 
      primary: 'amber-600', 
      primaryHover: 'amber-500', 
      accent: 'amber-700', 
      shadow: 'rgba(217,119,6,0.3)',
      bg: 'bg-black',
      text: 'text-amber-600',
      heading: 'text-amber-500',
      card: 'bg-zinc-900',
      border: 'border-amber-900/50',
      header: 'bg-black/90'
    },
    { 
      name: 'zesty', 
      primary: 'white', 
      primaryHover: 'slate-200', 
      accent: 'white', 
      shadow: 'rgba(255,255,255,0.5)',
      bg: 'bg-[linear-gradient(to_bottom,#E40303_16.6%,#FF8C00_16.6%_33.3%,#FFED00_33.3%_50%,#008026_50%_66.6%,#24408E_66.6%_83.3%,#732982_83.3%)] bg-fixed',
      text: 'text-white',
      heading: 'text-white',
      card: 'bg-black/30 backdrop-blur-sm',
      border: 'border-white/30',
      header: 'bg-black/40'
    },
    { 
      name: 'opera gx', 
      primary: 'rose-500', 
      primaryHover: 'rose-400', 
      accent: 'fuchsia-600', 
      shadow: 'rgba(244,63,94,0.3)',
      bg: 'bg-zinc-950',
      text: 'text-rose-200',
      heading: 'text-rose-500',
      card: 'bg-black',
      border: 'border-rose-900',
      header: 'bg-zinc-950/90'
    },
  ];

  const handleSetGame = (game) => {
    setSelectedGame(game);
    setView('library');
  };

  const handleGenerateLogo = async () => {
    setIsGeneratingLogo(true);
    try {
      const base64 = await generateLogo();
      if (base64) {
        setCustomLogo(`data:image/png;base64,${base64}`);
      }
    } catch (error) {
      console.error("Failed to generate logo:", error);
    } finally {
      setIsGeneratingLogo(false);
    }
  };

  useEffect(() => {
    handleGenerateLogo();
  }, []);

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} font-sans selection:bg-${currentTheme.primary}/30 transition-colors duration-500`}>
      {/* Header */}
      <header className={`border-b ${currentTheme.border} ${currentTheme.header} backdrop-blur-md sticky top-0 z-50 transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => { setSelectedGame(null); setView('library'); }}
          >
            <div className={`bg-${currentTheme.accent} p-2 rounded-lg transition-colors shadow-[0_0_15px_${currentTheme.shadow}] overflow-hidden relative group`}>
              {isGeneratingLogo ? (
                <div className="w-8 h-8 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 animate-spin text-white" />
                </div>
              ) : (
                <img 
                  src={customLogo || "https://tr.rbxcdn.com/180da672804f58544d6582312676f44d/420/420/Image/Png"} 
                  alt="67 Logo" 
                  className="w-8 h-8 object-contain"
                  referrerPolicy="no-referrer"
                />
              )}
              <button 
                onClick={(e) => { e.stopPropagation(); handleGenerateLogo(); }}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                title="Regenerate Logo"
              >
                <RefreshCw className="w-4 h-4 text-white" />
              </button>
            </div>
            <h1 className={`text-xl font-bold tracking-tighter ${currentTheme.heading} uppercase italic`}>67 games</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
            <button 
              onClick={() => { setSelectedGame(null); setView('library'); }} 
              className={`transition-colors ${view === 'library' ? `text-${currentTheme.primary}` : `hover:text-${currentTheme.primaryHover}`}`}
            >
              Library
            </button>
            <button 
              onClick={() => { setSelectedGame(null); setView('themes'); }} 
              className={`transition-colors ${view === 'themes' ? `text-${currentTheme.primary}` : `hover:text-${currentTheme.primaryHover}`}`}
            >
              Themes
            </button>
            <a href="#" className={`hover:text-${currentTheme.primaryHover} transition-colors`}>Categories</a>
            <a href="#" className={`hover:text-${currentTheme.primaryHover} transition-colors`}>About</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {view === 'themes' ? (
            <motion.div
              key="themes"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="py-12"
            >
              <div className={`mb-12 border-l-4 border-${currentTheme.primary} pl-6`}>
                <h2 className={`text-4xl font-black ${currentTheme.heading} mb-2 uppercase tracking-tighter`}>Visual Themes</h2>
                <p className={`${currentTheme.bg === 'bg-white' ? 'text-slate-600' : 'text-slate-500'} font-medium`}>Customize your interface with a new color palette.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {themes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => setCurrentTheme(theme)}
                    className={`group relative p-8 ${theme.card} border-2 transition-all text-left ${
                      currentTheme.name === theme.name ? `border-${theme.primary}` : `${theme.border} hover:border-slate-700`
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xl font-black ${theme.heading} uppercase tracking-tighter`}>{theme.name}</span>
                      <div className={`w-6 h-6 rounded-full bg-${theme.primary} shadow-[0_0_10px_${theme.shadow}]`} />
                    </div>
                    <div className="flex gap-2">
                      <div className={`h-1 w-full bg-${theme.primary}/20 rounded-full overflow-hidden`}>
                        <div className={`h-full w-2/3 bg-${theme.primary}`} />
                      </div>
                    </div>
                    {currentTheme.name === theme.name && (
                      <div className={`absolute top-2 right-2 text-${theme.primary} text-[10px] font-black uppercase`}>Active</div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : !selectedGame ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`mb-12 border-l-4 border-${currentTheme.primary} pl-6`}>
                <h2 className={`text-4xl font-black ${currentTheme.heading} mb-2 uppercase tracking-tighter`}>Featured Games</h2>
                <p className={`${currentTheme.bg === 'bg-white' ? 'text-slate-600' : 'text-slate-500'} font-medium`}>Hand-picked favorites for you to enjoy.</p>
              </div>

              {gamesData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {gamesData.map((game) => (
                    <motion.div
                      key={game.id}
                      whileHover={{ y: -5 }}
                      className={`group ${currentTheme.card} border ${currentTheme.border} rounded-none overflow-hidden hover:border-${currentTheme.primary} transition-all shadow-lg hover:shadow-${currentTheme.primary}/10`}
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={game.thumbnail} 
                          alt={game.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                          <button 
                            onClick={() => handleSetGame(game)}
                            className={`bg-${currentTheme.primary} text-black px-8 py-3 font-black uppercase tracking-tighter flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all hover:bg-white`}
                          >
                            <Play className="w-4 h-4 fill-current" /> Play Now
                          </button>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className={`text-lg font-bold ${currentTheme.heading} mb-2 uppercase tracking-tight`}>{game.title}</h3>
                        <p className={`text-sm ${currentTheme.bg === 'bg-white' ? 'text-slate-600' : 'text-slate-500'} line-clamp-2 mb-4`}>{game.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-${currentTheme.primary} border border-${currentTheme.primary}/30 px-2 py-1`}>Arcade</span>
                          <button 
                            onClick={() => handleSetGame(game)}
                            className={`${currentTheme.bg === 'bg-white' ? 'text-slate-400' : 'text-slate-600'} hover:text-${currentTheme.primaryHover} transition-colors`}
                          >
                            <Info className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className={`flex flex-col items-center justify-center py-24 ${currentTheme.card} border ${currentTheme.border}`}>
                  <Gamepad2 className={`w-16 h-16 ${currentTheme.bg === 'bg-white' ? 'text-slate-200' : 'text-slate-800'} mb-4`} />
                  <h3 className={`text-xl font-black ${currentTheme.heading} mb-2 uppercase tracking-tighter`}>No games found</h3>
                  <p className={`${currentTheme.bg === 'bg-white' ? 'text-slate-400' : 'text-slate-600'} font-medium`}>Check back later for new additions!</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-${currentTheme.primaryHover} transition-colors group`}
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Library
                </button>
                <div className="flex items-center gap-4">
                  <h2 className={`text-2xl font-black ${currentTheme.heading} uppercase tracking-tighter`}>{selectedGame.title}</h2>
                  <a 
                    href={selectedGame.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 ${currentTheme.bg === 'bg-white' ? 'text-slate-400' : 'text-slate-500'} hover:text-${currentTheme.primaryHover} transition-colors`}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className={`relative aspect-video w-full bg-black shadow-2xl border ${currentTheme.border}`}>
                <iframe 
                  src={selectedGame.url}
                  className="absolute inset-0 w-full h-full border-0"
                  title={selectedGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; gamepad; microphone; focus-without-user-activation; screen-wake-lock"
                  sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups allow-popups-to-escape-sandbox"
                  allowFullScreen
                />
              </div>

              <div className={`${currentTheme.card} border ${currentTheme.border} p-8`}>
                <h3 className={`text-sm font-black text-${currentTheme.primary} uppercase tracking-[0.3em] mb-4`}>About {selectedGame.title}</h3>
                <p className={`${currentTheme.bg === 'bg-white' ? 'text-slate-600' : 'text-slate-400'} leading-relaxed font-medium`}>{selectedGame.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className={`mt-20 border-t ${currentTheme.border} py-16 ${currentTheme.bg} transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 bg-${currentTheme.primary} flex items-center justify-center`}>
              <Gamepad2 className={`w-5 h-5 ${currentTheme.bg === 'bg-white' ? 'text-white' : 'text-black'}`} />
            </div>
            <span className={`font-black ${currentTheme.heading} uppercase italic tracking-tighter`}>67 games</span>
          </div>
          <p className={`${currentTheme.bg === 'bg-white' ? 'text-slate-400' : 'text-slate-700'} text-[10px] uppercase font-bold tracking-widest`}>© 2026 67 games. All rights reserved.</p>
          <div className={`flex gap-8 text-[10px] font-black uppercase tracking-widest ${currentTheme.bg === 'bg-white' ? 'text-slate-400' : 'text-slate-500'}`}>
            <a href="#" className={`hover:text-${currentTheme.primaryHover} transition-colors`}>Privacy</a>
            <a href="#" className={`hover:text-${currentTheme.primaryHover} transition-colors`}>Terms</a>
            <a href="#" className={`hover:text-${currentTheme.primaryHover} transition-colors`}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

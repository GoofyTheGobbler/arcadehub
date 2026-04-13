import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play, Info, ExternalLink, Search } from 'lucide-react';
import gamesData from './games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = gamesData.filter(game => 
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    { 
      name: 'Sapphire', 
      primary: 'blue-500', 
      primaryHover: 'blue-400', 
      accent: 'blue-600', 
      shadow: 'rgba(59,130,246,0.3)',
      bg: 'bg-black',
      text: 'text-blue-400',
      heading: 'text-blue-500',
      card: 'bg-slate-900',
      border: 'border-blue-900/50',
      header: 'bg-black/90'
    },
    { 
      name: 'Hacker', 
      primary: 'emerald-500', 
      primaryHover: 'emerald-400', 
      accent: 'emerald-600', 
      shadow: 'rgba(16,185,129,0.3)',
      bg: 'bg-black',
      text: 'text-emerald-500',
      heading: 'text-emerald-400',
      card: 'bg-black',
      border: 'border-emerald-900/50',
      header: 'bg-black/90'
    },
    { 
      name: 'Void', 
      primary: 'purple-600', 
      primaryHover: 'purple-500', 
      accent: 'purple-700', 
      shadow: 'rgba(147,51,234,0.4)',
      bg: 'bg-black',
      text: 'text-purple-400',
      heading: 'text-purple-500',
      card: 'bg-zinc-950',
      border: 'border-purple-900/50',
      header: 'bg-black/95'
    },
    { 
      name: 'UwU', 
      primary: 'white', 
      primaryHover: 'slate-100', 
      accent: 'white', 
      shadow: 'rgba(255,255,255,0.4)',
      bg: 'bg-pink-400',
      text: 'text-white',
      heading: 'text-white',
      card: 'bg-pink-500/40',
      border: 'border-white/40',
      header: 'bg-pink-400/90'
    },
  ];

  const handleSetGame = (game) => {
    setSelectedGame(game);
    setView('library');
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} font-sans selection:bg-${currentTheme.primary}/30 transition-colors duration-500`}>
      {/* Header */}
      <header className={`border-b ${currentTheme.border} ${currentTheme.header} backdrop-blur-md sticky top-0 z-50 transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => { setSelectedGame(null); setView('library'); setSearchQuery(''); }}
          >
            <div className={`bg-${currentTheme.primary} p-1 rounded-lg transition-colors shadow-[0_0_15px_${currentTheme.shadow}] flex items-center justify-center overflow-hidden`}>
              <img 
                src="global000054e2aa70026d0000015f20.png" 
                alt="Goofy Goober Games Logo" 
                className="w-8 h-8 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className={`text-xl font-bold tracking-tighter ${currentTheme.heading} uppercase italic`}>
              {searchQuery ? `${filteredGames.length} results` : `${gamesData.length} games`}
            </h1>
          </div>

          <div className="relative flex-1 max-w-md mx-4">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${currentTheme.bg === 'bg-white' ? 'text-slate-400' : 'text-slate-500'}`} />
            <input 
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border ${currentTheme.border} ${currentTheme.card} focus:outline-none focus:border-${currentTheme.primary} transition-colors ${currentTheme.text}`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                ×
              </button>
            )}
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
            <button 
              onClick={() => { setSelectedGame(null); setView('library'); setSearchQuery(''); }} 
              className={`transition-colors ${view === 'library' ? `text-${currentTheme.primary}` : `hover:text-${currentTheme.primaryHover}`}`}
            >
              Library
            </button>
            <button 
              onClick={() => { setSelectedGame(null); setView('themes'); setSearchQuery(''); }} 
              className={`transition-colors ${view === 'themes' ? `text-${currentTheme.primary}` : `hover:text-${currentTheme.primaryHover}`}`}
            >
              Themes
            </button>
            <button 
              onClick={() => { setSelectedGame(null); setView('about'); setSearchQuery(''); }} 
              className={`transition-colors ${view === 'about' ? `text-${currentTheme.primary}` : `hover:text-${currentTheme.primaryHover}`}`}
            >
              About
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {view === 'about' ? (
            <motion.div
              key="about"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="py-12"
            >
              <div className={`mb-12 border-l-4 border-${currentTheme.primary} pl-6`}>
                <h2 className={`text-4xl font-black ${currentTheme.heading} mb-2 uppercase tracking-tighter`}>About Goofy Goober Games</h2>
                <p className={`${currentTheme.bg === 'bg-white' ? 'text-slate-600' : 'text-slate-500'} font-medium`}>The ultimate destination for web-based gaming.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className={`${currentTheme.card} border ${currentTheme.border} p-8 space-y-6`}>
                    <h3 className={`text-2xl font-black ${currentTheme.heading} uppercase tracking-tight`}>My Mission</h3>
                    <p className="leading-relaxed">
                      Goofy Goober Games was made because school makes us do work even when we have nothing to do such as reading, free draw, or sit there like a bum. and im a kinda quiet kid with nothing much to do at a random school in the terrible school system in place so use this while you can before you are silenced :D
                    </p>
                  </div>

                  <div className={`${currentTheme.card} border ${currentTheme.border} p-8 space-y-6`}>
                    <h3 className={`text-2xl font-black ${currentTheme.heading} uppercase tracking-tight`}>About the Developer</h3>
                    <p className="leading-relaxed">
                      Im just a quiet kid who gets bored out of his mind a lot, unfortunately i can not tell anyone who i am because i dont want my cheeks getting spanked but i will let you know that i appreciate yall supporting the website ive spent over 24 hours total and only a few people will really know who made this.. maybe your one of them maybe your not ;)
                    </p>
                  </div>

                <div className="space-y-8">
                  <div className={`${currentTheme.card} border ${currentTheme.border} p-8`}>
                    <h3 className={`text-xl font-black ${currentTheme.heading} uppercase tracking-tight mb-4`}>Key Features</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className={`mt-1 w-2 h-2 rounded-full bg-${currentTheme.primary}`} />
                        <span><strong className={currentTheme.heading}>Visual Themes:</strong> Personalize your experience with our built-in theme engine.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className={`mt-1 w-2 h-2 rounded-full bg-${currentTheme.primary}`} />
                        <span><strong className={currentTheme.heading}>Fast Search:</strong> Find your favorite games instantly with our real-time filtering.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className={`mt-1 w-2 h-2 rounded-full bg-${currentTheme.primary}`} />
                        <span><strong className={currentTheme.heading}>Curated Library:</strong> No filler, just high-quality games that work.</span>
                      </li>
                    </ul>
                  </div>

                  <div className={`${currentTheme.card} border-2 border-${currentTheme.primary} p-8 shadow-[0_0_20px_${currentTheme.shadow}]`}>
                    <h3 className={`text-xl font-black ${currentTheme.heading} uppercase tracking-tight mb-2`}>Want to contribute?</h3>
                    <p className={`font-medium mb-6 ${currentTheme.bg === 'bg-white' ? 'text-slate-600' : 'text-slate-400'}`}>if you have a game that you want me to add just let me know because i want to see new games get added so you can be entertained for a few minutes before getting caught :D</p>
                    <a 
                      href="https://docs.google.com/forms/d/e/1FAIpQLSeO6LlDXeJJ5olG5UyTXYmzplrO637iIOyb8lH1KOaXcTPK-w/viewform?usp=preview" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`inline-block bg-transparent border-2 border-${currentTheme.primary} text-${currentTheme.primary} px-6 py-3 font-black uppercase tracking-tighter hover:bg-${currentTheme.primary} hover:text-black transition-all shadow-[0_0_15px_${currentTheme.shadow}]`}
                    >
                      Suggest a Game
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : view === 'themes' ? (
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

              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGames.map((game) => (
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
                  <img 
                    src="global000054e2aa70026d0000015f20.png" 
                    alt="No games" 
                    className="w-24 h-24 object-contain mb-4 opacity-20 grayscale"
                    referrerPolicy="no-referrer"
                  />
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
            <div className={`w-10 h-10 bg-${currentTheme.primary} flex items-center justify-center rounded-lg overflow-hidden p-1`}>
              <img 
                src="global000054e2aa70026d0000015f20.png" 
                alt="Goofy Goober Games Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className={`font-black ${currentTheme.heading} uppercase italic tracking-tighter`}>{gamesData.length} games</span>
          </div>
          <p className={`${currentTheme.bg === 'bg-white' ? 'text-slate-400' : 'text-slate-700'} text-[10px] uppercase font-bold tracking-widest`}>© 2026 Goofy Goober Games. All rights reserved.</p>
          <div className={`flex gap-8 text-[10px] font-black uppercase tracking-widest ${currentTheme.bg === 'bg-white' ? 'text-slate-400' : 'text-slate-500'}`}>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSeO6LlDXeJJ5olG5UyTXYmzplrO637iIOyb8lH1KOaXcTPK-w/viewform?usp=preview" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`hover:text-${currentTheme.primaryHover} transition-colors`}
            >
              Suggest A Game
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

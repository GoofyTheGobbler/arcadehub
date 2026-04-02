import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, ArrowLeft, Play, Info, ExternalLink } from 'lucide-react';
import gamesData from './games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-green-500/30">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setSelectedGame(null)}
          >
            <div className="bg-green-600 p-2 rounded-lg group-hover:bg-green-500 transition-colors shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <Gamepad2 className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-xl font-bold tracking-tighter text-white uppercase italic">67 games</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
            <button onClick={() => setSelectedGame(null)} className="hover:text-green-400 transition-colors">Library</button>
            <a href="#" className="hover:text-green-400 transition-colors">Categories</a>
            <a href="#" className="hover:text-green-400 transition-colors">About</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-12 border-l-4 border-green-500 pl-6">
                <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Featured Games</h2>
                <p className="text-slate-500 font-medium">Hand-picked favorites for you to enjoy.</p>
              </div>

              {gamesData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {gamesData.map((game) => (
                    <motion.div
                      key={game.id}
                      whileHover={{ y: -5 }}
                      className="group bg-slate-900 border border-slate-800 rounded-none overflow-hidden hover:border-green-500 transition-all shadow-lg hover:shadow-green-500/10"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={game.thumbnail} 
                          alt={game.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                          <button 
                            onClick={() => setSelectedGame(game)}
                            className="bg-green-500 text-black px-8 py-3 font-black uppercase tracking-tighter flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all hover:bg-white"
                          >
                            <Play className="w-4 h-4 fill-current" /> Play Now
                          </button>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">{game.title}</h3>
                        <p className="text-sm text-slate-500 line-clamp-2 mb-4">{game.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 border border-green-500/30 px-2 py-1">Arcade</span>
                          <button 
                            onClick={() => setSelectedGame(game)}
                            className="text-slate-600 hover:text-green-400 transition-colors"
                          >
                            <Info className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 bg-slate-900/50 border border-slate-800">
                  <Gamepad2 className="w-16 h-16 text-slate-800 mb-4" />
                  <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">No games found</h3>
                  <p className="text-slate-600 font-medium">Check back later for new additions!</p>
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
                  className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-green-400 transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Library
                </button>
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{selectedGame.title}</h2>
                  <a 
                    href={selectedGame.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-slate-500 hover:text-green-400 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="relative aspect-video w-full bg-black shadow-2xl border border-slate-800">
                <iframe 
                  src={selectedGame.url}
                  className="absolute inset-0 w-full h-full border-0"
                  title={selectedGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="bg-slate-900 border border-slate-800 p-8">
                <h3 className="text-sm font-black text-green-500 uppercase tracking-[0.3em] mb-4">About {selectedGame.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{selectedGame.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-20 border-t border-slate-900 py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-black" />
            </div>
            <span className="font-black text-white uppercase italic tracking-tighter">67 games</span>
          </div>
          <p className="text-slate-700 text-[10px] uppercase font-bold tracking-widest">© 2026 67 games. All rights reserved.</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-green-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-green-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-green-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState } from 'react';
import { useCompileXStore } from '../../store/useCompileXStore';
import { 
  Code2, 
  Layers, 
  GitBranch, 
  BarChart3, 
  RotateCcw, 
  Sparkles,
  Terminal,
  Cpu
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, resetAll } = useCompileXStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <header className="border-b border-purple-900/40 bg-[#0e0b1f] sticky top-0 z-40">
      {/* IDE Top Window Bar */}
      <div className="bg-[#080612] border-b border-purple-950 px-4 py-1 text-[11px] font-mono text-purple-300 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-purple-400 font-semibold">CompileX Studio — workspace.ts [ECMAScript AST v11.4]</span>
        </div>
        <div className="flex items-center space-x-2 text-[10px] text-purple-400">
          <span>LEXICAL SCOPE: GLOBAL</span>
          <span>•</span>
          <span className="text-pink-400 font-bold">BYTECODE INTERPRETER</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('editor')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight text-white font-mono">
                  Compile<span className="text-pink-400">X</span>
                </span>
                <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                  IDE ENGINE
                </span>
              </div>
            </div>
          </div>

          {/* IDE Tabs */}
          <nav className="flex items-center space-x-1 font-mono text-xs">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center space-x-1.5 ${
                activeTab === 'editor'
                  ? 'bg-purple-900/50 text-pink-300 border border-purple-500/50 font-bold'
                  : 'text-purple-400/70 hover:text-white hover:bg-purple-950/40'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Step Runtime</span>
            </button>

            <button
              onClick={() => setActiveTab('ast')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center space-x-1.5 ${
                activeTab === 'ast'
                  ? 'bg-purple-900/50 text-pink-300 border border-purple-500/50 font-bold'
                  : 'text-purple-400/70 hover:text-white hover:bg-purple-950/40'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>AST Syntax Tree</span>
            </button>

            <button
              onClick={() => setActiveTab('algorithms')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center space-x-1.5 ${
                activeTab === 'algorithms'
                  ? 'bg-purple-900/50 text-pink-300 border border-purple-500/50 font-bold'
                  : 'text-purple-400/70 hover:text-white hover:bg-purple-950/40'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Algorithm Studio</span>
            </button>
          </nav>

          {/* Right Action */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-2.5 py-1 rounded-md bg-purple-950/60 hover:bg-purple-900 border border-purple-800/60 text-purple-300 text-xs font-mono transition-all flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset State</span>
            </button>
          </div>
        </div>
      </div>

      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#120f24] border border-purple-800 p-6 max-w-sm w-full font-mono text-purple-200 shadow-2xl rounded-xl">
            <h3 className="text-sm font-bold text-pink-400">Reset Runtime Environment?</h3>
            <p className="text-xs text-purple-300/70 mt-2">
              All call stack frames, variable symbol tables, and AST parsing nodes will be reinitialized.
            </p>
            <div className="mt-4 flex justify-end space-x-2 text-xs">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAll();
                  setShowResetConfirm(false);
                }}
                className="px-3 py-1 rounded bg-pink-600 text-white font-bold hover:bg-pink-500"
              >
                Reset Studio
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

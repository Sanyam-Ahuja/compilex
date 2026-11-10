import React, { useState } from 'react';
import { useCompileXStore } from '../../store/useCompileXStore';
import { 
  Code2, 
  Layers, 
  GitBranch, 
  BarChart3, 
  RotateCcw,
  Sparkles,
  Terminal
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, resetAll } = useCompileXStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <header className="border-b border-slate-800 bg-[#0A0E17]/95 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('editor')}>
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Code2 className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white font-mono">Compile<span className="text-purple-400">X</span></span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
                  AST & RUNTIME
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Code Execution & Algorithm Visualization Studio</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1 font-mono">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
                activeTab === 'editor'
                  ? 'bg-slate-800 text-purple-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Execution Visualizer</span>
            </button>

            <button
              onClick={() => setActiveTab('ast')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
                activeTab === 'ast'
                  ? 'bg-slate-800 text-purple-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>AST Explorer</span>
            </button>

            <button
              onClick={() => setActiveTab('algorithms')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all ${
                activeTab === 'algorithms'
                  ? 'bg-slate-800 text-purple-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Algorithm Studio</span>
            </button>
          </nav>

          {/* Reset button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
              title="Reset Sandbox"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden overflow-x-auto py-2 space-x-1 border-t border-slate-800/80 font-mono">
          {(['editor', 'ast', 'algorithms'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-1 rounded text-xs whitespace-nowrap capitalize ${
                activeTab === tab ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-slate-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161b22] border border-slate-700 rounded-2xl max-w-sm w-full p-5 shadow-2xl">
            <div className="flex items-center space-x-3 text-purple-400 mb-3">
              <RotateCcw className="w-6 h-6" />
              <h3 className="font-semibold text-white text-base">Reset CompileX State?</h3>
            </div>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed font-sans">
              This will restore the default recursive factorial preset, reset the execution stepper, and reseed the algorithm visualization.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAll();
                  setShowResetConfirm(false);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-600 hover:bg-purple-500 text-white font-semibold"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

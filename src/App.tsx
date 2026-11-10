import React from 'react';
import { useCompileXStore } from './store/useCompileXStore';
import { Navbar } from './components/layout/Navbar';
import { ExecutionVisualizer } from './components/visualizer/ExecutionVisualizer';
import { ASTExplorer } from './components/ast/ASTExplorer';
import { AlgorithmStudio } from './components/algorithms/AlgorithmStudio';

export const App: React.FC = () => {
  const { activeTab } = useCompileXStore();

  return (
    <div className="min-h-screen bg-[#0D1117] text-slate-100 flex flex-col font-mono selection:bg-purple-500/30 selection:text-purple-300">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'editor' && <ExecutionVisualizer />}
        {activeTab === 'ast' && <ASTExplorer />}
        {activeTab === 'algorithms' && <AlgorithmStudio />}
      </main>

      <footer className="border-t border-slate-800/80 bg-[#0A0E17] py-4 text-center text-xs text-slate-500 font-mono">
        <p>CompileX • Interactive Code Execution & Algorithm Visualization Studio • Client-Side AST Engine</p>
      </footer>
    </div>
  );
};

export default App;

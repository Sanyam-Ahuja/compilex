import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { ExecutionVisualizer } from './components/visualizer/ExecutionVisualizer';
import { ASTExplorer } from './components/ast/ASTExplorer';
import { AlgorithmStudio } from './components/algorithms/AlgorithmStudio';
import { useCompileXStore } from './store/useCompileXStore';

export const App: React.FC = () => {
  const { activeTab } = useCompileXStore();

  return (
    <div className="min-h-screen bg-[#0c0a17] text-purple-100 flex flex-col font-sans selection:bg-pink-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'editor' && <ExecutionVisualizer />}
        {activeTab === 'ast' && <ASTExplorer />}
        {activeTab === 'algorithms' && <AlgorithmStudio />}
      </main>

      <footer className="border-t border-purple-950/80 bg-[#07050f] py-4 text-center text-xs text-purple-400/60 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-pink-400/80 font-bold">COMPILEX STUDIO // STEPWISE BYTECODE INTERPRETER & AST VISUALIZER</p>
          <p className="text-purple-400/50">CALL STACK FRAMES • HEAP ALLOCATOR • ZERO EXTERNAL RUNTIME</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

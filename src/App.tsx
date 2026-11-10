import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { ExecutionVisualizer } from './components/visualizer/ExecutionVisualizer';
import { ASTExplorer } from './components/ast/ASTExplorer';
import { AlgorithmStudio } from './components/algorithms/AlgorithmStudio';
import { useCompileXStore } from './store/useCompileXStore';

export const App: React.FC = () => {
  const { activeTab } = useCompileXStore();
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Navbar />
      <main className="flex-1 min-w-0 px-4 md:px-10 py-8 md:py-12 max-w-[1500px]">
        {activeTab === 'editor' && <ExecutionVisualizer />}
        {activeTab === 'ast' && <ASTExplorer />}
        {activeTab === 'algorithms' && <AlgorithmStudio />}
      </main>
    </div>
  );
};

export default App;

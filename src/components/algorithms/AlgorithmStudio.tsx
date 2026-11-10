import React, { useEffect } from 'react';
import { useCompileXStore } from '../../store/useCompileXStore';
import { ALGORITHM_INFO } from '../../engine/algorithms';
import { AlgorithmType } from '../../types';
import { 
  BarChart3, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw, 
  Shuffle, 
  Activity, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const AlgorithmStudio: React.FC = () => {
  const {
    currentAlgorithm,
    setAlgorithm,
    algorithmSteps,
    algoStepIndex,
    stepAlgoForward,
    stepAlgoBackward,
    resetAlgo,
    isAlgoPlaying,
    toggleAlgoPlay,
    generateNewArray,
  } = useCompileXStore();

  const currentStep = algorithmSteps[algoStepIndex] || algorithmSteps[0];
  const info = ALGORITHM_INFO[currentAlgorithm];

  useEffect(() => {
    if (!isAlgoPlaying) return;
    const interval = setInterval(() => {
      stepAlgoForward();
    }, 400);
    return () => clearInterval(interval);
  }, [isAlgoPlaying, stepAlgoForward]);

  const maxVal = Math.max(...currentStep.array, 100);

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="bg-[#161B22] border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-bold mb-1">
            <BarChart3 className="w-5 h-5" />
            <h3 className="text-white text-base">Algorithm Execution & Complexity Laboratory</h3>
          </div>
          <p className="text-xs text-slate-400 font-sans">
            Observe comparison-based sorting state transitions, partitioned subarrays, and time/space complexity bounds.
          </p>
        </div>

        {/* Algorithm Selector */}
        <div className="flex items-center space-x-3">
          <select
            value={currentAlgorithm}
            onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
          >
            <option value="bubble_sort">Bubble Sort</option>
            <option value="selection_sort">Selection Sort</option>
            <option value="insertion_sort">Insertion Sort</option>
            <option value="quick_sort">Quick Sort</option>
          </select>

          <button
            onClick={generateNewArray}
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Randomize</span>
          </button>
        </div>
      </div>

      {/* Complexity & Counters Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[#161B22] border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Comparisons</span>
          <div className="text-2xl font-bold font-mono text-amber-400 mt-0.5">{currentStep.comparisons}</div>
          <span className="text-[10px] text-slate-500 font-mono">Element Evaluations</span>
        </div>

        <div className="p-4 rounded-xl bg-[#161B22] border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Swaps / Shifts</span>
          <div className="text-2xl font-bold font-mono text-rose-400 mt-0.5">{currentStep.swaps}</div>
          <span className="text-[10px] text-slate-500 font-mono">Array Mutations</span>
        </div>

        <div className="p-4 rounded-xl bg-[#161B22] border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Time Complexity</span>
          <div className="text-lg font-bold font-mono text-cyan-400 mt-0.5">{info.timeComplexity.average}</div>
          <span className="text-[10px] text-slate-500 font-mono">Best: {info.timeComplexity.best} • Worst: {info.timeComplexity.worst}</span>
        </div>

        <div className="p-4 rounded-xl bg-[#161B22] border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Space Complexity</span>
          <div className="text-lg font-bold font-mono text-purple-400 mt-0.5">{info.spaceComplexity}</div>
          <span className="text-[10px] text-slate-500 font-mono">Auxiliary Memory Bound</span>
        </div>
      </div>

      {/* Array Bars Visualization */}
      <div className="bg-[#161B22] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Array Visualization & State Highlighting
          </h4>
          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="flex items-center space-x-1 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
              <span>Comparing</span>
            </span>
            <span className="flex items-center space-x-1 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
              <span>Swapping</span>
            </span>
            <span className="flex items-center space-x-1 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
              <span>Sorted</span>
            </span>
          </div>
        </div>

        {/* Dynamic Bars Container */}
        <div className="h-64 flex items-end justify-center space-x-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
          {currentStep.array.map((val, idx) => {
            const heightPct = Math.max(12, (val / maxVal) * 95);
            const isComparing = currentStep.comparing.includes(idx);
            const isSwapping = currentStep.swapping.includes(idx);
            const isSorted = currentStep.sorted.includes(idx);
            const isPivot = currentStep.pivot === idx;

            let bgColor = 'bg-slate-700';
            if (isSwapping) bgColor = 'bg-rose-500 shadow-lg shadow-rose-500/30';
            else if (isComparing) bgColor = 'bg-amber-400 shadow-lg shadow-amber-400/30';
            else if (isPivot) bgColor = 'bg-purple-500 shadow-lg shadow-purple-500/30';
            else if (isSorted) bgColor = 'bg-emerald-500 shadow-lg shadow-emerald-500/20';

            return (
              <div key={idx} className="flex-1 max-w-[50px] flex flex-col items-center justify-end h-full">
                <span className="text-[10px] font-mono text-slate-400 mb-1 font-bold">{val}</span>
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full rounded-t-lg transition-all duration-300 ${bgColor}`}
                />
                <span className="text-[9px] font-mono text-slate-600 mt-1">[{idx}]</span>
              </div>
            );
          })}
        </div>

        {/* Stepper Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={resetAlgo}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={stepAlgoBackward}
              disabled={algoStepIndex === 0}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={toggleAlgoPlay}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-lg shadow-cyan-950/40"
            >
              {isAlgoPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Animate</span>
                </>
              )}
            </button>

            <button
              onClick={stepAlgoForward}
              disabled={algoStepIndex >= algorithmSteps.length - 1}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-slate-400 ml-2">
              Step <strong className="text-cyan-400">{algoStepIndex + 1}</strong> of {algorithmSteps.length}
            </span>
          </div>

          <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
            {currentStep.description}
          </div>
        </div>
      </div>
    </div>
  );
};

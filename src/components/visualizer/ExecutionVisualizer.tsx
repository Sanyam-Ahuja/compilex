import React, { useEffect } from 'react';
import { useCompileXStore } from '../../store/useCompileXStore';
import { PROGRAM_PRESETS } from '../../engine/runtime';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw, 
  Layers, 
  HardDrive, 
  Terminal, 
  Sparkles,
  Sliders
} from 'lucide-react';

export const ExecutionVisualizer: React.FC = () => {
  const {
    currentPreset,
    setPreset,
    currentStepIndex,
    stepForward,
    stepBackward,
    resetExecution,
    isPlaying,
    togglePlay,
    playbackSpeed,
    setPlaybackSpeed,
  } = useCompileXStore();

  const step = currentPreset.steps[currentStepIndex] || currentPreset.steps[0];
  const codeLines = currentPreset.code.split('\n');

  // Automatic playback loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      stepForward();
    }, playbackSpeed);
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, stepForward]);

  return (
    <div className="space-y-6 text-left">
      {/* Header & Controls */}
      <div className="bg-[#161B22] border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 font-bold mb-1">
            <Layers className="w-5 h-5" />
            <h3 className="text-white text-base">Step-by-Step Code Execution & Memory Runtime</h3>
          </div>
          <p className="text-xs text-slate-400 font-sans">
            Visualizing stack frame allocation, scope chains, recursion unwinding, and heap memory pointers.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center space-x-3">
          <select
            value={currentPreset.id}
            onChange={(e) => setPreset(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-purple-500"
          >
            {PROGRAM_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stepper Playback Toolbar */}
      <div className="bg-[#161B22] border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={resetExecution}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Reset to beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={stepBackward}
            disabled={currentStepIndex === 0}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
            title="Step Backward"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-lg shadow-purple-950/40"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Auto Step</span>
              </>
            )}
          </button>

          <button
            onClick={stepForward}
            disabled={currentStepIndex >= currentPreset.steps.length - 1}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
            title="Step Forward"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono text-slate-400 ml-2">
            Step <strong className="text-purple-400">{currentStepIndex + 1}</strong> of {currentPreset.steps.length}
          </span>
        </div>

        {/* Speed Slider */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="text-slate-400">Step Interval:</span>
          <input
            type="range"
            min={400}
            max={2000}
            step={100}
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(parseInt(e.target.value, 10))}
            className="w-24 accent-purple-500"
          />
          <span className="text-purple-400 font-bold w-12 text-right">{playbackSpeed}ms</span>
        </div>
      </div>

      {/* Two Column Visualizer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor with Line Highlight */}
        <div className="bg-[#0D1117] border border-slate-800 rounded-2xl p-5 shadow-xl font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="font-bold text-white uppercase">{currentPreset.id}.js</span>
              <span className="text-purple-400">Executing Line: {step.line}</span>
            </div>

            <div className="space-y-0.5">
              {codeLines.map((lineText, idx) => {
                const lineNum = idx + 1;
                const isCurrent = lineNum === step.line;

                return (
                  <div
                    key={lineNum}
                    className={`flex items-center px-2 py-0.5 rounded transition-colors ${
                      isCurrent
                        ? 'bg-purple-950/60 border-l-2 border-purple-400 text-white font-bold'
                        : 'text-slate-300 hover:bg-slate-900/40'
                    }`}
                  >
                    <span className={`w-8 text-right pr-3 select-none text-[11px] ${isCurrent ? 'text-purple-400 font-bold' : 'text-slate-600'}`}>
                      {lineNum}
                    </span>
                    <pre className="whitespace-pre font-mono text-[12px]">{lineText}</pre>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanation Footer */}
          <div className="mt-6 p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
            <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block mb-1">Runtime Instruction:</span>
            <p className="text-slate-200 leading-relaxed font-sans">{step.explanation}</p>
          </div>
        </div>

        {/* Runtime State Panels: Call Stack, Variables, Heap, Console */}
        <div className="space-y-4">
          {/* Call Stack Frames */}
          <div className="p-4 rounded-xl bg-[#161B22] border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Call Stack Frames ({step.stack.length})</span>
              </h4>
              <span className="text-[10px] text-slate-500 font-mono">Top = Active Frame</span>
            </div>

            <div className="space-y-2">
              {[...step.stack].reverse().map((frame, idx) => (
                <div
                  key={frame.id}
                  className={`p-3 rounded-xl border transition-all text-xs font-mono ${
                    idx === 0
                      ? 'bg-purple-950/40 border-purple-500/60 text-white shadow-md shadow-purple-950/40'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white flex items-center space-x-1">
                      {idx === 0 && <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse inline-block" />}
                      <span>{frame.functionName}()</span>
                    </span>
                    {frame.returnLine && (
                      <span className="text-[10px] text-slate-500">Return to line {frame.returnLine}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-[11px] text-purple-300/90">
                    <span className="text-slate-500">Local Scope:</span>
                    <span>{JSON.stringify(frame.variables)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Heap Memory & Console */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Heap Objects */}
            <div className="p-4 rounded-xl bg-[#161B22] border border-slate-800 shadow-xl space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                <span>Heap Memory</span>
              </h4>

              {step.heap.length === 0 ? (
                <div className="py-4 text-center text-[11px] text-slate-500 font-mono">
                  No dynamic heap allocations
                </div>
              ) : (
                <div className="space-y-2">
                  {step.heap.map((obj) => (
                    <div key={obj.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span className="text-cyan-400 font-bold">{obj.id}</span>
                        <span>{obj.type}</span>
                      </div>
                      <div className="text-[11px] text-slate-200">
                        {JSON.stringify(obj.data)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Standard Output Console */}
            <div className="p-4 rounded-xl bg-[#161B22] border border-slate-800 shadow-xl space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>stdout Stream</span>
              </h4>

              {step.consoleOut.length === 0 ? (
                <div className="py-4 text-center text-[11px] text-slate-500 font-mono">
                  [Empty stdout]
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-xs text-emerald-400 space-y-1">
                  {step.consoleOut.map((line, idx) => (
                    <div key={idx}>&gt; {line}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

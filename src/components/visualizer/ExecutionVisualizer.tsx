import React, { useEffect } from 'react';
import { useCompileXStore } from '../../store/useCompileXStore';
import { PROGRAM_PRESETS } from '../../engine/runtime';
import { Circle, Square, Title } from '../Shapes';
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react';

const fmt = (v: unknown) => (typeof v === 'string' ? `"${v}"` : JSON.stringify(v));

export const ExecutionVisualizer: React.FC = () => {
  const { currentPreset, setPreset, currentStepIndex, stepForward, stepBackward, resetExecution, isPlaying, togglePlay, playbackSpeed, setPlaybackSpeed } = useCompileXStore();
  const step = currentPreset.steps[currentStepIndex] || currentPreset.steps[0];
  const lines = currentPreset.code.split('\n');
  const total = currentPreset.steps.length;
  const atEnd = currentStepIndex >= total - 1;

  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(stepForward, playbackSpeed);
    return () => clearInterval(t);
  }, [isPlaying, playbackSpeed, stepForward]);

  return (
    <div>
      <Title shape={<Circle size={44} />} note="Step through a program one line at a time. Watch frames land on the call stack and objects appear on the heap.">
        Watch it run
      </Title>

      {/* program picker: each preset is a tab of the poster */}
      <div className="flex flex-wrap gap-0 mb-6 rule w-fit max-w-full" role="tablist">
        {PROGRAM_PRESETS.map((p) => {
          const on = p.id === currentPreset.id;
          return (
            <button key={p.id} role="tab" aria-selected={on} onClick={() => setPreset(p.id)}
              className={`px-4 py-2.5 font-semibold border-r-[3px] border-ink last:border-r-0 ${on ? 'bg-ink text-paper' : 'hover:bg-yellow'}`}>
              {p.title}
            </button>
          );
        })}
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-6">
        {/* code */}
        <section className="rule bg-white flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 border-b-[3px] border-ink">
            <span className="font-mono text-[14px]">{currentPreset.id}.js</span>
            <span className="cap text-mute">line {step.line}</span>
          </div>
          <ol className="font-mono text-[14.5px] leading-[1.7] py-3 overflow-x-auto flex-1">
            {lines.map((txt, i) => {
              const on = i + 1 === step.line;
              return (
                <li key={i} className={`grid grid-cols-[3.25rem_1fr] items-center ${on ? 'bg-yellow' : ''}`}>
                  <span className="flex items-center justify-end gap-2 pr-3 select-none text-mute">
                    {on && <Circle size={10} />}{i + 1}
                  </span>
                  <pre className={`pr-4 ${on ? 'font-bold' : ''}`}>{txt || ' '}</pre>
                </li>
              );
            })}
          </ol>
          <div className="bg-ink text-paper p-4 min-h-[88px]">
            <p className="text-[17px] leading-snug">{step.explanation}</p>
          </div>
        </section>

        {/* machine state */}
        <section className="flex flex-col gap-6 min-w-0">
          <div>
            <h2 className="display text-[28px] mb-3 flex items-center gap-2"><Circle size={18} /> Call stack <span className="text-mute text-[18px] font-medium">{step.stack.length}</span></h2>
            <div className="flex flex-col-reverse gap-1.5">
              {step.stack.map((f, i) => {
                const top = i === step.stack.length - 1;
                return (
                  <div key={f.id} className={`rule p-3 ${top ? 'bg-red text-white' : 'bg-paper'}`} style={{ marginLeft: `${i * 14}px` }}>
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-mono font-bold text-[15px]">{f.functionName}()</span>
                      {f.returnLine && <span className="text-[13px] opacity-80">returns to line {f.returnLine}</span>}
                    </div>
                    <div className="font-mono text-[13px] mt-1 flex flex-wrap gap-x-4 gap-y-0.5">
                      {Object.keys(f.variables).length === 0 && <span className="opacity-70">no locals yet</span>}
                      {Object.entries(f.variables).map(([k, v]) => <span key={k}>{k} = <b>{fmt(v)}</b></span>)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="min-w-0">
              <h2 className="display text-[24px] mb-3 flex items-center gap-2"><Square size={16} /> Heap</h2>
              {step.heap.length === 0 ? (
                <p className="text-mute border-[3px] border-dashed border-stone p-4">Nothing allocated yet.</p>
              ) : step.heap.map((o) => (
                <div key={o.id} className="bg-blue text-white p-3 mb-1.5">
                  <div className="flex justify-between text-[13px]"><span className="font-mono font-bold">{o.id}</span><span>{o.type}</span></div>
                  <div className="font-mono text-[13px] mt-1 break-all">{JSON.stringify(o.data)}</div>
                </div>
              ))}
            </div>
            <div className="min-w-0">
              <h2 className="display text-[24px] mb-3">Output</h2>
              <div className="bg-ink text-yellow font-mono text-[14px] p-3 min-h-[96px]">
                {step.consoleOut.length === 0 ? <span className="text-paper/50">(nothing printed)</span> : step.consoleOut.map((l, i) => <div key={i}>{l}</div>)}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* transport */}
      <div className="sticky bottom-0 mt-8 -mx-4 md:mx-0 bg-paper border-t-[3px] border-ink py-3 px-4 md:px-0 flex flex-wrap items-center gap-3">
        <button className="bbtn bbtn-round" onClick={resetExecution} aria-label="Back to start"><RotateCcw size={18} /></button>
        <button className="bbtn bbtn-round" onClick={stepBackward} disabled={currentStepIndex === 0} aria-label="Step back"><SkipBack size={18} /></button>
        <button className="bbtn bbtn-red min-w-[120px]" onClick={togglePlay} disabled={atEnd && !isPlaying}>
          {isPlaying ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Play</>}
        </button>
        <button className="bbtn bbtn-round" onClick={stepForward} disabled={atEnd} aria-label="Step forward"><SkipForward size={18} /></button>
        {/* progress as a row of squares */}
        <div className="flex-1 min-w-[160px] flex gap-[3px] items-center" aria-label={`step ${currentStepIndex + 1} of ${total}`}>
          {currentPreset.steps.map((_, i) => (
            <span key={i} className="h-3 flex-1" style={{ background: i < currentStepIndex ? 'var(--color-ink)' : i === currentStepIndex ? 'var(--color-red)' : 'var(--color-stone)' }} />
          ))}
        </div>
        <span className="font-mono text-[14px]">{currentStepIndex + 1}/{total}</span>
        <label className="flex items-center gap-2 text-[14px]">
          speed
          <input type="range" min={400} max={2000} step={100} value={2400 - playbackSpeed} onChange={(e) => setPlaybackSpeed(2400 - parseInt(e.target.value, 10))} className="accent-red w-28" />
        </label>
      </div>
    </div>
  );
};

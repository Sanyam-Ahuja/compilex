import React, { useEffect } from 'react';
import { useCompileXStore } from '../../store/useCompileXStore';
import { ALGORITHM_INFO } from '../../engine/algorithms';
import { AlgorithmType } from '../../types';
import { Square, Title } from '../Shapes';
import { Pause, Play, RotateCcw, Shuffle, SkipBack, SkipForward } from 'lucide-react';

const ALGOS: AlgorithmType[] = ['bubble_sort', 'selection_sort', 'insertion_sort', 'quick_sort'];
const KEY = [
  { c: 'var(--color-yellow)', l: 'comparing' },
  { c: 'var(--color-red)', l: 'swapping' },
  { c: 'var(--color-blue)', l: 'pivot' },
  { c: 'var(--color-ink)', l: 'in place' },
];

export const AlgorithmStudio: React.FC = () => {
  const { currentAlgorithm, setAlgorithm, algorithmSteps, algoStepIndex, stepAlgoForward, stepAlgoBackward, resetAlgo, isAlgoPlaying, toggleAlgoPlay, generateNewArray } = useCompileXStore();
  const s = algorithmSteps[algoStepIndex] || algorithmSteps[0];
  const info = ALGORITHM_INFO[currentAlgorithm];
  const max = Math.max(...s.array, 100);
  const atEnd = algoStepIndex >= algorithmSteps.length - 1;

  useEffect(() => {
    if (!isAlgoPlaying) return;
    const t = setInterval(stepAlgoForward, 400);
    return () => clearInterval(t);
  }, [isAlgoPlaying, stepAlgoForward]);

  return (
    <div>
      <Title shape={<Square size={42} />} note={info.description}
        right={<button className="bbtn" onClick={generateNewArray}><Shuffle size={18} /> New numbers</button>}>
        Sort it out
      </Title>

      <div className="grid grid-cols-2 md:grid-cols-4 rule mb-6">
        {ALGOS.map((a) => {
          const on = a === currentAlgorithm;
          return (
            <button key={a} onClick={() => setAlgorithm(a)} aria-pressed={on}
              className={`p-4 text-left border-ink [&:not(:last-child)]:border-r-[3px] max-md:[&:nth-child(2)]:border-r-0 max-md:[&:nth-child(-n+2)]:border-b-[3px] ${on ? 'bg-blue text-white' : 'hover:bg-yellow'}`}>
              <div className="display text-[24px]">{ALGORITHM_INFO[a].name}</div>
              <div className="font-mono text-[13px] mt-1 opacity-80">{ALGORITHM_INFO[a].timeComplexity.average}</div>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1fr_260px] gap-6">
        <section className="rule bg-white p-4 md:p-6">
          <div className="h-[340px] flex items-end gap-[3px] md:gap-1.5 border-b-[3px] border-ink">
            {s.array.map((v, i) => {
              const color = s.swapping.includes(i) ? KEY[1].c : s.comparing.includes(i) ? KEY[0].c : s.pivot === i ? KEY[2].c : s.sorted.includes(i) ? KEY[3].c : 'var(--color-stone)';
              return (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full min-w-0">
                  <span className="font-mono text-[11px] md:text-[12px] mb-1">{v}</span>
                  <div className="w-full transition-[height,background] duration-300" style={{ height: `${Math.max(6, (v / max) * 88)}%`, background: color }} />
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-[14px]">
            {KEY.map((k) => <span key={k.l} className="flex items-center gap-1.5"><span className="w-3.5 h-3.5" style={{ background: k.c }} />{k.l}</span>)}
          </div>
          <p className="mt-5 text-[18px] bg-yellow px-4 py-3 border-[3px] border-ink">{s.description}</p>
        </section>

        <aside className="flex flex-col gap-0 rule">
          {[
            ['comparisons', s.comparisons],
            ['swaps', s.swaps],
            ['best', info.timeComplexity.best],
            ['worst', info.timeComplexity.worst],
            ['extra space', info.spaceComplexity],
          ].map(([k, v], i) => (
            <div key={k as string} className={`p-4 ${i < 4 ? 'border-b-[3px] border-ink' : ''} ${i === 0 ? 'bg-ink text-paper' : ''}`}>
              <div className="cap opacity-70">{k}</div>
              <div className={`display ${i < 2 ? 'text-[44px]' : 'text-[26px] font-mono font-medium'}`}>{v}</div>
            </div>
          ))}
        </aside>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button className="bbtn bbtn-round" onClick={resetAlgo} aria-label="Back to start"><RotateCcw size={18} /></button>
        <button className="bbtn bbtn-round" onClick={stepAlgoBackward} disabled={algoStepIndex === 0} aria-label="Step back"><SkipBack size={18} /></button>
        <button className="bbtn bbtn-red min-w-[120px]" onClick={toggleAlgoPlay} disabled={atEnd && !isAlgoPlaying}>
          {isAlgoPlaying ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Play</>}
        </button>
        <button className="bbtn bbtn-round" onClick={stepAlgoForward} disabled={atEnd} aria-label="Step forward"><SkipForward size={18} /></button>
        <span className="font-mono text-[14px] ml-2">step {algoStepIndex + 1} of {algorithmSteps.length}</span>
      </div>
    </div>
  );
};

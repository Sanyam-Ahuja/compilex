import React, { useState } from 'react';
import { useCompileXStore } from '../../store/useCompileXStore';
import { Circle, Square, Triangle } from '../Shapes';

type Tab = ReturnType<typeof useCompileXStore.getState>['activeTab'];
const TABS: { id: Tab; label: string; shape: (on: boolean) => React.ReactNode }[] = [
  { id: 'editor', label: 'Run', shape: (on) => <Circle size={36} color={on ? 'var(--color-red)' : '#f4f3ee'} /> },
  { id: 'ast', label: 'Parse', shape: (on) => <Triangle size={38} color={on ? 'var(--color-yellow)' : '#f4f3ee'} /> },
  { id: 'algorithms', label: 'Sort', shape: (on) => <Square size={34} color={on ? 'var(--color-blue)' : '#f4f3ee'} /> },
];

/** Black slab down the left edge on desktop, a band across the top on phones. */
export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, resetAll } = useCompileXStore();
  const [confirm, setConfirm] = useState(false);

  return (
    <aside className="bg-ink text-paper md:w-[112px] md:min-h-screen md:sticky md:top-0 md:h-screen flex md:flex-col items-center shrink-0 z-30">
      <button onClick={() => setActiveTab('editor')} className="p-4 md:py-6 flex md:flex-col items-center gap-2" aria-label="CompileX">
        <span className="display text-[22px] md:text-[20px] md:[writing-mode:vertical-rl] md:rotate-180 tracking-tight">compile<span className="text-yellow">x</span></span>
      </button>
      <nav className="flex md:flex-col flex-1 md:flex-none md:mt-6 justify-center" aria-label="Sections">
        {TABS.map((t) => {
          const on = activeTab === t.id;
          return (
            <button key={t.id} onClick={() => setActiveTab(t.id)} aria-current={on ? 'page' : undefined}
              className={`flex flex-col items-center gap-2 px-4 py-3 md:py-5 md:w-full transition-colors ${on ? 'bg-paper/10' : 'hover:bg-paper/5'}`}>
              <span className={`transition-transform ${on ? 'scale-100' : 'scale-75 opacity-60'}`}>{t.shape(on)}</span>
              <span className={`text-[14px] font-semibold ${on ? 'text-paper' : 'text-paper/60'}`}>{t.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="md:mt-auto p-3 md:p-4 md:w-full">
        {confirm ? (
          <div className="flex md:flex-col gap-1 text-[13px]">
            <button className="bg-red px-2 py-1 font-semibold" onClick={() => { resetAll(); setConfirm(false); }}>Reset all</button>
            <button className="px-2 py-1 border border-paper/40" onClick={() => setConfirm(false)}>Keep</button>
          </div>
        ) : (
          <button className="text-[13px] text-paper/60 hover:text-yellow underline underline-offset-4" onClick={() => setConfirm(true)}>reset</button>
        )}
      </div>
    </aside>
  );
};

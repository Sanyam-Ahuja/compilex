import React, { useState } from 'react';
import { useCompileXStore } from '../../store/useCompileXStore';
import { tokenizeCode } from '../../engine/parser';
import { ASTNode, TokenType } from '../../types';
import { Circle, Square, Title, Triangle } from '../Shapes';

const TOKEN: Record<TokenType, { bg: string; fg: string; label: string }> = {
  keyword: { bg: 'var(--color-red)', fg: '#fff', label: 'keyword' },
  identifier: { bg: 'var(--color-blue)', fg: '#fff', label: 'name' },
  number: { bg: 'var(--color-yellow)', fg: '#111', label: 'number' },
  string: { bg: '#fff', fg: '#111', label: 'string' },
  operator: { bg: 'var(--color-ink)', fg: 'var(--color-yellow)', label: 'operator' },
  punctuation: { bg: 'var(--color-stone)', fg: '#111', label: 'punctuation' },
  comment: { bg: 'transparent', fg: 'var(--color-mute)', label: 'comment' },
};

const shapeFor = (type: string) =>
  /Declaration|Program/.test(type) ? <Triangle size={14} color="var(--color-yellow)" />
  : /Statement|Block/.test(type) ? <Square size={12} color="var(--color-blue)" />
  : <Circle size={12} color="var(--color-red)" />;

const Node: React.FC<{ node: ASTNode; last: boolean; root?: boolean }> = ({ node, last, root }) => {
  const [open, setOpen] = useState(true);
  const kids = node.children ?? [];
  return (
    <li className={`relative ${root ? '' : 'pl-6'}`}>
      {!root && <span className={`absolute left-0 top-0 w-[3px] bg-ink ${last ? 'h-[18px]' : 'h-full'}`} aria-hidden />}
      {!root && <span className="absolute left-0 top-[16px] w-5 h-[3px] bg-ink" aria-hidden />}
      <button disabled={!kids.length} onClick={() => setOpen(!open)} aria-expanded={kids.length ? open : undefined}
        className="flex items-center gap-2 py-1 pr-2 text-left disabled:cursor-default enabled:hover:bg-yellow">
        {shapeFor(node.type)}
        <span className="font-semibold">{node.type}</span>
        {node.name && <span className="font-mono text-[14px] text-blue">{node.name}</span>}
        {node.operator && <span className="font-mono text-[14px] bg-ink text-yellow px-1">{node.operator}</span>}
        {node.value !== undefined && node.value !== '' && <span className="font-mono text-[14px] text-red">{String(node.value)}</span>}
        {kids.length > 0 && !open && <span className="text-mute text-[13px]">+{kids.length}</span>}
      </button>
      {open && kids.length > 0 && (
        <ul className="ml-[5px]">
          {kids.map((c, i) => <Node key={i} node={c} last={i === kids.length - 1} />)}
        </ul>
      )}
    </li>
  );
};

export const ASTExplorer: React.FC = () => {
  const { customCode, setCustomCode, astRoot } = useCompileXStore();
  const tokens = tokenizeCode(customCode);
  const counts = tokens.reduce<Record<string, number>>((a, t) => ({ ...a, [t.type]: (a[t.type] || 0) + 1 }), {});

  return (
    <div>
      <Title shape={<Triangle size={46} />} note="Edit the source on the left. The lexer cuts it into tokens and the parser stacks those tokens into a tree, live as you type.">
        Take it apart
      </Title>

      <section className="mb-8">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-3">
          <h2 className="display text-[26px]">{tokens.length} tokens</h2>
          {(Object.keys(TOKEN) as TokenType[]).filter((k) => counts[k]).map((k) => (
            <span key={k} className="flex items-center gap-1.5 text-[14px]">
              <span className="w-3.5 h-3.5 border-2 border-ink" style={{ background: TOKEN[k].bg }} />{TOKEN[k].label} {counts[k]}
            </span>
          ))}
        </div>
        <div className="rule bg-white p-3 flex flex-wrap gap-1 max-h-48 overflow-y-auto">
          {tokens.map((t, i) => (
            <span key={i} title={`${t.type} · line ${t.line}`} className="font-mono text-[13px] px-1.5 py-0.5 border-2 border-ink"
              style={{ background: TOKEN[t.type].bg, color: TOKEN[t.type].fg }}>{t.value}</span>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="flex flex-col">
          <h2 className="display text-[26px] mb-3">Source</h2>
          <textarea value={customCode} onChange={(e) => setCustomCode(e.target.value)} spellCheck={false} aria-label="Source code"
            className="rule bg-ink text-paper font-mono text-[14.5px] leading-[1.7] p-4 min-h-[420px] flex-1 resize-y focus:outline-none focus:border-red" />
        </section>
        <section>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="display text-[26px]">Tree</h2>
            <span className="flex gap-3 text-[13px] text-mute">
              <span className="flex items-center gap-1"><Triangle size={11} /> declaration</span>
              <span className="flex items-center gap-1"><Square size={10} /> statement</span>
              <span className="flex items-center gap-1"><Circle size={10} /> expression</span>
            </span>
          </div>
          <div className="rule bg-white p-4 min-h-[420px] max-h-[640px] overflow-auto">
            <ul><Node node={astRoot} last root /></ul>
          </div>
        </section>
      </div>
    </div>
  );
};

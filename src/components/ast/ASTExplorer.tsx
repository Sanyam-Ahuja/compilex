import React, { useState } from 'react';
import { useCompileXStore } from '../../store/useCompileXStore';
import { tokenizeCode, parseAST } from '../../engine/parser';
import { ASTNode } from '../../types';
import { GitBranch, Code2, ChevronRight, ChevronDown, Binary, Sparkles } from 'lucide-react';

export const ASTExplorer: React.FC = () => {
  const { customCode, setCustomCode, astRoot } = useCompileXStore();
  const tokens = tokenizeCode(customCode);

  const getTokenColor = (type: string) => {
    switch (type) {
      case 'keyword':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'identifier':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'number':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'string':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'operator':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'punctuation':
        return 'bg-slate-800 text-slate-400 border-slate-700';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="bg-[#161B22] border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 font-bold mb-1">
            <GitBranch className="w-5 h-5" />
            <h3 className="text-white text-base">Abstract Syntax Tree (AST) & Lexical Tokenizer</h3>
          </div>
          <p className="text-xs text-slate-400 font-sans">
            Inspect the compiler lexical analysis token stream and recursive syntax tree hierarchy.
          </p>
        </div>
      </div>

      {/* Token Stream Strip */}
      <div className="bg-[#161B22] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Lexical Token Stream ({tokens.length} Tokens)
          </h4>
          <span className="text-[10px] text-slate-500 font-mono">Lexer Output</span>
        </div>

        <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-3 bg-slate-950 rounded-xl border border-slate-800">
          {tokens.map((tok, idx) => (
            <span
              key={idx}
              className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getTokenColor(tok.type)}`}
              title={`Type: ${tok.type}, Line: ${tok.line}`}
            >
              {tok.value}
            </span>
          ))}
        </div>
      </div>

      {/* Editor & AST Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Code Input */}
        <div className="p-5 rounded-2xl bg-[#0D1117] border border-slate-800 shadow-xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-white font-bold">Source Program Input</span>
            <span className="text-slate-500 text-[11px]">Live Re-parse</span>
          </div>

          <textarea
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            rows={14}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-purple-500 leading-relaxed"
          />
        </div>

        {/* Tree Visualizer */}
        <div className="p-5 rounded-2xl bg-[#161B22] border border-slate-800 shadow-xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-white font-bold flex items-center space-x-1.5">
              <GitBranch className="w-4 h-4 text-purple-400" />
              <span>Hierarchical AST Nodes</span>
            </span>
            <span className="text-purple-400 text-[10px]">Root: Program</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 max-h-[340px] overflow-y-auto space-y-2">
            <ASTNodeItem node={astRoot} depth={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ASTNodeItem: React.FC<{ node: ASTNode; depth: number }> = ({ node, depth }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div style={{ marginLeft: `${depth * 14}px` }} className="text-xs space-y-1">
      <div
        onClick={() => hasChildren && setExpanded(!expanded)}
        className={`flex items-center space-x-1.5 py-1 px-2 rounded-lg transition-colors ${
          hasChildren ? 'cursor-pointer hover:bg-slate-900' : ''
        }`}
      >
        {hasChildren ? (
          expanded ? (
            <ChevronDown className="w-3.5 h-3.5 text-purple-400" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          )
        ) : (
          <span className="w-3.5 h-3.5 inline-block text-slate-700">•</span>
        )}

        <span className="text-purple-300 font-bold">{node.type}</span>
        {node.name && <span className="text-cyan-400 font-mono">[{node.name}]</span>}
        {node.value && <span className="text-amber-300 font-mono">"{node.value}"</span>}
      </div>

      {hasChildren && expanded && (
        <div className="border-l border-slate-800/80 ml-2 space-y-1">
          {node.children!.map((child, idx) => (
            <ASTNodeItem key={idx} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

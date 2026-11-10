// AST & Tokenizer Types
export type TokenType = 'keyword' | 'identifier' | 'number' | 'string' | 'operator' | 'punctuation' | 'comment';

export interface CodeToken {
  type: TokenType;
  value: string;
  line: number;
}

export interface ASTNode {
  type: string;
  name?: string;
  value?: string | number | boolean;
  operator?: string;
  children?: ASTNode[];
  line?: number;
}

// Execution & Memory Runtime Types
export interface StackFrame {
  id: string;
  functionName: string;
  variables: Record<string, any>;
  returnLine?: number;
}

export interface HeapObject {
  id: string;
  type: 'Array' | 'Object';
  reference: string;
  data: any;
}

export interface ExecutionStep {
  stepIndex: number;
  line: number;
  explanation: string;
  stack: StackFrame[];
  heap: HeapObject[];
  consoleOut: string[];
}

export interface ProgramPreset {
  id: string;
  title: string;
  description: string;
  code: string;
  steps: ExecutionStep[];
}

// Algorithm Laboratory Types
export type AlgorithmType =
  | 'bubble_sort'
  | 'selection_sort'
  | 'insertion_sort'
  | 'merge_sort'
  | 'quick_sort'
  | 'binary_search';

export interface AlgorithmStep {
  stepIndex: number;
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  pivot?: number;
  target?: number;
  comparisons: number;
  swaps: number;
  description: string;
}

export interface AlgorithmInfo {
  id: AlgorithmType;
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  description: string;
}

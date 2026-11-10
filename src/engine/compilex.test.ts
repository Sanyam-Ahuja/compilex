import { describe, it, expect } from 'vitest';
import { tokenizeCode, parseAST } from './parser';
import { generateAlgorithmSteps, ALGORITHM_INFO } from './algorithms';
import { PROGRAM_PRESETS } from './runtime';

describe('CompileX Execution & Compiler Engines', () => {
  it('tokenizes JavaScript source code into keywords, operators, and literals', () => {
    const code = 'function add(a, b) { return a + b; }';
    const tokens = tokenizeCode(code);
    expect(tokens.length).toBeGreaterThan(0);

    const fnToken = tokens.find((t) => t.value === 'function');
    expect(fnToken?.type).toBe('keyword');

    const opToken = tokens.find((t) => t.value === '+');
    expect(opToken?.type).toBe('operator');
  });

  it('builds a hierarchical AST for function declarations', () => {
    const code = 'function square(x) { return x * x; }';
    const ast = parseAST(code);
    expect(ast.type).toBe('Program');
    expect(ast.children).toBeDefined();
    const fnNode = ast.children?.find((c) => c.type === 'FunctionDeclaration');
    expect(fnNode?.name).toBe('square');
  });

  it('generates step-by-step state transitions for Bubble Sort', () => {
    const initial = [5, 2, 8, 1];
    const steps = generateAlgorithmSteps('bubble_sort', initial);
    expect(steps.length).toBeGreaterThan(0);

    const finalStep = steps[steps.length - 1];
    expect(finalStep.array).toEqual([1, 2, 5, 8]);
    expect(finalStep.comparisons).toBeGreaterThan(0);
  });

  it('loads recursive factorial execution preset with call stack frames', () => {
    const preset = PROGRAM_PRESETS.find((p) => p.id === 'factorial');
    expect(preset).toBeDefined();
    expect(preset?.steps.length).toBeGreaterThanOrEqual(8);

    const baseCaseStep = preset!.steps.find((s) => s.explanation.includes('Base case reached'));
    expect(baseCaseStep).toBeDefined();
    expect(baseCaseStep?.stack.length).toBeGreaterThan(2);
  });
});

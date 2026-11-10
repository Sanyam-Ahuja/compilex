import { create } from 'zustand';
import { ProgramPreset, ExecutionStep, AlgorithmType, AlgorithmStep, ASTNode } from '../types';
import { PROGRAM_PRESETS } from '../engine/runtime';
import { parseAST } from '../engine/parser';
import { generateAlgorithmSteps, ALGORITHM_INFO } from '../engine/algorithms';

interface CompileXState {
  activeTab: 'editor' | 'ast' | 'algorithms';
  setActiveTab: (tab: CompileXState['activeTab']) => void;

  // Code Execution Visualizer
  currentPreset: ProgramPreset;
  customCode: string;
  currentStepIndex: number;
  isPlaying: boolean;
  playbackSpeed: number; // ms
  astRoot: ASTNode;

  setPreset: (presetId: string) => void;
  setCustomCode: (code: string) => void;
  stepForward: () => void;
  stepBackward: () => void;
  resetExecution: () => void;
  togglePlay: () => void;
  setPlaybackSpeed: (speed: number) => void;

  // Algorithm Laboratory
  currentAlgorithm: AlgorithmType;
  arrayData: number[];
  algorithmSteps: AlgorithmStep[];
  algoStepIndex: number;
  isAlgoPlaying: boolean;

  setAlgorithm: (algo: AlgorithmType) => void;
  setArrayData: (arr: number[]) => void;
  generateNewArray: () => void;
  stepAlgoForward: () => void;
  stepAlgoBackward: () => void;
  resetAlgo: () => void;
  toggleAlgoPlay: () => void;

  // Reset all
  resetAll: () => void;
}

const DEFAULT_ARRAY = [45, 12, 85, 32, 89, 39, 69, 21, 56, 14];
const initialPreset = PROGRAM_PRESETS[0];
const initialAST = parseAST(initialPreset.code);
const initialAlgoSteps = generateAlgorithmSteps('bubble_sort', DEFAULT_ARRAY);

export const useCompileXStore = create<CompileXState>((set, get) => ({
  activeTab: 'editor',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Code visualizer
  currentPreset: initialPreset,
  customCode: initialPreset.code,
  currentStepIndex: 0,
  isPlaying: false,
  playbackSpeed: 900,
  astRoot: initialAST,

  setPreset: (presetId) => {
    const preset = PROGRAM_PRESETS.find((p) => p.id === presetId) || PROGRAM_PRESETS[0];
    const ast = parseAST(preset.code);
    set({
      currentPreset: preset,
      customCode: preset.code,
      currentStepIndex: 0,
      isPlaying: false,
      astRoot: ast,
    });
  },

  setCustomCode: (code) => {
    const ast = parseAST(code);
    set({ customCode: code, astRoot: ast });
  },

  stepForward: () => {
    const { currentStepIndex, currentPreset } = get();
    if (currentStepIndex < currentPreset.steps.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    } else {
      set({ isPlaying: false });
    }
  },

  stepBackward: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  },

  resetExecution: () => set({ currentStepIndex: 0, isPlaying: false }),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),

  // Algorithm Lab
  currentAlgorithm: 'bubble_sort',
  arrayData: DEFAULT_ARRAY,
  algorithmSteps: initialAlgoSteps,
  algoStepIndex: 0,
  isAlgoPlaying: false,

  setAlgorithm: (algo) => {
    const { arrayData } = get();
    const steps = generateAlgorithmSteps(algo, arrayData);
    set({
      currentAlgorithm: algo,
      algorithmSteps: steps,
      algoStepIndex: 0,
      isAlgoPlaying: false,
    });
  },

  setArrayData: (arr) => {
    const { currentAlgorithm } = get();
    const steps = generateAlgorithmSteps(currentAlgorithm, arr);
    set({
      arrayData: arr,
      algorithmSteps: steps,
      algoStepIndex: 0,
      isAlgoPlaying: false,
    });
  },

  generateNewArray: () => {
    const newArr = Array.from({ length: 10 }, () => Math.floor(10 + Math.random() * 89));
    const { currentAlgorithm } = get();
    const steps = generateAlgorithmSteps(currentAlgorithm, newArr);
    set({
      arrayData: newArr,
      algorithmSteps: steps,
      algoStepIndex: 0,
      isAlgoPlaying: false,
    });
  },

  stepAlgoForward: () => {
    const { algoStepIndex, algorithmSteps } = get();
    if (algoStepIndex < algorithmSteps.length - 1) {
      set({ algoStepIndex: algoStepIndex + 1 });
    } else {
      set({ isAlgoPlaying: false });
    }
  },

  stepAlgoBackward: () => {
    const { algoStepIndex } = get();
    if (algoStepIndex > 0) {
      set({ algoStepIndex: algoStepIndex - 1 });
    }
  },

  resetAlgo: () => set({ algoStepIndex: 0, isAlgoPlaying: false }),

  toggleAlgoPlay: () => set((state) => ({ isAlgoPlaying: !state.isAlgoPlaying })),

  resetAll: () => {
    set({
      currentPreset: PROGRAM_PRESETS[0],
      customCode: PROGRAM_PRESETS[0].code,
      currentStepIndex: 0,
      isPlaying: false,
      astRoot: parseAST(PROGRAM_PRESETS[0].code),
      currentAlgorithm: 'bubble_sort',
      arrayData: DEFAULT_ARRAY,
      algorithmSteps: generateAlgorithmSteps('bubble_sort', DEFAULT_ARRAY),
      algoStepIndex: 0,
      isAlgoPlaying: false,
    });
  },
}));

import { ProgramPreset, ExecutionStep } from '../types';

export const PROGRAM_PRESETS: ProgramPreset[] = [
  {
    id: 'factorial',
    title: 'Recursive Factorial Stack Unwinding',
    description: 'Visualizes call stack frame allocation, base case condition, and post-recursion return value multiplication.',
    code: `function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

let result = factorial(4);
console.log("Result:", result);`,
    steps: [
      {
        stepIndex: 0,
        line: 8,
        explanation: 'Main thread invokes factorial(4). A new stack frame is allocated for factorial.',
        stack: [
          { id: 'frame-global', functionName: 'Global Scope', variables: { result: 'undefined' } },
          { id: 'frame-1', functionName: 'factorial', variables: { n: 4 }, returnLine: 8 },
        ],
        heap: [],
        consoleOut: [],
      },
      {
        stepIndex: 1,
        line: 2,
        explanation: 'Evaluating condition: (n <= 1) -> (4 <= 1) is false. Proceeding to recursive branch.',
        stack: [
          { id: 'frame-global', functionName: 'Global Scope', variables: { result: 'undefined' } },
          { id: 'frame-1', functionName: 'factorial', variables: { n: 4 }, returnLine: 8 },
        ],
        heap: [],
        consoleOut: [],
      },
      {
        stepIndex: 2,
        line: 5,
        explanation: 'Invoking factorial(3). Pushing new stack frame with argument n = 3.',
        stack: [
          { id: 'frame-global', functionName: 'Global Scope', variables: { result: 'undefined' } },
          { id: 'frame-1', functionName: 'factorial', variables: { n: 4 }, returnLine: 8 },
          { id: 'frame-2', functionName: 'factorial', variables: { n: 3 }, returnLine: 5 },
        ],
        heap: [],
        consoleOut: [],
      },
      {
        stepIndex: 3,
        line: 5,
        explanation: 'Invoking factorial(2). Pushing new stack frame with argument n = 2.',
        stack: [
          { id: 'frame-global', functionName: 'Global Scope', variables: { result: 'undefined' } },
          { id: 'frame-1', functionName: 'factorial', variables: { n: 4 }, returnLine: 8 },
          { id: 'frame-2', functionName: 'factorial', variables: { n: 3 }, returnLine: 5 },
          { id: 'frame-3', functionName: 'factorial', variables: { n: 2 }, returnLine: 5 },
        ],
        heap: [],
        consoleOut: [],
      },
      {
        stepIndex: 4,
        line: 5,
        explanation: 'Invoking factorial(1). Pushing new stack frame with argument n = 1.',
        stack: [
          { id: 'frame-global', functionName: 'Global Scope', variables: { result: 'undefined' } },
          { id: 'frame-1', functionName: 'factorial', variables: { n: 4 }, returnLine: 8 },
          { id: 'frame-2', functionName: 'factorial', variables: { n: 3 }, returnLine: 5 },
          { id: 'frame-3', functionName: 'factorial', variables: { n: 2 }, returnLine: 5 },
          { id: 'frame-4', functionName: 'factorial', variables: { n: 1 }, returnLine: 5 },
        ],
        heap: [],
        consoleOut: [],
      },
      {
        stepIndex: 5,
        line: 3,
        explanation: 'Base case reached! (1 <= 1) is true. Returning value 1. Popping top frame.',
        stack: [
          { id: 'frame-global', functionName: 'Global Scope', variables: { result: 'undefined' } },
          { id: 'frame-1', functionName: 'factorial', variables: { n: 4 }, returnLine: 8 },
          { id: 'frame-2', functionName: 'factorial', variables: { n: 3 }, returnLine: 5 },
          { id: 'frame-3', functionName: 'factorial', variables: { n: 2, returnValue: 1 }, returnLine: 5 },
        ],
        heap: [],
        consoleOut: [],
      },
      {
        stepIndex: 6,
        line: 5,
        explanation: 'Unwinding: factorial(2) computes (2 * 1) = 2. Returning 2 and popping frame.',
        stack: [
          { id: 'frame-global', functionName: 'Global Scope', variables: { result: 'undefined' } },
          { id: 'frame-1', functionName: 'factorial', variables: { n: 4 }, returnLine: 8 },
          { id: 'frame-2', functionName: 'factorial', variables: { n: 3, returnValue: 2 }, returnLine: 5 },
        ],
        heap: [],
        consoleOut: [],
      },
      {
        stepIndex: 7,
        line: 5,
        explanation: 'Unwinding: factorial(3) computes (3 * 2) = 6. Returning 6 and popping frame.',
        stack: [
          { id: 'frame-global', functionName: 'Global Scope', variables: { result: 'undefined' } },
          { id: 'frame-1', functionName: 'factorial', variables: { n: 4, returnValue: 6 }, returnLine: 8 },
        ],
        heap: [],
        consoleOut: [],
      },
      {
        stepIndex: 8,
        line: 5,
        explanation: 'Final unwind: factorial(4) computes (4 * 6) = 24. Returning 24 to global caller.',
        stack: [
          { id: 'frame-global', functionName: 'Global Scope', variables: { result: 24 } },
        ],
        heap: [],
        consoleOut: [],
      },
      {
        stepIndex: 9,
        line: 9,
        explanation: 'console.log outputs calculated result 24 to virtual stdout stream.',
        stack: [
          { id: 'frame-global', functionName: 'Global Scope', variables: { result: 24 } },
        ],
        heap: [],
        consoleOut: ['Result: 24'],
      },
    ],
  },
  {
    id: 'binary_search',
    title: 'Iterative Binary Search & Pointers',
    description: 'Visualizes pointer convergence (low, mid, high) on a sorted integer array.',
    code: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

let items = [12, 24, 35, 47, 59, 68, 83];
let idx = binarySearch(items, 59);`,
    steps: [
      {
        stepIndex: 0,
        line: 12,
        explanation: 'Allocated array [12, 24, 35, 47, 59, 68, 83] in Heap Memory. Invoking binarySearch with target = 59.',
        stack: [
          { id: 'frame-main', functionName: 'Main', variables: { items: 'ref@0x01', idx: 'undefined' } },
          { id: 'frame-bs', functionName: 'binarySearch', variables: { target: 59, low: 0, high: 6 }, returnLine: 13 },
        ],
        heap: [{ id: 'ref@0x01', type: 'Array', reference: '0x01', data: [12, 24, 35, 47, 59, 68, 83] }],
        consoleOut: [],
      },
      {
        stepIndex: 1,
        line: 5,
        explanation: 'Midpoint calculated: mid = floor((0 + 6) / 2) = 3. Checking arr[3] = 47.',
        stack: [
          { id: 'frame-main', functionName: 'Main', variables: { items: 'ref@0x01', idx: 'undefined' } },
          { id: 'frame-bs', functionName: 'binarySearch', variables: { target: 59, low: 0, high: 6, mid: 3, 'arr[mid]': 47 }, returnLine: 13 },
        ],
        heap: [{ id: 'ref@0x01', type: 'Array', reference: '0x01', data: [12, 24, 35, 47, 59, 68, 83] }],
        consoleOut: [],
      },
      {
        stepIndex: 2,
        line: 7,
        explanation: 'arr[3] (47) < target (59). Adjusting lower boundary: low = mid + 1 = 4.',
        stack: [
          { id: 'frame-main', functionName: 'Main', variables: { items: 'ref@0x01', idx: 'undefined' } },
          { id: 'frame-bs', functionName: 'binarySearch', variables: { target: 59, low: 4, high: 6 }, returnLine: 13 },
        ],
        heap: [{ id: 'ref@0x01', type: 'Array', reference: '0x01', data: [12, 24, 35, 47, 59, 68, 83] }],
        consoleOut: [],
      },
      {
        stepIndex: 3,
        line: 5,
        explanation: 'Midpoint calculated: mid = floor((4 + 6) / 2) = 5. Checking arr[5] = 68.',
        stack: [
          { id: 'frame-main', functionName: 'Main', variables: { items: 'ref@0x01', idx: 'undefined' } },
          { id: 'frame-bs', functionName: 'binarySearch', variables: { target: 59, low: 4, high: 6, mid: 5, 'arr[mid]': 68 }, returnLine: 13 },
        ],
        heap: [{ id: 'ref@0x01', type: 'Array', reference: '0x01', data: [12, 24, 35, 47, 59, 68, 83] }],
        consoleOut: [],
      },
      {
        stepIndex: 4,
        line: 8,
        explanation: 'arr[5] (68) > target (59). Adjusting upper boundary: high = mid - 1 = 4.',
        stack: [
          { id: 'frame-main', functionName: 'Main', variables: { items: 'ref@0x01', idx: 'undefined' } },
          { id: 'frame-bs', functionName: 'binarySearch', variables: { target: 59, low: 4, high: 4 }, returnLine: 13 },
        ],
        heap: [{ id: 'ref@0x01', type: 'Array', reference: '0x01', data: [12, 24, 35, 47, 59, 68, 83] }],
        consoleOut: [],
      },
      {
        stepIndex: 5,
        line: 6,
        explanation: 'Match found! mid = 4, arr[4] === 59. Returning index 4.',
        stack: [
          { id: 'frame-main', functionName: 'Main', variables: { items: 'ref@0x01', idx: 4 } },
        ],
        heap: [{ id: 'ref@0x01', type: 'Array', reference: '0x01', data: [12, 24, 35, 47, 59, 68, 83] }],
        consoleOut: ['Target 59 found at index 4'],
      },
    ],
  },
];

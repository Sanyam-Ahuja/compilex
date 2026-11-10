import { AlgorithmType, AlgorithmStep, AlgorithmInfo } from '../types';

export const ALGORITHM_INFO: Record<AlgorithmType, AlgorithmInfo> = {
  bubble_sort: {
    id: 'bubble_sort',
    name: 'Bubble Sort',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
  },
  selection_sort: {
    id: 'selection_sort',
    name: 'Selection Sort',
    timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Divides the list into a sorted and unsorted region, repeatedly selecting the smallest element from the unsorted region.',
  },
  insertion_sort: {
    id: 'insertion_sort',
    name: 'Insertion Sort',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    description: 'Builds the final sorted array one item at a time, inserting each element into its proper position.',
  },
  merge_sort: {
    id: 'merge_sort',
    name: 'Merge Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    description: 'Divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and merges the sorted halves.',
  },
  quick_sort: {
    id: 'quick_sort',
    name: 'Quick Sort',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    description: 'Selects a pivot element and partitions the array into sub-arrays of elements less than and greater than the pivot.',
  },
  binary_search: {
    id: 'binary_search',
    name: 'Binary Search',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    description: 'Search algorithm that finds the position of a target value within a sorted array by halving the search interval.',
  },
};

export function generateAlgorithmSteps(algo: AlgorithmType, initialArray: number[]): AlgorithmStep[] {
  switch (algo) {
    case 'bubble_sort':
      return generateBubbleSortSteps(initialArray);
    case 'selection_sort':
      return generateSelectionSortSteps(initialArray);
    case 'insertion_sort':
      return generateInsertionSortSteps(initialArray);
    case 'quick_sort':
      return generateQuickSortSteps(initialArray);
    default:
      return generateBubbleSortSteps(initialArray);
  }
}

function generateBubbleSortSteps(input: number[]): AlgorithmStep[] {
  const arr = [...input];
  const steps: AlgorithmStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;
  const sorted: number[] = [];

  steps.push({
    stepIndex: 0,
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    comparisons: 0,
    swaps: 0,
    description: 'Initial unsorted array state.',
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      steps.push({
        stepIndex: steps.length,
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        comparisons,
        swaps,
        description: `Comparing elements at index ${j} (${arr[j]}) and ${j + 1} (${arr[j + 1]}).`,
      });

      if (arr[j] > arr[j + 1]) {
        swaps++;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        steps.push({
          stepIndex: steps.length,
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          comparisons,
          swaps,
          description: `Swapped: ${arr[j + 1]} > ${arr[j]}, moved larger element to index ${j + 1}.`,
        });
      }
    }
    sorted.push(n - i - 1);
  }
  sorted.push(0);

  steps.push({
    stepIndex: steps.length,
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    comparisons,
    swaps,
    description: `Array fully sorted in ${comparisons} comparisons and ${swaps} swaps!`,
  });

  return steps;
}

function generateSelectionSortSteps(input: number[]): AlgorithmStep[] {
  const arr = [...input];
  const steps: AlgorithmStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;
  const sorted: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      steps.push({
        stepIndex: steps.length,
        array: [...arr],
        comparing: [minIdx, j],
        swapping: [],
        sorted: [...sorted],
        comparisons,
        swaps,
        description: `Scanning for minimum: comparing index ${j} (${arr[j]}) with current min (${arr[minIdx]}).`,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      swaps++;
      const tmp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = tmp;

      steps.push({
        stepIndex: steps.length,
        array: [...arr],
        comparing: [],
        swapping: [i, minIdx],
        sorted: [...sorted, i],
        comparisons,
        swaps,
        description: `Swapped minimum element ${arr[i]} into sorted position index ${i}.`,
      });
    }

    sorted.push(i);
  }
  sorted.push(n - 1);

  steps.push({
    stepIndex: steps.length,
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    comparisons,
    swaps,
    description: `Selection sort complete!`,
  });

  return steps;
}

function generateInsertionSortSteps(input: number[]): AlgorithmStep[] {
  const arr = [...input];
  const steps: AlgorithmStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      stepIndex: steps.length,
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: Array.from({ length: i }, (_, k) => k),
      comparisons,
      swaps,
      description: `Selected key element ${key} at index ${i} to insert into sorted prefix.`,
    });

    while (j >= 0 && arr[j] > key) {
      comparisons++;
      swaps++;
      arr[j + 1] = arr[j];
      steps.push({
        stepIndex: steps.length,
        array: [...arr],
        comparing: [j],
        swapping: [j + 1],
        sorted: [],
        comparisons,
        swaps,
        description: `Shifted element ${arr[j]} right to index ${j + 1}.`,
      });
      j--;
    }
    if (j >= 0) comparisons++;

    arr[j + 1] = key;
    steps.push({
      stepIndex: steps.length,
      array: [...arr],
      comparing: [],
      swapping: [j + 1],
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      comparisons,
      swaps,
      description: `Inserted key ${key} into position ${j + 1}.`,
    });
  }

  return steps;
}

function generateQuickSortSteps(input: number[]): AlgorithmStep[] {
  const arr = [...input];
  const steps: AlgorithmStep[] = [];
  let comparisons = 0;
  let swaps = 0;

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      stepIndex: steps.length,
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      pivot: high,
      comparisons,
      swaps,
      description: `Selected pivot ${pivot} at index ${high}. Partitioning range [${low}, ${high}].`,
    });

    for (let j = low; j < high; j++) {
      comparisons++;
      if (arr[j] < pivot) {
        i++;
        swaps++;
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;

        steps.push({
          stepIndex: steps.length,
          array: [...arr],
          comparing: [j, high],
          swapping: [i, j],
          sorted: [],
          pivot: high,
          comparisons,
          swaps,
          description: `Element ${arr[i]} < pivot (${pivot}). Swapped with index ${i}.`,
        });
      }
    }

    swaps++;
    const tmp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = tmp;

    steps.push({
      stepIndex: steps.length,
      array: [...arr],
      comparing: [],
      swapping: [i + 1, high],
      sorted: [i + 1],
      comparisons,
      swaps,
      description: `Placed pivot ${arr[i + 1]} in final sorted position index ${i + 1}.`,
    });

    return i + 1;
  }

  function quickSort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  }

  quickSort(0, arr.length - 1);

  steps.push({
    stepIndex: steps.length,
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: arr.length }, (_, k) => k),
    comparisons,
    swaps,
    description: 'Quick Sort completed successfully!',
  });

  return steps;
}

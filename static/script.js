/*Christopher Mireles
Sorting algorithm Visualizer
*/

const n = 20;
const array = [];
const algorithms = [
  "Bubble Sort",
  "Insertion Sort",
  "Selection Sort",
  "Quick Sort",
];
let currentAlgo = 0;
let animationTimeout;
let isPlaying = false;

const container = document.getElementById("container");
const algorithmName = document.getElementById("algorithm-name");

//Displays automatically
init();

//init, reset, play run the program
function init() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }

  showBars();
}

function reset() {
  clearTimeout(animationTimeout);
  isPlaying = false;
  showBars();
  init();
}
function play() {
  if (isPlaying) return;
  isPlaying = true;

  const copy = [...array];
  let swaps;

  switch (algorithms[currentAlgo]) {
    case "Insertion Sort":
      swaps = insertionSort(copy);
      break;
    case "SelectionSort":
      swaps = selectionSort(copy);
      break;
    case "Quick Sort":
      swaps = quickSort(copy);
      break;
    case "Bubble Sort":
    default:
      swaps = bubbleSort(copy);
      break;
  }
  animate(swaps);
}

function stop() {
  clearTimeout(animationTimeout);
  isPlaying = false;
}

function animate(moves) {
  if (moves.length == 0) {
    showBars();
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;

  if (move.type == "swap") {
    [array[i], array[j]] = [array[j], array[i]];
  }

  showBars(move);
  animationTimeout = setTimeout(function () {
    animate(moves);
  }, 50);
}

function showBars(move) {
  container.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");
    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = "red";
    }
    container.appendChild(bar);
  }
}

//buttons to swap through the algorithms
function nextAlgorithm() {
  currentAlgo = (currentAlgo + 1) % algorithms.length;
  algorithmName.textContent = algorithms[currentAlgo];
  reset();
}
function prevAlgorithm() {
  reset();
  currentAlgo = (currentAlgo - 1 + algorithms.length) % algorithms.length; // Loop back to last if less than 0
  algorithmName.textContent = algorithms[currentAlgo];
}
/*Sorting Algorithms */
function bubbleSort(array) {
  const moves = [];

  do {
    var swapped = false;
    for (let i = 1; i < array.length; i++) {
      moves.push({ indices: [i - 1, i], type: "comp" });
      if (array[i - 1] > array[i]) {
        swapped = true;
        moves.push({ indices: [i - 1, i], type: "swap" });
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
      }
    }
  } while (swapped);
  return moves;
}

function insertionSort(array) {
  const moves = [];
  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j - 1] > array[j]) {
      moves.push({ indices: [j - 1, j], type: "comp" });
      moves.push({ indices: [j - 1, j], type: "swap" });
      [array[j - 1], array[j]] = [array[j], array[j - 1]];
      j--;
    }
  }
  return moves;
}

function selectionSort(array) {
  const swaps = [];
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      swaps.push([i, minIndex]);
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
  return swaps;
}
function quickSort(array, left = 0, right = array.length - 1, moves = []) {
  if (left < right) {
    let pivotIndex = partition(array, left, right, moves);
    quickSort(array, left, pivotIndex - 1, moves);
    quickSort(array, pivotIndex + 1, right, moves);
  }
  return moves;
}
function partition(array, left, right, moves) {
  let pivot = array[right];
  let i = left;
  for (let j = left; j < right; j++) {
    moves.push({ indices: [j, right], type: "comp" });
    if (array[j] < pivot) {
      moves.push({ indices: [i, j], type: "swap" });
      [array[i], array[j]] = [array[j], array[i]];
      i++;
    }
  }
  moves.push({ indices: [i, right], type: "swap" });
  [array[i], array[right]] = [array[right], array[i]];
  return i;
}

const algorithms = {
  "Bubble Sort": {
    description:
      "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
    code: `
  def bubble_sort(arr):
      n = len(arr)
      for i in range(n):
          for j in range(0, n-i-1):
              if arr[j] > arr[j+1]:
                  arr[j], arr[j+1] = arr[j+1], arr[j]
      return arr
      `,
  },
  "Insertion Sort": {
    description:
      "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort.",
    code: `
  def insertion_sort(arr):
      for i in range(1, len(arr)):
          key = arr[i]
          j = i-1
          while j >= 0 and key < arr[j]:
              arr[j + 1] = arr[j]
              j -= 1
          arr[j + 1] = key
      return arr
      `,
  },
  "Selection Sort": {
    description:
      "Selection Sort is an in-place comparison sorting algorithm. It has an O(n^2) time complexity, making it inefficient on large lists, and generally performs worse than the similar insertion sort.",
    code: `
  def selection_sort(arr):
      for i in range(len(arr)):
          min_idx = i
          for j in range(i+1, len(arr)):
              if arr[min_idx] > arr[j]:
                  min_idx = j
          arr[i], arr[min_idx] = arr[min_idx], arr[i]
      return arr
      `,
  },
  "Quick Sort": {
    description:
      "Quick Sort is an efficient, in-place, comparison-based sorting algorithm. It works by partitioning an array into two halves, then sorting the halves independently.",
    code: `
    def quicksort(arr, left, right):
        pi = partition(arr, left, right)

        while left < right:
            quicksort(arr, left, pi - 1)
            quicksort(arr, left + 1, right)

    def partition(arr, left, right):
        i, j = 0 , len(arr) - 1

        while left < right:
            while i < j:

      `,
  },
};

let currentAlgorithmIndex = 0;
const algorithmNames = Object.keys(algorithms);

function displayAlgorithm(index) {
  const algorithm = algorithmNames[index];
  document.getElementById("algorithm-name").innerText = algorithm;
  document.getElementById("algorithm-description").innerText =
    algorithms[algorithm].description;
  document.getElementById("algorithm-code").innerText =
    algorithms[algorithm].code;
}

function prevAlgorithm() {
  currentAlgorithmIndex =
    (currentAlgorithmIndex - 1 + algorithmNames.length) % algorithmNames.length;
  displayAlgorithm(currentAlgorithmIndex);
}

function nextAlgorithm() {
  currentAlgorithmIndex = (currentAlgorithmIndex + 1) % algorithmNames.length;
  displayAlgorithm(currentAlgorithmIndex);
}

displayAlgorithm(currentAlgorithmIndex);

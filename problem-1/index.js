// use regular for loop
const sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// create an array from 1 to n then reduce to summation
const sum_to_n_b = function (n) {
  return Array.from({ length: n }, (_, i) => i + 1) // generating an ascending array starting with 1
    .reduce((total, curr) => (total += curr), 0); // then use reduce for summation
};

// use formula: TOTAL_TO_N = (N * (N + 1)) / 2
const sum_to_n_c = function (n) {
  return (n * (n + 1)) / 2;
};

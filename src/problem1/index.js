// Normal loop
const sum_to_n_a = function (n) {
    let sum = 0;
    for (let i = n; i >= 1; i--) {
        sum += i;
    }
    return sum;
};

// Mathematic formula
function sum_to_n_b(n) {
    return (n * (n + 1)) / 2;
}

// Recursion
const sum_to_n_c = function (n) {
    if (n === 1) return 1;
    return n + sum_to_n_c(n - 1);
};

console.log(sum_to_n_a(5)); // Output: 15
console.log(sum_to_n_b(5)); // Output: 15
console.log(sum_to_n_c(5)); // Output: 15

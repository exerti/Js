
const MyPromise = require("./promise")
console.log(MyPromise.resolve(2))

console.log(MyPromise.reject(3))

console.log(MyPromise.all([1, 2, 3]))
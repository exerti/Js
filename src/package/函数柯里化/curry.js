/**
 * 什么是柯里化？
 * 将使用多个参数的一个函数，转化为一系列使用一个参数函数的形式
 */

function curry(fn) {
    // 将除了第一个参数（函数本身）的其余参数存储在args数组中
    const args = [].slice.call(arguments, 1);
    
    // 返回一个新的函数 curried
    return function curried() {
        // 将curried函数的参数转换为数组
        const newArgs = args.concat([].slice.call(arguments));

        // 如果传递给curried函数的参数数量大于等于原始函数fn的参数数量，
        // 则调用原始函数fn，否则递归调用curried函数
        return fn.length <= newArgs.length
            ? fn.apply(this, newArgs)
            : curried.apply(this, newArgs);
    };
}

function add(a, b, c) {
    return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 输出：6
console.log(curriedAdd(1, 2)(3)); // 输出：6
console.log(curriedAdd(1)(2, 3)); // 输出：6
console.log(curriedAdd(1, 2, 3)); // 输出：6

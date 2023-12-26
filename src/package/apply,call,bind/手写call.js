/**
 * call 方法 和 aplly 方法在 处理参数， call 参数接受 类数组 ，可以输用spread用法
 */

Function.prototype.myCall = function (context) {
    if(typeof this !== 'function'){
        throw new Error('this is not a function')
    }
    let result = null 

     let args = [...arguments].slice(1)

     context = context || window

     context.fn = this

     result = context.fn(...args)

     delete context.fn

     return result
}
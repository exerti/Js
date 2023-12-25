
//手写实现instanceof 方法
function myinstanceof(left, right){
    let proto = Object.getPrototypeOf(left) , prototype = right.prototype
    while(true){
        if(proto === null){
            return false
        }
        if(proto === prototype){
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }

}

let arr = [1,2,3]
let obj = {name: '张三', age: 18}

console.log(myinstanceof(arr, Array))
console.log(myinstanceof(obj, Object))

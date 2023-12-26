
/**
 * apply, 和  call 都是给函数绑定上下文
 */
Function.prototype.apply = function (context) {
    if(typeof this !== 'function'){
        throw new TypeError('Error')
    }

    let result = null 
    //判断上下文是否存在，如果不存在为window
    context = context || window

    //将函数设为对象的方法
    context.fn = this

    if(arguments[1]){
        result = context.fn(...arguments[1])
    }else{
        result = context.fn()
    }

    delete context.fn

    return result
}

/**
 * 1、判断调用对象是否为函数
 * 2、判断传入的上下文对象是否存在，不存在设置为windw
 * 3、将函数设置为上下文对象的一个方法
 * 4、使上下文对象调用这个方法，并且保存结果
 * 5、删除这个方法
 * 6、返回结果
 */
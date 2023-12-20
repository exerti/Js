//Promise
//手写A+规范的Promise

const pending = "pending"
const resolved = "resolved"
const  rejected = "rejected"

class MyPromise{

    constructor(executor){
     this.status = pending
     this.value = undefined
     this.reason = undefined
     this.onResolvedCallbacks = []
     this.onRejectedCallbacks = []
    
     const resolve = (value) => {
         if(this.status === pending){
             this.status = resolved
             this.value = value
             this.onResolvedCallbacks.forEach(fn => fn())
         }
     }

     const reject = (reason) => {
         if(this.status === pending){
             this.status = rejected
             this.reason = reason
             this.onRejectedCallbacks.forEach(fn => fn())
         }
     }

     try{
         executor(resolve, reject)
     }catch(err){
        reject(err)
     }
    }
    
}


function resolvePromise(promise2, x, resolve, reject){
    if(promise2 === x){
        return reject(new TypeError('Chaining cycle detected for promise #<MyPromise>'))
    }
    let called = false

    //如果x是promise，则取promise的状态
    if(x instanceof MyPromise){
        x.then(value => {
            resolvePromise(promise2, value, resolve, reject)
        },reason => reject(reason)) 

    }else if (x !== null && (typeof x === 'object' || typeof x === 'function')){ // 如果x 是对象或者函数
        try{
            let then = x.then
            if(typeof then === 'function'){
                then.call(x,y => {
                    if(called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)}
                    ,reason => {
                        if(called) return
                        called = true
                        reject(reason)
                    })
            }else{
                //x是对象
                resolve(x)
            }
        }catch(err){
            if(called) return
            called = true
            reject(err)
        }

    }else{
        resolve(x)
    }

}


MyPromise.then = function(onFulfilled, onRejected) {
    // 如果不传处理函数，则使用默认处理函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
  
    // 创建一个新的Promise实例，称为promise2
    const promise2 = new HYPromise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        // 使用setTimeout保证异步调用
        setTimeout(() => {
          try {
            // 调用onFulfilled，并获取返回值
            const x = onFulfilled(this.value);
            // 使用返回值x和新的Promise实例promise2来处理resolve和reject
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            // 如果处理函数抛出异常，则将promise2状态更改为rejected
            reject(error);
          }
        });
      } else if (this.status === 'rejected') {
        // 使用setTimeout保证异步调用
        setTimeout(() => {
          try {
            // 调用onRejected，并获取返回值
            const x = onRejected(this.reason);
            // 使用返回值x和新的Promise实例promise2来处理resolve和reject
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            // 如果处理函数抛出异常，则将promise2状态更改为rejected
            reject(error);
          }
        });
      } else if (this.status === 'pending') {
        // 如果当前Promise状态仍为pending，将处理函数加入相应的队列中
        this.onFulfilledCallbacks.push(() => {
          // 使用setTimeout保证异步调用
          setTimeout(() => {
            try {
              // 调用onFulfilled，并获取返回值
              const x = onFulfilled(this.value);
              // 使用返回值x和新的Promise实例promise2来处理resolve和reject
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              // 如果处理函数抛出异常，则将promise2状态更改为rejected
              reject(error);
            }
          });
        });
  
        this.onRejectedCallbacks.push(() => {
          // 使用setTimeout保证异步调用
          setTimeout(() => {
            try {
              // 调用onRejected，并获取返回值
              const x = onRejected(this.reason);
              // 使用返回值x和新的Promise实例promise2来处理resolve和reject
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              // 如果处理函数抛出异常，则将promise2状态更改为rejected
              reject(error);
            }
          });
        });
      }
    });
  
    // 返回新的Promise实例，以便链式调用
    return promise2;
  }


MyPromise.catch = function(onRejected){
    return this.then(null, onRejected)
}

MyPromise.finally = function(callback){
    return this.then(
        (value) => MyPromise.resolve(callback()).then(() => value),
        (reason) => MyPromise.resolve(callback()).then(() => {throw reason}    )
    )

}

MyPromise.resolve = function(value){
    if(value instanceof MyPromise){
        return value
    }
    return new MyPromise((resolve)=>{
        resolve(value)
    })
}
MyPromise.reject = function(reason){
    return new MyPromise(( reject)=>{
        reject(reason)
    })
}

MyPromise.all = function(promises){
    return new MyPromise((resolve, reject) => {
        let result = []
        let count = 0
        if(!Array.isArray(promises)){
            return reject(new TypeError('type error'))
        }
        promises.forEach((promise, index) => {
            MyPromise.resolve(promise).then((value) => {
                result[index] = value
                count++
                if(count === promises.length){
                    resolve(result)
                }
            },reason => reject(reason))
        })
        }
    )
}

MyPromise.race = function(promises){
    return new MyPromise((resolve, reject) => {
        promises.forEach(promise => {
            MyPromise.resolve(promise).then(value => resolve(value),reason => reject(reason))
        })
    } )
}

MyPromise.allSettled = function(promises){
    return new MyPromise((resolve, reject) => {
        let result = []
        let settedCount = 0
        if(!Array.isArray(promises)){
            return reject(new TypeError('type error'))
        }
        promises.forEach((promise, index) => {
            MyPromise.resolve(promise).then((value) => {    
                result[index] = {status: 'fulfilled', value: value}
                settedCount++
                if(settedCount === promises.length){
                    resolve(result)
                }
            },reason =>{
                result[index] = {status: 'rejected', reason: reason}
                settedCount++
                if(settedCount === promises.length){
                    resolve(result)
                }
            })
        })
    })
}

MyPromise.any = function(promises){
    return new MyPromise((resolve, reject) => {
        let errorArr = []
        if(!Array.isArray(promises)){
            return reject(new TypeError('type error'))
        }
        promises.forEach(promise => {
            MyPromise.resolve(promise).then((value) => {
                 resolve(value)
            }
            ,reason =>{
                errorArr.push(reason)
                if(errorArr.length === promises.length){
                //   reject(new  AggregateError(errorArr,'All promises were rejected') )
                reject(errorArr)
                }
            })
    })
}
)
}

module.exports = MyPromise
/**
 * 装饰器模式和转发 call \ apply 
 * javascrit 在处理函数时，可以被传递，用作对象， 可以转发调用并且装饰他们
 * 使用装饰者模式，对现有对象扩展功能，遵顼开闭原则，在运行时动态的为对象添加新的行为
 * 调用普通函数有上下文环境
 * 调用对象的方法， 是 需要自己设置上下文环境
 */


/**
 * 调用函数
 * 例子：
 * 为slow（）函数添加缓存
 */

function slow(cb) {
    console.log('slow');
    cb();
}

function cache(cb) {
    let cache = new Map();

    return ()=>{
        if(cache.has(cb)){
            console.log('cache');
            return cache.get(cb);
        }
        let result = cb();
        cache.set(result);
        console.log('no cache');
        return result;
    }
}


/**
 * 调用对象的方法，会出现  this = undifined
 * 包装器将调用传递给原始方法，但没有上下文 this
 */


// 我们将对 worker.slow 的结果进行缓存
let worker = {
    someMethod() {
      return 1;
    },
  
    slow(x) {
      // 可怕的 CPU 过载任务
      alert("Called with " + x);
      return x * this.someMethod(); // (*)
    }
  };
  
  // 和之前例子中的代码相同
  function cachingDecorator(func) {
    let cache = new Map();
    return function(x) {           // **************  这里  装饰器函数的的上下文是全局对象 ， 回调函数的是 装饰器函数
      if (cache.has(x)) {
        return cache.get(x);
      }
      let result = func(x); // (**)
      cache.set(x, result);
      return result;
    };
  }
  
  alert( worker.slow(1) ); // 原始方法有效
  
  worker.slow = cachingDecorator(worker.slow); // 现在对其进行缓存
  
  alert( worker.slow(2) ); // 蛤！Error: Cannot read property 'someMethod' of undefine 

// 其实是执行在cachingDecorator 函数时，worker.slow 的undifined , 在装饰器函数上没有


//改一下

let result =  func.call(this,args)



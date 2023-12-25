
/**
 * 函数节流，是指在规定的时间内，只能有一次触发事件回调的函数执行，如果在同一时间内，被多次触发，只能有一次生效
 */

function throttle(fn, interval) {
    let   isThrottled = false,// 不节流
    saveContent = null ,
    saveThis = null
    return function Wrapper(){
        if(isThrottled){
            //如果是节流状态,保存上下文
            saveThis = this
            saveContent = arguments
            return
        }
        //如果不是节流状态， 改为节流状态， 同时执行回调函数，并且设置定时器，在指定interaval时间后，更改为节流状态
        isThrottled = true
        fn.apply(this,arguments)
        setTimeout(()=>{
            isThrottled = false
            if(saveContent){
                Wrapper.apply(saveThis,saveContent)
                saveContent = null
                saveThis = null
            }
        },interval)
    }
}
/**
 * 函数防抖是指在事件触发n秒后执行回调，如果在n秒内事件又被触发，则重新计时。
 * 应用场景： 使用在点击事件的请求上，避免因为点击多次向后端发送请求
 *
 */
function debounce( fn  , dealy){

    let  timer = null ;

    return function (){

        let args = arguments;
        let context = this;

        //如果有定时器，取消即计时，重新计时
        if(timer) clearTimeout(timer);

        //设置定时器，在事件间隔指定事件执行
        timer = setTimeout(()=>{
            fn.apply(context , args);
        }, dealy);

    }

}
/**
 * 我们可以使用 func.apply(this, arguments) 代替 func.call(this, ...arguments)。

    内建方法 func.apply 的语法是：

    func.apply(context, args)

    只有一个关于 args 的细微的差别：

    Spread 语法 ... 允许将 可迭代对象 args 作为列表传递给 call。
    apply 只接受 类数组 args。
 */

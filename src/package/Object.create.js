
// 定义一个函数，用于创建一个新的对象
function  create(obj){
    // 定义一个新的构造函数
    function F(){}
    // 将obj的原型赋值给F函数
    F.prototype = obj;
    // 返回一个新的F函数的实例
    return new F();
}
let Student =  create({
    name: '张三',
    age: 18,
    sex: '男'
})
console.log(Student)
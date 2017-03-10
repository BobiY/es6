/*
  这个东西目前使用ES6的项目是大面积使用的，主要用到的是对象的解构赋值，
  这是一个有点诡异的操作，先看例子。
*/

const obj = {
	a:"我是a",
	b:"我是b"
};

const { a,b } = obj;

console.log(a) //我是a
console.log(a) //我是b

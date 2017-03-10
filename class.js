//ES6 Class 简单介绍

//相信你已经忘记了ES5中面向对象的写法，这里做一个回顾

function A(x,y){
   this.x = x;
   this.y = y;
};
A.prototype = {
	log:function(){
		console.log(this.x + this.y)
	}
};

//这是典型的ES5创建对象的方式，这种方式是js中的方式，在别的语言中，一般是通过 Class 关键字来创建的，为了赶上时代潮流，也为了使js逼格更高，ECMAScript组织就强行给js加了一个Class关键字，并且用他来创建构造函数。这里，我们把上面的例子改造一下

Class A {
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
	log(){
	   console.log(this.x + this.y);
	}
}

//这就是上面ES5语法的ES6语法的翻版，是不是很简单，看起来，代码清晰，并且可恶的原型也不见了，代码就该这样的清晰，但是这样子对于函数使用不熟练的人来说是个灾难，因为所有的属性，方法都写在了一起。

//constructor 这是ES6的构造器，通过对比可以清楚地看到，他就相当于构造函数，你在构造函数里面怎么写代码，就在这里面怎么写。

//另外，如果你想定义方法，那么方法之间是不用加,隔开的，看例子
Class A {
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
	logX(){
		console.log(this.x);
	}
	logY(){
		console.log(this.y);
	}
};

//这里可以看到，logX 和logY 这两个方法之间是不需要,去隔开的，这一点要特别注意。


//调用，这才是你最关心的问题，其实跟ES5一样，通过new关键字进行调用，以上面的构造为例

const a = new A(1,2);
a.logX();
b.logY();

//调用方式跟ES5一样的，这一点没有太大的变化

//下面来说一说this，这个东西会只想构造函数的实例，这一点ES5中有明确的说明，但是问题来了，都知道ES6中出现了对象解构赋值这个好玩的玩意，这时就会搞事情了。看例子。

Class A {
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
	log(){
		console.log(this.x + this.y);
	}
}

const a = new A(1,2);
const { log } = a;
log();

//看这种逆天的写法，是不是瞬间觉得世界都灰暗了其实上面的语法就相当于 log = a.log，但这里这样的执行的结果是报错，因为此时this指向的是window，所以就不存在 x 和  y 了，这里会比较奇怪，这是因为这个方法只是定义在实例对象上的，并没有绑定在实例对象上，如果你一定要在别的地方这样子用，你可以用bind方法进行绑定

Class A {
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.log = this.log.bind(this);
	}
	log(){
		console.log(this.x + this.y);
	}
}

const a = new A(1,2);
const { log } = a;
log();

//就像上面这样子的bind方式，在构造函数里面进行绑定就可以了，这不是唯一的解决办法，你还可以使用箭头函数，因为箭头函数并不存在this这个玩意，你定义的时候this是谁，你在调用的时候，this值得就是谁。

Class A {
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.log = () => {
			this.log();
		};
	}
	log(){
		console.log(this.x + this.y);
	}
}

const a = new A(1,2);
const { log } = a;
log();


//下面来说一下类的继承，这是个沉重的话题，因为在你已经忘记了的ES5中，类的继承是相当复杂的，这个你可能没啥体会了

function A(x,y){
	this.x = x;
	this.y = y;
}
A.prototype = {
	log:function(){
		console.log(this.x + this.y);
	}
}

function B(a,b){
	A.call(this,1,2);
};

B.prototype = new A();
B.prototype = {
	log1:function(){
		console.log(this.x + this.y);
	}
};

//这样的代码你现在看来依然很懵逼，因为各种方法调用，各种原型继承，看到这里，貌似玩不了了，然而在这里，我不想说明这个函数的具体继承路线，直接看ES6的继承。

Class A {
	constroctor(x,y){
		this.x = x;
		this.y = y;
	}
	log(){
		console.log(this.x + this.y);
	}
}

Class B extends A {
	constroctor(x,y,...arg){
		super(x,y);
		this.arg = ...arg;
	}
	log1(){
		console.log(this.x + this.y);
		console.log(this.arg);
	}
}

//ES6中使用extends来实现继承，这里继承的代码简单明了，参数也清晰可见，代码瞬间让你感觉清爽，一目了然。
/*
 *这里说一下这个继承的过程，首先B通过extends关键字继承了A，这没神魔好说的，字面意思嘛，就是继承，里面的代码可能你
 * 懵逼了，因为有多了个super(x,y),这又是什么鬼，这里他不是鬼，其实是这样的，ECMAScript那伙人为了高度模仿别
 * 的语言的类的创建方式，就规定要这样子写的继承，记住，这是规定，但其中的原理是这样子的，就像ES5那样子，我们通过call去实现继承，这里做了类似的事情，这个super(x,y),就相当于A.call(this,x,y),这个样子的，但是也不是完全相同，在这里，这个super()函数相当于给子类对象的实例添加了一个this对象，指向子类的实例，并且也使子类继承了父类的属性和方法
 * 
 * 
 */

//这里有一个重要的区别就在于，ES5中的继承，是先创造除了子类的this的对象，然后再将父类的方法和属性添加到这个创建的this对象上面；ES6则是先去创建了·一个父类的实例对象this，然后再用子类的构造器去修改这个this的对象。，所以这里又有一个很重要的注意事项，那就是在子类中，super()函数调用必须在使用this以前，看例子：
//这是正确用法
Class B extends A {
	constroctor(x,y,...arg){
		super(x,y);
		this.arg = ...arg;
	}
	log1(){
		console.log(this.x + this.y);
		console.log(this.arg);
	}
};

//这是错误用法
Class B extends A {
	constroctor(x,y,...arg){
		this.arg = ...arg;
		super(x,y);
	}
	log1(){
		console.log(this.x + this.y);
		console.log(this.arg);
	}
};

//这一点是要绝对注意的，不然会出现各种各样的问题和报错

//super 这玩意上面已经说过他的一些用法，这里要再多说一点，这个玩意一共有两种用法，一种是当函数用，一种是当对象用

//先来看看函数的用法
Class B extends A {
	constroctor(x,y,...arg){
		super(x,y);
		this.arg = ...arg;
	}
	log1(){
		console.log(this.x + this.y);
		console.log(this.arg);
	}
};

//这就是典型的函数用法，super()函数的作用就是加工父类的实例this，将它转变为子类的this，还有就是这个玩意必须在constructor中使用，记住，是必须。

//作为对象的用法
Class B extends A {
	constroctor(x,y,...arg){
		super(x,y);
		this.arg = ...arg;
	}
	log1(){
		console.log(this.x + this.y);
		console.log(this.arg);
		super.log();
	}
};

//这个时候呢，super就指向了父类的原型，可以调用原型上面的相关方法。这里还有一点需要注意，那就是如果你再用super调用父类的方法是，里面恰好有this，这时这个this就指向了子类，而不是父类。

//最后一个点，super()这个方法在使用时要明确指定你需要的是函数还是对象，不然就报错，看下面的代码
  	class A {}

	class B extends A {
	  constructor() {
	    super();
	    console.log(super); // 报错
	  }
	}

//这段代码就是没有清楚地致命super是使用的那种方式的，就报错，你可以这样子写
class A {}

class B extends A {
  constructor() {
    super();
    console.log(super.valueOf() instanceof B); // true
  }
}

let b = new B();

//valueOf()这个方法的作用是：返回调用对象的原始值，这个说法可能不是很清楚，这样说吧B 继承了A，就相当于A进行了实例化，而super就相当于new A(),所以他们继承自一个原型对象；


//最后要说的是，Class不存在声明提升，就是使用一定要在定义以后。并且constructor可以不写，默认会给你加上去

//再提一种小技巧

const MyClass = class Me {
	constructor(name){
		Me.name = name;
	}
  getClassName() {
    return Me.name;
  }
};

//上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是MyClass而不是Me，Me只在Class的内部代码可用，指代当前类。

let inst = new MyClass("Me");
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined














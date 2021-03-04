##### TypeScript学习记录

##### TypeScript中需要注意的点
1. 数组类型声明的两种方式

```typescript
let arr1:string[] = ['a', 'b', 'c'];
let arr2:Array<number> = [1,2,3];
```

2. ts中的非空断言操作符

```typescript
let root = document.getElementById('root');
root!.style.color = "red"; // !. 非空断言操作符，因为root有可能为null。
```

3. null 和 undefined是其他类型的子类型，可以赋值给其他类型，比如可以赋值给number类型，赋值后的变量由number类型转换为undefined类型。在strictNullChecks严格空检查模式下，null和undefined不能赋值给其他类型变量。

```typescript
let num: number;
num = null;
num = undefined;
```

4. never和void的区别

```typescript
// void可以被赋值为null和undefined类型。never返回一个不包含值的类型。
// 拥有void作为返回值类型的函数可以正常运行。拥有never返回值类型的函数 无法正常返回， 无法终止，或抛出异常。

function foo():void {
    // strictNullChecks:false 时可以被赋值为null undefined 严格模式下只能赋值undefined
    // return undefined;
    // return null;
}

// 抛出异常
function foo1():never {
    throw new Error('error');
}

// 无法终止
function foo2():never { 
    while(true) {

    }
}
// 无法正常返回
function foo3(x: string|number) {
    if (typeof x === 'string') {
        console.log(x + 'is string');
    } else if (typeof x === 'number') {
        console.log(x + 'is number');
    }else{
        console.log(x + 'is not a string and not a number');
      	// strictNullChecks 模式下，这里的代码将不会被执行，x 无法被观察
    }
}
```

5. number和BigInt不是一个类型，不可以兼容互相赋值。

```typescript
let number1: bigint = BigInt(12312312);
let number2: number = Number.MAX_SAFE_INTEGER;
console.log(number1, number2)
number1 = number2; // 报错 不能将类型“number”分配给类型“bigint”。
```

6. 联合类型在未赋值时，只能调用这几种类型共有的属性或方法。
7. 类型断言：类型断言可以将一个联合类型的变量指定为一个具体的类型。

```typescript
let a: number | string;
a!.toString();
(a! as number).toFixed(1);

interface Person {
    name: string,
    age: number
}
// 双重断言
let person = "person" as any as Person;
person.age;
```

8. 字面量类型和类型字面量

```typescript
// 字面量类型
type up = "UP";
type down = "DOWN";
type left = "LEFT";
type right = "RIGHT";

type Direction = up | down | left | right;

function move(direction: Direction){
    console.log(direction);
}
move("LEFT"); // 参数只能选择 Direction中的某一项

// 类型字面量
type Person = {
    name: string,
    age: number
}
```

9. 函数可选参数，参数后面跟？

```typescript
function hasId(id: string, pws?: number):string { 
    return id;
}
hasId("oo");// pws参数可选，此处不报错
```

10. 函数重载

```typescript
// 函数重载实现与函数具体实现需要在一起中间不能被语句分开
let obj: any = {};
function fillObj(param: string):void;
function fillObj(params: number):void;
function fillObj(params: any){
    if(typeof params === 'string') {
        obj.name = params;
    } else {
        obj.age = params;
    }
}

fillObj(1);
fillObj('lisa');
fillObj(true); // 通过重载导致此函数参数报错，未用重载时不报错
console.log(obj);
```

11. 类里面的修饰符public private protected区别

```typescript
class Father{
    public name:string = "lisa"; // 类中 子类中 实例化之后都能访问
    private age:number = 18; // 类中能访问， 子类中 实例化之后都不能访问
    protected money:number = 250; // 类中 子类中能访问，实例化之后不能访问
    constructor(name: string, age:number, money:number) {
        this.name = name;
        this.age = age;
        this.money = money;
    }
}

class Child extends Father{
    constructor(name: string, age: number, money: number){
        super(name, age, money);
    }
    desc() {
        console.log(this.name, this.age, this.money); 
      	// 属性“age”为私有属性，只能在类“Father”中访问。
    }
}

let man = new Child("lucy", 18, 100);

console.log(man.name, man.age, man.money); 
// 属性“age”为私有属性，只能在类“Father”中访问 
// 属性“money”受保护，只能在类“Father”及其子类中访问。 

```

12. 类中的静态属性是可以被继承的（static 修饰的属性或方法）
13. super关键字的用法

```typescript
// 除了可以用来继承父类之外还可以用来调用父类上的方法
class Animal{
    getName() {
        console.log("qwer");
    }
}

class Cat extends Animal{
    name:string = "cat";
    getName() {
        super.getName(); // 在子类和父类上方法重名时，调用父类上的方法
        console.log(this.name);
    }
}
let cat = new Cat();
cat.getName();
// qwer cat
```

14. 装饰器

```typescript
namespace a{
    function myPerson(constructor: Function){
        constructor.prototype.name = "lucy";
        constructor.prototype.eat = function() {
            console.log('eat');
        }
    }
    
    @myPerson // 无参数
    class Person{
        name!: string;
        eat!: Function;
        constructor(){}
    }
    
    let person = new Person();
    
    person.eat();
}

namespace b{
    function myPerson(name){
        return function(constructor: Function) {
            constructor.prototype.name = name;
            constructor.prototype.eat = function() {
                console.log('eat');
            }
        }
    }
    @myPerson('lalala') // 有参数
    class Person{ 
        name!: string;
        eat!: Function;
        constructor(){}
    }
    
    let person = new Person();
    console.log(person.name);
    person.eat();
}
```

15. 类装饰器 属性装饰器 方法装饰器

```typescript
// 类装饰器
namespace a{
    // 当装饰器作为修饰类的时候会把构造函数传递进去
    function addName(constructor: Function) {
        constructor.prototype.name = 'lucy';
    }
    @addName
    class Person{
        name!: string
    }
    let p = new Person();
    console.log(p.name);// lucy
}
// 装饰器工厂
namespace b{
    // 装饰器工厂可以传参
    function addName(name){
        return function (constructor: Function) {
            constructor.prototype.name = name;
        }
    }
    
    @addName('lalala')
    class Person{
        name!: string
    }
    let p = new Person();
    console.log(p.name);// lalala
}

// 可代替类装饰器(替换的类需要与原类结构相同)
namespace c{
    function replaceClass(constructor: Function){
        return class{
            name: string = "lily";
            eat() {
                console.log('eating');
            }
        }
    }
    @replaceClass
    class Person{
        name!: string;
        eat!: Function;
        constructor() {}
    }
    let p = new Person();
    console.log(p.name); // lily
    p.eat(); // eating
}

// 属性装饰器

namespace d{
    function upperCase(target:any, propertyKey:string) {
        let value = target[propertyKey];
        const getter = function() {
            return value;
        }
        const setter = function(newVal:string) {
            value = newVal.toUpperCase();
        }
        if(delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            })
        }
    }

    function noEnumerable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = true;
    }

    function toNumer(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let method = descriptor.value;
        descriptor.value = function(...args: any[]) {
            args = args.map(item => parseInt(item));
            return method.apply(this, args);
        }
    }
    class Person{
        // 装饰属性
        @upperCase
        name: string = "lala";
        // 装饰方法
        @noEnumerable
        getName() {
            console.log(this.name);
        }
        // 重写方法
        @toNumer
        sum(...args: any[]) {
            return args.reduce((acc, cur) => {
                return acc + cur;
            }, 0);
        }
    }
    let p = new Person();
    console.log(p.name);
    for(let key in p) {
        console.log(key, 'has getName');
    }
    console.log(Object.keys(p));
    console.log(p.sum('1','2','4')); // 7
}
```

16. 装饰器执行顺序 先上后下，先内后外
17. 抽象类抽象方法

```typescript
// 抽象类描述抽象概念，无法被实例化只能被继承 抽象方法不能在抽象类中实现，只能在抽象类的子类中具体实现，而且必须实现
abstract class Person{
    name!:string;
    abstract say() :void
    eat() {
        console.log('eat noddles');
    }
}

class Man extends Person{
    name: string = "licy";
    say() {
        console.log(this.name);
    }
}

let man = new Man();
man.say();
man.eat();
```

18. 重写（override）vs 重载（voerload）

```typescript
// 重写指的是子类重写继承自父类中的属性或方法
// 重载指的是为同一个函数提供多个类型定义
```

19. 继承（inheritance）vs多态（Polymorphism）

```typescript
// 继承指的是子类继承父类，除了拥有父类的特性外，还有一些其他特性
// 多态指的是由继承产生了相关的类，对同一个方法可以有不同的行为
```

20. 接口的类别

```typescript
// 接口一方面可以在面向对象编程中表示行为的抽象，另外可以用来描述对象的形状
// 接口就是把一些类中共有的属性和方法抽象出来，可以用来约束实现此接口的类
// 一个类可以继承另一个类并实现多个接口
// 接口像插件一样是用来增强类的，而抽象类时具体类的抽象概念
// 一个类可以实现多个接口，一个接口也可以被多个类实现，但一个类的可以有多个子类，但只有一个父类

// 接口：interface中可以用分号或者逗号分割每一项，也可以什么都不加

// 1. 对象的形状
interface Speakable{
    speak():void,
    name?:string // ? 表示可选属性
}
let p:Speakable = {
    speak(){},
    name:'lucy'
}
// 多属性会报错，少属性也会报错

// 2. 行为的抽象

interface Speakable{
    speak():void
}

interface Eatable{
    eat():void
}

class Person implements Speakable, Eatable{
    speak(){
        console.log('speak');
    }
    eat() {
        console.log('eat');
    }
}
// 不能缺少接口中定义的属性

// 任意属性
interface Person{
    readonly id:number, // 只可读，不可写
    name: string,
    [propName: string]: any
}

let p1:Person = {
    id: 1,
    name: 'lucy',
    age: 10
}

// 3. 接口的继承
// 一个接口可以继承自另外一个接口

interface Speakable {
    speak():void
}

interface SpeakChinese extends Speakable{
    speakChinese():void
}
    
class Person implements SpeakChinese{
    speak(){
        console.log('speak');
    }
    speakChinese(){
        console.log('speakChinese');
    }
}

// 4. 函数类型接口
// 对方法传入的参数和返回值进行约束

interface Discount{
    (price:number):number
}
let cost:Discount = function(price:number):number {
    return price * 0.8;
}

// 5. 可索引接口
// 对数组和对象进行约束
interface User{
    [index:number]:string
}

let arr:User = ['lucy', 'lily'];

interface User2{
    [index: string]:string
}

let obj:User2 = {
    name: 'lucy'
}

// 6. 类接口
interface Person {
    name: string,
    speak(words:string):void
}
class Man implements Person{
    name:string = "lucy";
    speak(words:string){
        console.log(words);
    }
    eat() {
        console.log('eating');
    }
}

// 7. 构造函数的类型
// 声明一个类，相当于声明了两种类型 一种是类的构造函数类型，一种是类的实例化类型

class Animal{
    constructor(public name:string){}
}

interface WithNameClass{
    new (name:string): Animal
}

function createAnimal(clazz: WithNameClass, name:string){
    return new clazz(name);
}
    
let a = createAnimal(Animal, 'lucy');

console.log(a.name); // lucy

```

21. 抽象类vs接口

```typescript
// 不同类之间共有的属性和方法可以抽象成一个接口（interface）
// 而抽象类是供其他继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中实现
// 抽象类本质是一个无法被实例化的类，其中能够实现方法和初始化属性，而接口仅能够用于描述，既不提供方法的实现，也不为属性进行初始化
// 抽象类也可以实现接口
```



> [了不起的 tsconfig.json 指南](https://zhuanlan.zhihu.com/p/145210784)


未完待续。。。
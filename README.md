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

22. 泛型

指在定义函数，接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

泛型的作用域只限于函数内部使用

```typescript
// 1. 泛型函数
function CreateArray<T>(length: number, value: T):T[] {
    let result:T[] = [];
    for(let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
console.log(CreateArray<string>(10, 1)); 

// 2. 泛型类
class CustomArray<T>{
    private list:Array<T> = [];
    add(value: T) {
        this.list.push(value);
    }
    getMax():T {
        let res = this.list[0];
        for(let i = 0; i < this.list.length; i++) {
            if(res < this.list[i]) {
                res = this.list[i];
            }
        }
        return res;
    }
}

let custom = new CustomArray<number>();
custom.add(1);
custom.add(2);
custom.add(3);
console.log(custom.getMax());

// 3. 泛型与new
function create<T>(c: {new(): T; }): T {
    return new c();
}
// 4. 泛型接口
// 4.1. 需要在函数调用时传递类型
interface Caculate{
    <T>(a:T,b:T):T
}

let add: Caculate = function<T>(a:T,b:T) {
    return a;
}
add<number>(1,2);

// 4.2. 需要在函数定义时传递类型
interface Caculate2<T>{
    (a:T,b:T):T
}

let add2: Caculate2<string> = function(a:string,b:string) {
    return a;
}
add2('1', '2');

// 5. 多个泛型类型
// 多个类型参数
function swap<A,B>(tuple: [A,B]):[B,A] {
    return [tuple[1], tuple[0]];
}
let swaped = swap<string, number>(['1', 2]);
console.log(swaped)

// 6. 默认泛型类型
function createArray<T=number>(length:number, value: T):Array<T> {
    let res: Array<T> = [];
    for(let i = 0; i < length; i++) {
        res[i] = value;
    }
    return res;
}
console.log(createArray(3, '1'));

// 7. 泛型约束
// 在函数中使用泛型，由于事先不能知道泛型的类型，所以不能随意访问相应类型的属性和方法

function logger<T>(val: T) {
    console.log(val.length); // 报错 类型“T”上不存在属性“length”
}

interface LengthWise{
    length: number
}

function logger2<T extends LengthWise>(val: T) {
    console.log(val.length);
}

// 8. 泛型接口
// 定义泛型的时候也可以指定接口

interface Animal<T>{
    list: T[]
}

let dog: Animal<{name: string, age: number}> = {
    list: [{name: 'erha', age: 2}]
}

dog.list[0].age;

// 9.泛型类型别名
type Cart<T> = {list: T[]} | T[];
let cart1: Cart<string> = {list: ['0']}
let cart2: Cart<number> = [12]

// 10. compose函数的类型别名，函数重载，泛型的例子
type Func<T extends any[], R> = (...a: T) => R
// 没有参数的情况
export default function compose(): <R>(a: R) => R
// 只有一个参数的情况
export default function compose<F extends Function>(f: F): F

/* two functions */
export default function compose<A, T extends any[], R>(
  f1: (a: A) => R,
  f2: Func<T, A>
): Func<T, R>

/* three functions */
export default function compose<A, B, T extends any[], R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func<T, A>
): Func<T, R>

/* four functions */
export default function compose<A, B, C, T extends any[], R>(
  f1: (c: C) => R,
  f2: (b: B) => C,
  f3: (a: A) => B,
  f4: Func<T, A>
): Func<T, R>

/* rest */
export default function compose<R>(
  f1: (a: any) => R,
  ...funcs: Function[]
): (...args: any[]) => R

export default function compose<R>(...funcs: Function[]): (...args: any[]) => R

export default function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T>(arg: T) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args: any) => a(b(...args)))
}

// 11.泛型接口VS泛型类型别名

    /*
    1. 接口创建了一个新的名字,可以在其他任意地方被调用，而类型别名并不创建新的名字。
    2. 类型别名不能被extends和implements,这时尽量使用接口代替类型别名
    3. 当需要使用联合类型或者元组类型的时候，类型别名会更合适。
    */

```

12. 接口的兼容性

```typescript
// 如果传入的变量和类型不匹配，TS就会进行兼容性检查
// 原理是Duck-Check，就是说只要目标类型中声明的属性变量在源类型系统中就是兼容的

interface Animal {
    name: string,
    age: number
}

function getName(animal:Animal):string {
    return animal.name;
}

let a = {
    name: 'dog',
    age: 2,
    gender: 0
}

getName(a);

// 其中Animal接口是目标类型， 对象a是源类型 源类型中有目标类型中的name和age属性，因此是兼容的。

// 只有在传参的时候两个变量之间才会进行兼容性的比较，赋值的时候并不会比较，会直接报错。

let a:Animal = {
    name:'cat',
    age: 1,
    gender: 0 // 对象文字可以只指定已知属性，并且“gender”不在类型“Animal”中。
}
```

13. 基本类型的兼容性

```typescript
// 基本类型数据也有兼容性判断
let num: string | number;
let str:stirng = "lucy";
// num = str; // 不报错
// str = num; // 会报错
let num2:{
    toString():string
}

let str2:string = "lily";
num2 = str2;

```

14. 类的兼容性

```typescript
// 在ts中是结构类型系统，只会对比结构，而不在意类型
class Animal{
    name:string
}

class Bird extends Animal{
    swing: number
}

let a: Animal;
a = new Bird();

let b: Bird;
b = new Animal(); // 报错：类型 "Animal" 中缺少属性 "swing"，但类型 "Bird" 中需要该属性。
```

15. 函数的兼容性（参数可少不多，返回值可多不可少）

```typescript
// 比较函数的时候是要先比较函数的参数，再比较函数的返回值

// 1. 比较参数
type sumFunc = (a:number, b:number) => number;

let sum1: sumFunc;
function f1(a:number, b:number):number {
    return a + b;
}
sum1 = f1; // 正确

function f2(a:number):number{
    return a;
}
sum1 = f2; // 正确

function f3(){
    return 0;
}
sum1 = f3; // 正确

function f4(a:number, b:number, c:number, d:number) {
    return 0
}
sum1 = f4; // 不能将类型“(a: number, b: number, c: number, d: number) => number”分配给类型“sumFunc”

// 参数可少不可多


// 2. 比较返回值
type Func = () => {name:string, age:number};

let getPerosn: Func;
function foo1() {
    return {
        name:'a',
        age: 12
    }
}
getPerosn = foo1;

function foo2() {
    return {
        name: 'b',
        age: 12,
        gender: 1
    }
}
getPerosn = foo2;

function foo3() {
    return {
        name: 'c'
    }
}

getPerosn = foo3; // 类型 "{ name: string; }" 中缺少属性 "age"，但类型 "{ name: string; age: number; }" 中需要该属性。

// 返回值可多不可少
```

16. 函数的协变与逆变（这块暂时不理解，先记录下来）

```typescript
/*
协变（Covariant）：只在同一个方向
逆变（Contravariant）：只在相反的方向
双向协变（Bivariant）：包括同一个方向和不同方向
不变（Invariant）：如果类型不完全相同，则他们是不兼容的
*/

/*
A <= B 意味着A是B的子类型
A -> B 指的是以A为参数类型，以B为返回值类型的函数类型
x: A 意味着x的类型为A
返回值类型是协变的，而参数类型是逆变的
返回值类型可以传子类，参数可以传父类
参数逆变父类，返回值协变子类
*/

```

17. 泛型的兼容性

```typescript
// 泛型在判断兼容性的时候会先判断具体的类型，然后再进行兼容性判断
// 接口内容为空兼容
interface Empty<T>{}

let x: Empty<string> = '12';
let y: Empty<number> = 12;
x = y;

// 接口内容不为空不兼容
interface NotEmpty<T>{
    data: T
}
let a: NotEmpty<string> = {
    data: '1'
};
let b: NotEmpty<number> = {
    data: 1
};
a = b; // 不能将类型“NotEmpty<number>”分配给类型“NotEmpty<string>”。不能将类型“number”分配给类型“string”

```

18. 枚举的兼容性

```typescript
// 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容
// 不同枚举类型之间是不兼容的

enum Colors {Red, Yellow};
let c:Colors;
c = Colors.Red;

c = 1;
// c = '1'; // 不能将类型“"1"”分配给类型“Colors”。ts(2322)

let n:number;
n = 1;
n = Colors.Red;
```

19. 类型保护之`typeof`

```typescript
// 类型保护就是一些表达式，他们在编译的时候就能通过类型信息确定某个作用域内变量的类型
// 类型保护就是能通过关键字判断出分支的类型
function double(input: string | number) {
    if(typeof input === 'string') {
     	return input + input;  
    } else if(typeof input === 'number') {
        return input * 2;
    }
}
```

20. 类型保护之`instanceof`

```typescript
class Animal{
    name!:string
}
class Birds extends Animal{
    swing!:number
}

function getName(animal:Animal) {
    if(animal instanceof Bird) {
       console.log(animal.swing);
    }else{
        console.log(animal.name);
    }
}
```





> [了不起的 tsconfig.json 指南](https://zhuanlan.zhihu.com/p/145210784)


未完待续。。。
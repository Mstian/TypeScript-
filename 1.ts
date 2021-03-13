// // 数字
// let num: number = 10;
// // boolean 
// let bool: boolean = true;
// // string
// let str: string = "lucy";

// // undefined
// let unde: undefined = undefined;

// //null
// let nulls: null = null;

// // 数组
// let numberArr: number [] = [1, 2, 3];

// let numberArr2: Array<number> = [1, 2, 3];

// // 元祖：tuple
// let tupleFirst: [string, number] = ['1', 3];

// // 枚举

// enum Gender {
//     Male,
//     Female="Female"
// }

// console.log(Gender.Male);

// // 常数枚举
// const enum Profile {
//     name,
//     age,
//     gender
// }

// let constEmunProfile = [Profile.age, Profile.name, Profile.gender];


// any
// let root = document.getElementById('root');
// root!.style.color = "red";

// let root1: HTMLElement | null = document.getElementById('root');
// root1!.style.color = 'pink';



// console.log(window);

// never 永远不

// function fn():never {
//     throw new Error('1');
// }

// function fn1():never {
//     while (true) {

//     }
// }

// void 没有任何类型

// function gree():void {
//     // return null;
// }

// void 可以被赋值 null undefined never不能包含任意类型
// 返回never的函数无法正常执行

// Symbol

// let s1 = Symbol('key');
// let s2 = Symbol('key2');

// console.log(s1 === s2);

// bigint
// let b1:bigint = (Number.MAX_SAFE_INTEGER);
// console.log(b1 === b1);

// let a1: bigint;
// let b1: number;

// let a: string = '1';

// 联合类型
// let name1: string | number;
// // console.log(name1!.toString());
// name1 = 12;
// console.log(name1.toFixed(2));
// name1 = "name1";
// console.log(name1.toUpperCase());
// console.log(name1.length);

// // 类型断言
// let name2:string | number;
// console.log((name2! as number).toFixed());

// // 双重断言
// console.log((name2! as any as boolean) = true);

// // 字面量类型 和 类型自面量。

// type up = "UP";

// type down = "DOWN";

// type left = "LEFT";

// type right = "RIGHT";


// type Direction = up | down | left | right;

// function point(dir: Direction) {

// }

// point("DOWN");



// interface Speakable{
//     speak():void
// }

// interface Eatable{
//     eat():void
// }

// class Person implements Speakable, Eatable{
//     speak(){
//         console.log('speak');
//     }
// }
// interface Person {
//     name: string,
//     speak(words:string):void
// }
// class Man implements Person{
//     name:string = "lucy";
//     speak(words:string){
//         console.log(words);
//     }
//     eat() {
        
//     }
// }



// class Animal{
//     constructor(public name:string){}
// }
// //不加new是修饰函数的,加new是修饰类的
// interface WithNameClass{
//     new(name:string):Animal
// }
// function createAnimal(clazz:WithNameClass,name:string){
//     return new clazz(name);
// }
// let a = createAnimal(Animal,'zhufeng');
// console.log(a.name);

// export default function compose(...funcs: Function[]) {
//     if (funcs.length === 0) {
//         return <T>(arg: T) => arg
//     }

//     if (funcs.length === 1) {
//         return funcs[0]
//     }

//     return funcs.reduce((a, b) => (...args: any) => a(b(...args)))
// }


// // 泛型函数
// function myFunction<T>(name: T):T{
//     return name;
// }

// console.log(myFunction<string>('lucy'));

// function CreateArray<T>(length: number, value: T):T[] {
//     let result:T[] = [];
//     for(let i = 0; i < length; i++) {
//         result[i] = value;
//     }
//     return result;
// }

// console.log(CreateArray<number>(10, 1));


// 泛型类

// class CustomArray<T>{
//     private list:Array<T> = [];
//     add(value: T) {
//         this.list.push(value);
//     }
//     getMax():T {
//         let res = this.list[0];
//         for(let i = 0; i < this.list.length; i++) {
//             if(res < this.list[i]) {
//                 res = this.list[i];
//             }
//         }
//         return res;
//     }
// }


// function createInstance<A>(c: new () => A): A {
//     return new c();
// }
// createInstance(CustomArray);

// custom.add(1);


// class BeeKeeper {
//     hasMask: boolean;
// }

// class ZooKeeper {
//     nametag: string;
// }

// class Animal {
//     numLegs: number;
// }

// class Bee extends Animal {
//     keeper: BeeKeeper;
// }

// class Lion extends Animal {
//     keeper: ZooKeeper;
// }

// function createInstance<A>(c: new () => A): A {
//     return new c();
// }

// createInstance(Lion);  // typechecks!
// createInstance(Bee);   // typechecks!

// 泛型接口


// // 1. 需要在函数调用时传递类型
// interface Caculate{
//     <T>(a:T,b:T):T
// }

// let add: Caculate = function<T>(a:T,b:T) {
//     return a;
// }
// add<number>(1,2);

// // 2. 需要在函数定义时传递类型
// interface Caculate2<T>{
//     (a:T,b:T):T
// }

// let add2: Caculate2<string> = function(a:string,b:string) {
//     return a;
// }
// add2('1', '2');

// // 多个类型参数
// function swap<A,B>(tuple: [A,B]):[B,A] {
//     return [tuple[1], tuple[0]];
// }


// let swaped = swap<string, number>(['1', 2]);

// console.log(swaped)

// 默认泛型类型

// function createArray<T=number>(length:number, value: T):Array<T> {
//     let res: Array<T> = [];
//     for(let i = 0; i < length; i++) {
//         res[i] = value;
//     }
//     return res;
// }

// console.log(createArray(3, '1'));

// 泛型约束

// function logger<T>(val: T) {
//     console.log(val.length);
// }

// interface LengthWise{
//     length: number
// }

// function logger2<T extends LengthWise>(val: T) {
//     console.log(val.length);
// }



// 泛型接口
// 定义泛型的时候也可以指定接口

// interface Animal<T>{
//     list: T[]
// }

// let dog: Animal<{name: string, age: number}> = {
//     list: [{name: 'erha', age: 2}]
// }

// dog.list[0].age;

// 泛型类型别名
// type Cart<T> = {list: T[]} | T[];
// let cart1: Cart<string> = {list: ['0']}
// let cart2: Cart<number> = [12]


// interface Animal {
//     name: string,
//     age: number
// }

// interface Person{
//     name: string,
//     age: number,
//     gender: number
// }

// function getName(animal: Animal):string {
//     return animal.name;
// }

// let p = {
//     name: 'lucy',
//     age: 18,
//     gender: 0
// }

// getName(p);


// let a: Animal = {
//     name: 'lucy',
//     age: 18,
//     gender: 1
// }


// let num: string | number;
// let str: string = "lucy";
// num = str;

// str = num;

// let num2: {
//     toString():string
// }


// let str2:string = "lily";
// num2 = str2;
// str2 = num2;



// class Animal{
//     name:string
// }

// class Bird extends Animal{
//     swing: number
// }

// let a: Animal;
// a = new Bird();

// let b: Bird;
// b = new Animal(); // 报错：类型 "Animal" 中缺少属性 "swing"，但类型 "Bird" 中需要该属性。


// class Animal{
//     name:string
// }

// class Bird{
//     name:number
// }

// let a:Animal;
// a = new Bird();


// 函数的兼容性

// type sumFunc = (a:number, b:number) => number;

// let sum1: sumFunc;
// function f1(a:number, b:number):number {
//     return a + b;
// }
// sum1 = f1;

// function f2(a:number):number{
//     return a;
// }
// sum1 = f2;

// function f3(){
//     return 0;
// }

// sum1 = f3;

// function f4(a:number, b:number, c:number, d:number) {
//     return 0
// }
// sum1 = f4; // 不能将类型“(a: number, b: number, c: number, d: number) => number”分配给类型“sumFunc”

// type Func = () => {name:string, age:number};

// let getPerosn: Func;
// function foo1() {
//     return {
//         name:'a',
//         age: 12
//     }
// }
// getPerosn = foo1;

// function foo2() {
//     return {
//         name: 'b',
//         age: 12,
//         gender: 1
//     }
// }
// getPerosn = foo2;


// function foo3() {
//     return {
//         name: 'c'
//     }
// }

// getPerosn = foo3; // 类型 "{ name: string; }" 中缺少属性 "age"，但类型 "{ name: string; age: number; }" 中需要该属性。

// // 接口内容为空兼容
// interface Empty<T>{}

// let x: Empty<string> = '12';
// let y: Empty<number> = 12;

// x = y;

// // 接口内容不为空不兼容
// interface NotEmpty<T>{
//     data: T
// }

// let a: NotEmpty<string> = {
//     data: '1'
// };
// let b: NotEmpty<number> = {
//     data: 1
// };

// a = b; // 不能将类型“NotEmpty<number>”分配给类型“NotEmpty<string>”。不能将类型“number”分配给类型“string”



enum Colors {Red, Yellow};
let c:Colors;
c = Colors.Red;

c = 1;
// c = '1'; // 不能将类型“"1"”分配给类型“Colors”。ts(2322)

let n:number;
n = 1;
n = Colors.Red;



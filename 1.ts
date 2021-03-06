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


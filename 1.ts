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

function fn():never {
    throw new Error('1');
}

function fn1():never {
    while (true) {

    }
}

// void 没有任何类型

function gree():void {
    // return null;
}

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
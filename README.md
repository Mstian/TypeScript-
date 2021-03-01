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


未完待续。。。

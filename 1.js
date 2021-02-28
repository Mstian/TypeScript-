// 数字
var num = 10;
// boolean 
var bool = true;
// string
var str = "lucy";
// undefined
var unde = undefined;
//null
var nulls = null;
// 数组
var numberArr = [1, 2, 3];
var numberArr2 = [1, 2, 3];
// 元祖：tuple
var tupleFirst = ['1', 3];
// 枚举
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender["Female"] = "Female";
})(Gender || (Gender = {}));
console.log(Gender.Male);
var constEmunProfile = [1 /* age */, 0 /* name */, 2 /* gender */];

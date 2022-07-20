"use strict";
const fun1 = (array) => {
    console.log(array.flat(3));
};
fun1([1, 2, [3, 4, [5]]]);

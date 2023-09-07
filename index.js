const s1 = Symbol();
const s2 = Symbol("foo");
const s3 = Symbol("foo");
const s4 = Symbol("bar");

console.log(s1, s2, s3, s4);
console.log(s1.toString);

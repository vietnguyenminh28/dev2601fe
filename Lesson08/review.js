

// 2 biến , hàng , kiểu dữ liệu, toán tử ,biểu thức , câu lệnh , block, comment

// var name = "John"; // biến name kiểu dữ liệu string
// const PI= 3.14; // biến PI kiểu dữ liệu number
// let age = 30; // biến age kiểu dữ liệu number
// let marks = [90, 80, 70]; // biến marks kiểu dữ liệu array      85.5 là kiểu số thực
// // toán tử số học: +, -, *, /, %, ++, -- 
// // toán tử so sánh: ==, ===, !=, !==, >, <, >=, <=
// // toán tử logic: &&, ||, !
// // biểu thức: 5 + 3, age > 18, marks[0] >= 90
// // chuỗi (+)



// 1. Khai báo các biến bị thiếu trước khi sử dụng
// var age = 25;       // Cho một số lớn hơn 18 để isAdult = true
// var name = "John";  // Tên là John theo như ghi chú của bạn

// // 2. Chạy các biểu thức
// var result = 5 + 3; // biểu thức số học
// var isAdult = age > 18;

// // biểu thức chuỗi ghép thông thường
// var message1 = "Hello, " + name; 

// // biểu thức chuỗi với template literal (dùng biến mới để không đè mất chữ Hello)
// var message2 = `Welcome, ${name}. You are ${age} years old.`; 

// // 3. In kết quả ra màn hình
// console.log(result);   // in ra 8
// console.log(isAdult);  // in ra true
// console.log(message1); // in ra "Hello, John"
// console.log(message2); // in ra "Welcome, John. You are 25 years old."
/*
3. Hàm hệ thống alert() và confirm() và prompt() và console.log() ->browser

4. Câu lệnh điều kiện if else , switch case,for , while, do while, break, continue
4.1 Câu lệnh điều kiện if else, switch case
4.2 Câu lệnh lặp for, while, do while
4.3 Câu lệnh break, continue,return

5. Cấu trúc dữ liệu :mảng, đối tượng, Set, Map, WeakSet, WeakMap
6. Hàm : function, arrow function, callback function, closure
*/
// ví dụ : viết hàm kiểm tra 1 số nguyên có phai là số nguyên tố hay không
function isPrime(n) {
  if (n <= 1) return false; 
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false; 
    }
  }
  return true; 
}
console.log(isPrime(7)); 

// ví dụ : viết hàm in ra các số nguyên tố từ 1 đến n
var n = 20;
function printPrimes(n) {
    for (let i = 2; i <= n; i++) {
        if (isPrime(i)) {
            console.log(i);
        }
    }
}
printPrimes(n);
//ví dụ : viết hàm sinh ra mảng 10 số ngẫu nhiên các số nguyên gồm 2 chữ số 
var randomNumbers = [];
const generateRandomNumbers = () => {
    for (let i = 0; i < 10; i++) {
        randomNumbers.push(Math.floor(Math.random() * 90) + 10);
    }
}
generateRandomNumbers();
console.log(randomNumbers);
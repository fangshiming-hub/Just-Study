import "./style/index1.css";
import "./style/index2.css";
import "./style/index.less";
import "./js/test1";

import keyboard from "@/img/keyboard.jpg";
import yumaoqiu from "@/img/yumaoqiu.png";
const img = new Image();
img.src = keyboard;
img.style.width = "500px";
document.body.appendChild(img);

const img1 = new Image();
img1.src = yumaoqiu;
document.body.appendChild(img1);
const arr = [1,2,3];
// babel 转码箭头函数
arr.forEach((item) => {
  console.log(item)
})

function testPromise(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2)
        }, 2000)
    })
}
testPromise().then((res) => {
    console.log(res, "测试结果");
})


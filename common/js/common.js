
/* 这里面收集的都是平时我遇到的需要集成成公共方法的js */

/* 
****function: 	价格格式化
	example：
		var p = 156300.50;
		console.log(toThousands(p)); //156,300.50
 */
function toThousands(num) {  
    var num = (num || 0).toString().replace(/\,/g, "").split('\.'), result = '';  
    while (num[0].length > 3) {  
        result = ',' + num[0].slice(-3) + result;  
        num[0] = num[0].slice(0, num[0].length - 3);  
    }  
    if (num[0]) { result = num[0] + result; } 
    if (num.length > 1) result += '.'+num[1];
    return result;  
} 


/*
    *http://caibaojian.com/setinterval.html
    *关于setInterval 休眠问题和解决方法 没太大效果
 */
/**
*   利用setTimeout模仿setInterval
 */
function interval(func, wait){
    var interv = function(){
        func.call(null);
        setTimeout(interv, wait);
    };
    setTimeout(interv, wait);
}

/**
 * @Author    Hybrid
 * @DateTime  2017-05-26
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @return    function 完美解决setInterval休眠问题 98%
 *            Chrome 4.0+ | ie 10+ | Firefox (Gecko)  3.5+ | Opera  10.6+  | Safari (WebKit) 4+
 *            才支持worker,否则延用原来的setInterval
 */
;(function() {
'use strict';
function Interval(callback, interval) {
    if(window.Worker){
        var myWorker = new Worker('./js/worker.js');

        myWorker.postMessage(interval);
        
        myWorker.onmessage = function(oEvent) {
            if(oEvent.data.interval) callback();
            else console.error('your sb');
        };
        // 报错信息
        myWorker.onerror=function(error){
            console.log(error.filename,error.lineno,error.message);
        }
    }else{
        setInterval(callback, interval);
    }
};
window.worInterval = function(callback, interval){
    return new Interval(callback, interval);
}
})();

/**
 * @Author    Hybrid
 * @DateTime  2017-05-23
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @return    {[type]}    获取屏幕尺寸
 */
function getPrint(){
    if (document.compatMode == "BackCompat"){
        return {
        width: Math.max(document.body.scrollWidth,document.body.clientWidth),
        height: Math.max(document.body.scrollHeight,document.body.clientHeight)
        }
    } else {
        return {
        width: Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth),
        height: Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight)
        }
    }
}






//输入 金额选中
/**
 * 输入框只能输入数字
 * @Author   陈龙
 * @DateTime 2017-06-12
 * @version  [version]
 * @return   {[type]}   [description]
 */
function checkMoney(){
    var moneyText = ''+$(this).val();
    moneyText=moneyText.replace(/\D/g,'');
    if(0==moneyText){
        moneyText='';
    }
}

/**
 * 将图像文件转换为base64字符串
 * USE loadImageFile('myimage.jpg').then(string64 => { alert(string64); });
 */
var canvas = document.createElement('canvas');
var ctxt = canvas.getContext('2d');
function loadImageFile(url, callback) {
  var image = new Image();
  image.src = url;
  return new Promise((accept, reject) => {
    image.onload = accept;
    image.onerror = reject;
  }).then(accept => {
    canvas.width = this.width;
    canvas.height = this.height;
    ctxt.clearRect(0, 0, this.width, this.height);
    ctxt.drawImage(this, 0, 0);
    accept(canvas.toDataURL());
  });
}

/**
 * 关于rem的字体大小设置
 * @Author   陈龙
 * @DateTime 2017-06-22
 * @version  [version]
 * @param    {[type]}   w [description]
 * @return   {[type]}     [description]
 */
function remSet(w){
    var winW=document.documentElement.clientWidth,_self=arguments,num=100;
    winW=winW>w?w:winW;
    num=(winW*100/w)<50?50:(winW*100/w);
    document.getElementsByTagName('html')[0].style.fontSize=num+"px";
    window.onresize=function(){
        _self.callee(w);
    }
}
remSet(640);
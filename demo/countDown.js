/**
 * Created by wangwei on 17/11/21.
 *
 * 定时器插件
 * 使用方法引用js文件,调用canvasContent函数即可
 * canvasContent函数中totalTime的单位是毫秒
 *
 * 可以设定时间、颜色
 * 具有暂停、继续功能#voiceTime以及#canvas
 * 想要修改样式可以调节
 *
 */

var voicTimeId = $('#voicTime');
var canvas = document.getElementById('canvas');
var canvasW = canvas.width;
var canvasH = canvas.height;
var canvasTime = '';
var pauseData = {};
var ctx = canvas.getContext('2d');
var count = 0;
var totalCount = 0;
var speed = 50;
var startCount = 0;
/**
 *
 * @author weiwang39
 *
 * 绘制倒计时函数
 * @param totalTime 倒计时时间
 * @param color 倒计时圆圈颜色
 * @param defer deferred对象
 */
function canvasContent(totalTime, color, defer) {
    clearTimeout(canvasTime);
    pauseData.color = color;
    pauseData.totalTime = totalTime;
    if (canvas.getContext) {
        totalCount = parseInt(totalTime / speed) - 1;
        var increase = 2 * Math.PI * speed / totalTime;
        pauseData.increase = increase;
        var startTime = new Date().getTime();
        canvasTime = setTimeout(fixed, speed);
    }
}
/**
 *
 * @author weiwang
 *
 * 暂停定时器
 *
 * 暂停需要记录之前计时器的位置、剩余时间、圆形圈的速率
 */
function pauseClock() {
    clearTimeout(canvasTime);
}
/**
 *
 * @author weiwang39
 *
 * 继续定时器
 */
function resumeClock() {
    clearTimeout(canvasTime);
    canvasTime = setTimeout(fixed, speed);
}
//通过setTimeout优化倒计时缓慢问题
function fixed() {
    var startTime = new Date().getTime();
    startCount = 0;
    if (count == totalCount) {
        clearTimeout(canvasTime);
        voicTimeId.html('00:00');
        alert('倒计时结束');
    } else {
        count++;
        var offset = new Date().getTime() - (startTime + startCount * speed);
        startCount++;
        var nextTime = speed - offset;
        if (nextTime < 0) nextTime = 0;
        canvasTime = setTimeout(fixed, nextTime);
        var start = 1.5 * Math.PI -  pauseData.increase * count;
        ctx.clearRect(0, 0, canvasW, canvasH);
        ctx.beginPath();
        ctx.strokeStyle = pauseData.color;
        ctx.closePath();
        ctx.arc(60, 60, 56, start, -0.5 * Math.PI, true);
        ctx.lineWidth = 3;
        ctx.stroke();
        if (pauseData.totalTime > 0) {
            pauseData.totalTime -= speed;
        } else {
            pauseData.totalTime = 0;
        }
        voicTimeId.html(('00' + Math.floor(pauseData.totalTime / 60000)).substr(-2, 2) + ':' + ('00' + Math.ceil((pauseData.totalTime % 60000) / 1000)).substr(-2, 2));
    }
    pauseData.start = start;
}

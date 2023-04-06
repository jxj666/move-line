/*
 * @LastEditTime: 2023-04-06 11:43:54
 * @LastEditors: jinxiaojian
 */
//闭合轨道
let data = [
  [657, 1072], [1118, 749], [1232, 791], [1463, 622], [1408, 604], [1822, 300], [1232, 165], [728, 399], [398, 289], [69, 411,], [670, 652,], [148, 969,], [300, 1072],
]
function getPic ({
  lineNum = 2,
  pointNum = 100,
  color = '#0FF4FF',
  canvasId = '#canvas',
  kuan = 1920,
  gao = 1080,
  arrTrack=data
}) {
  var canvas = document.querySelector(canvasId);
  var ctx = canvas.getContext("2d");
  //点数 
  var num = pointNum
  var arr = []
  canvas.width = kuan
  canvas.height = gao
  let point = {
    r: 10,
    color: color,
    i: 0,
    now: {}
  }
  let arrAmend = []
  for (let i = 0; i < arrTrack.length; i++) {
    let now = arrTrack[i]
    let last = arrTrack[i + 1] || arrTrack[0]
    let r = Math.floor(Math.sqrt(Math.pow(now[0] - last[0], 2) + Math.pow(now[1] - last[1], 2)) / 10)
    if (r < 1) r = 1
    for (let j = 0; j < r; j++) {
      if (j === 0) {
        arrAmend.push([now[0], now[1]])
      } else {
        arrAmend.push(
          [
            arrAmend[arrAmend.length - 1][0] + (last[0] - now[0]) / r,
            arrAmend[arrAmend.length - 1][1] + (last[1] - now[1]) / r,
          ]
        )
      }

    }
  }
  for (let i = 0; i < num; i++) {
    let n16 = Math.floor(i / num * 256).toString(16)
    n16 = n16.length === 1 ? '0' + n16 : n16
    for (let j = 0; j < lineNum; j++) {
      let key = Math.floor(arrAmend.length / lineNum)
      arr.push({
        ...point, i: Math.round(i + j * key), color:  color + n16 , now: {
          x: arrAmend[Math.round(i + j * key)][0],
          y: arrAmend[Math.round(i + j * key)][1]
        }
      })
    }

  }
  function draw (last, to) {
    var yuan = to;
    ctx.beginPath();
    ctx.strokeStyle = yuan.color;
    ctx.lineWidth = yuan.r;
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(yuan.x, yuan.y);
    ctx.stroke();
    ctx.closePath();
  }
  function update () {
    for (let i = 0; i < arr.length; i++) {
      let point = arr[i]
      let last = { x: point.now.x, y: point.now.y };
      if (arr[i].i === arrAmend.length - 1) {
        arr[i].i = 0
        arr[i].now.x = arrAmend[0][0]
        arr[i].now.y = arrAmend[0][1]
      } else {
        arr[i].i = arr[i].i + 1
        arr[i].now.x = arrAmend[arr[i].i][0]
        arr[i].now.y = arrAmend[arr[i].i][1]
      }
      arr[i].x = arr[i].now.x
      arr[i].y = arr[i].now.y
      draw(last, arr[i]);
    }
  }
  setInterval(function () {
    ctx.clearRect(0, 0, 1920, 1080)
    update();
  }, 10)
}

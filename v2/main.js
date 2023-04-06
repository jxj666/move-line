/*
 * @LastEditTime: 2023-04-06 11:35:03
 * @LastEditors: jinxiaojian
 */
function getPic ({
  lineNum = 2,
  pointNum = 100,
  color = '#0FF4FF',
  canvasId = '#canvas',
  kuan = 1920,
  gao = 1080
}) {
  let arr3 = [
    [657, 1072], [1118, 749], [1232, 791], [1463, 622], [1408, 604], [1822, 300], [1232, 165], [728, 399], [398, 289], [69, 411,], [670, 652,], [148, 969,], [300, 1072],
  ]
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
  let arr2 = []
  for (let i = 0; i < arr3.length; i++) {
    let now = arr3[i]
    let last = arr3[i + 1] || arr3[0]
    let r = Math.floor(Math.sqrt(Math.pow(now[0] - last[0], 2) + Math.pow(now[1] - last[1], 2)) / 10)
    if (r < 1) r = 1
    for (let j = 0; j < r; j++) {
      if (j === 0) {
        arr2.push([now[0], now[1]])
      } else {
        arr2.push(
          [
            arr2[arr2.length - 1][0] + (last[0] - now[0]) / r,
            arr2[arr2.length - 1][1] + (last[1] - now[1]) / r,
          ]
        )
      }

    }
  }
  for (let i = 0; i < num; i++) {
    let n16 = Math.floor(i / num * 256).toString(16)
    n16 = n16.length === 1 ? '0' + n16 : n16
    for (let j = 0; j < lineNum; j++) {
      let key = Math.floor(arr2.length / lineNum)
      arr.push({
        ...point, i: Math.round(i + j * key), color: i < 30 ? color + n16 : color, now: {
          x: arr2[Math.round(i + j * key)][0],
          y: arr2[Math.round(i + j * key)][1]
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
      if (arr[i].i === arr2.length - 1) {
        arr[i].i = 0
        arr[i].now.x = arr2[0][0]
        arr[i].now.y = arr2[0][1]
      } else {
        arr[i].i = arr[i].i + 1
        arr[i].now.x = arr2[arr[i].i][0]
        arr[i].now.y = arr2[arr[i].i][1]
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

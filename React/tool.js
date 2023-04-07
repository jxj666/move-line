// 闭合轨道
const data = [
  [657, 1072, 0],
  [1118, 749, 2, 1],
  [1232, 791, 2, 1],
  [1460, 618, 2, 1],
  [1405, 603, 2, 1],
  [1822, 300, 2, 1],

  [1230, 163, 2, 1],

  [1201, 178],
  [804, 363, 0],
  [728, 399, 2, 1],
  [398, 289, 2, 1],
  [380, 296, 2, 1],
  [142, 395, 0],
  [69, 411],
  [670, 652],
  [693, 664, 0],
  [642, 700, 0],
  [640, 701],
  [552, 746, 0],
  [546, 751],
  [458, 800, 0],
  [448, 807],
  [356, 856, 0],
  [341, 865],
  [246, 915, 0],
  [148, 969, 2, 1],
  [342, 1072]
]
export function getPic({
  lineNum = 2,
  pointNum = 100,
  color = '#093FFF',
  canvasId = '#canvas',
  kuan = 1920,
  gao = 1080,
  arrTrack = data,
  r = 5
}) {
  var canvas = document.querySelector(canvasId);
  var ctx = canvas.getContext('2d');
  // 点数 
  var num = pointNum
  var arr = []
  const arrTotal = []
  canvas.width = kuan
  canvas.height = gao
  const point = {
    r,
    color,
    i: 0,
    now: {}
  }
  const arrAmend = []
  for (let i = 0; i < arrTrack.length; i++) {
    const now = arrTrack[i]
    const last = arrTrack[i + 1] || arrTrack[0]
    let r = Math.floor(Math.sqrt(Math.pow(now[0] - last[0],
      2) + Math.pow(now[1] - last[1],
        2)) / 10)
    if (r < 1) r = 1
    for (let j = 0; j < r; j++) {
      if (j === 0) {
        arrAmend.push([...now])
      } else {
        arrAmend.push(
          [
            arrAmend[arrAmend.length - 1][0] + (last[0] - now[0]) / r,
            arrAmend[arrAmend.length - 1][1] + (last[1] - now[1]) / r,
            last[2]
          ]
        )
      }
    }
  }
  for (let i = 0; i < lineNum; i++) {
    arrTotal.push([])
  }
  for (let i = 0; i < num; i++) {
    let n16 = Math.floor(i / num * 256).toString(16)
    n16 = n16.length === 1 ? `0${n16}` : n16
    for (let j = 0; j < lineNum; j++) {
      const key = Math.floor(arrAmend.length / lineNum)
      arrTotal[j].push({
        ...point, i: Math.round(i + j * key), color: color + n16,
        hole: arrAmend[Math.round(i + j * key)][2],
        turning: arrAmend[Math.round(i + j * key)][3],
        x: arrAmend[Math.round(i + j * key)][0],
        y: arrAmend[Math.round(i + j * key)][1]
      })
    }
  }
  function draw(last, to, turning) {
    var yuan = to;
    ctx.beginPath();
    ctx.strokeStyle = yuan.hole === 0 ? '#ffffff00' : yuan.color;
    ctx.lineWidth = yuan.r;
    ctx.moveTo(last.x, last.y);
    if (turning) ctx.lineTo(turning.x, turning.y);
    ctx.lineTo(yuan.x, yuan.y);
    ctx.stroke();
    ctx.closePath();
  }
  // function draw2(arr) {
  //   for (let i = 0; i < arr.length; i++) {
  //     var yuan = arr[i];
  //     if (i === 0) {
  //       console.log('start')
  //     } else {
  //       ctx.beginPath();
  //       ctx.lineCap = 'round';
  //       ctx.lineWidth = r;
  //       ctx.strokeStyle = yuan.hole === 0 ? '#ffffff00' : yuan.color
  //       ctx.moveTo(arr[i - 1].x, arr[i - 1].y);
  //       ctx.lineTo(arr[i].x, arr[i].y);

  //       ctx.stroke();
  //     }
  //   }

  //   // ctx.closePath();
  // }
  function update(arr) {
    for (let i = 0; i < arr.length; i++) {
      const point = arr[i]
      const last = {x: point.x, y: point.y};
      let turning
      if (arr[i].i === arrAmend.length - 1) {
        arr[i].i = 0
      } else {
        arr[i].i = arr[i].i + 1
      }
      arr[i].x = arrAmend[arr[i].i][0]
      arr[i].y = arrAmend[arr[i].i][1]
      arr[i].hole = arrAmend[arr[i].i][2]
      if (arrAmend[arr[i].i][3]) {
        if (i < arr.length - 1) {
          i = i + 1
          turning = {...arr[i]}
        } else {
          return
        }
        if (arr[i].i === arrAmend.length - 1) {
          arr[i].i = 0
        } else {
          arr[i].i = arr[i].i + 1
        }
        arr[i].x = arrAmend[arr[i].i][0]
        arr[i].y = arrAmend[arr[i].i][1]
        arr[i].hole = arrAmend[arr[i].i][2]
      }

      draw(last, arr[i], turning)
    }
    // draw2(arr)
  }
  setInterval(() => {
    ctx.clearRect(0, 0, 1920, 1080)
    for (let i = 0; i < lineNum; i++) {
      update(arrTotal[i]);
    }
  }, 10)
}

const userName = window.currentUser.name;
const email = window.currentUser.email;
const emailPrefix = email.substring(0, email.indexOf('@'));

function createStyle(cssText) {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssText;
  document.querySelector('head').appendChild(style);
}

function transform(source, matrix) {
  return matrix.map(item =>
    Math.floor(item.reduce((result, next, index) => result + next * source[index], 0))
  );
}

function generateWaterMarkImage() {
  const watermarkText = `${userName} ${emailPrefix}`;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = '100 30px "pingFangSC-Regular", "Myriad Pro", "Hiragino Sans GB", "Microsoft Yahei", sans-serif';

  // 计算watermarkText宽度
  const textMetrics = ctx.measureText(watermarkText);
  const textWidth = Math.floor(textMetrics.width) + 1;

  const startX = 0;
  const startY = 240;
  const rotateRadian = 15 * Math.PI / 180;
  const rotateCos = Math.cos(rotateRadian);
  const rotateSin = Math.sin(rotateRadian);
  const horizontalInterval = Math.floor(textWidth * rotateCos);
  const verticalInterval = 260;
  const deltaVertial = Math.floor(textWidth * rotateSin);

  ctx.canvas.width = horizontalInterval * 2;
  ctx.canvas.height = verticalInterval * 1.6;
  ctx.font = '100 30px "pingFangSC-Regular", "Myriad Pro", "Hiragino Sans GB", "Microsoft Yahei", sans-serif';
  ctx.fillStyle = 'rgba(151,159,172,0.15)';
  ctx.rotate(-rotateRadian);

  /**
   * 计算水印meta块各点坐标
   * __________________________
   * |        (x3, y3)        |
   * |                        |
   * |(x1, y1)        (x5, y5)|
   * |                        |
   * |        (x4, y4)        |
   * |                        |
   * |(x2, y2)        (x6, y6)|
   * |________________________|
   * */

  const matrix = [[rotateCos, -rotateSin], [rotateSin, rotateCos]];

  const [x1, y1] = transform([startX, startY], matrix);
  ctx.fillText(watermarkText, x1 + 5, y1);
  const [x2, y2] = transform([startX, startY + verticalInterval * 2 / 3], matrix);
  ctx.fillText(watermarkText, x2 + 5, y2);
  // const [x3, y3] = transform(
  //   [startX + horizontalInterval, startY - deltaVertial - verticalInterval / 2], matrix);
  // ctx.fillText(watermarkText, x3, y3);
  // const [x4, y4] = transform(
  //   [startX + horizontalInterval, startY - deltaVertial + verticalInterval / 2], matrix);
  // ctx.fillText(watermarkText, x4, y4);
  const [x5, y5] = transform(
    [startX + horizontalInterval, startY - 2 * deltaVertial], matrix);
  ctx.fillText(watermarkText, x5, y5);
  const [x6, y6] = transform(
    [startX + horizontalInterval, startY - 2 * deltaVertial + verticalInterval * 2 / 3], matrix);
  ctx.fillText(watermarkText, x6, y6);

  const base64Img = canvas.toDataURL();

  const styleText = '.g-watermark {'
    + `background-image: url("${base64Img}");`
    + `background-size: auto ${verticalInterval}px`
    + '}';

  createStyle(styleText);
}

generateWaterMarkImage();
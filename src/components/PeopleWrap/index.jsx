import React from 'react';
import './style.less';

function generateWaterMarkImage(watermarkText) {
  const fontStyle = '16px "pingFangSC-Regular", "Myriad Pro", "Hiragino Sans GB", "Microsoft Yahei", sans-serif';
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  ctx.font = fontStyle;
  // 计算watermarkText宽度
  const textWidth = Math.floor(ctx.measureText(watermarkText).width) + 1;
  const rotateRadian = 15 * Math.PI / 180;
  const sinHeight = Math.sin(rotateRadian) * textWidth;

  canvas.width = textWidth * 1.2;
  canvas.height = sinHeight * 2;

  ctx.rotate(-rotateRadian);
  ctx.font = fontStyle;
  ctx.fillStyle = 'rgba(151,159,172,0.15)';
  ctx.fillText(watermarkText, 0, sinHeight * 1.5);

  return canvas.toDataURL();
}

// const userName = window.currentUser.name;
// const email = window.currentUser.email;
// const emailPrefix = email.substring(0, email.indexOf('@'));

export default ({ className = '', children, waterMark = '字节跳动     Bytedance' }) => <div
  className={`pui-wrap ${className}`}
  style={{
    backgroundImage: `url("${generateWaterMarkImage(waterMark)}")`
  }}>
  {children}
</div>
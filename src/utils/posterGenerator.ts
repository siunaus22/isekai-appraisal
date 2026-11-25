import { STAT_LABELS } from '../data/isekaiData';
import { AppraisalResult, StatKey } from '../types/game';

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const chars = Array.from(text);
  let line = '';
  let currY = y;

  for (let i = 0; i < chars.length; i++) {
    const testLine = line + chars[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line.length > 0) {
      ctx.fillText(line, x, currY);
      line = chars[i];
      currY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, currY);
    currY += lineHeight;
  }
  return currY;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function generateRegistrationPoster(result: AppraisalResult): string {
  const width = 750;
  const height = 1220;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Parchment Background
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#f4e8ce');
  bgGrad.addColorStop(0.5, '#ebd9b4');
  bgGrad.addColorStop(1, '#e0c89a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle parchment grain dots
  ctx.fillStyle = 'rgba(92, 58, 28, 0.045)';
  for (let i = 0; i < 600; i++) {
    const rx = (i * 97) % width;
    const ry = (i * 173) % height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // 2. Outer Dark Brown & Gold Frame
  ctx.strokeStyle = '#3d2514';
  ctx.lineWidth = 8;
  ctx.strokeRect(24, 24, width - 48, height - 48);

  ctx.strokeStyle = '#b88a32';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(36, 36, width - 72, height - 72);

  // Corner Ornaments
  const corners = [
    [36, 36],
    [width - 36, 36],
    [36, height - 36],
    [width - 36, height - 36],
  ];
  ctx.fillStyle = '#b88a32';
  for (const [cx, cy] of corners) {
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Header Banner
  ctx.fillStyle = '#3d2514';
  drawRoundedRect(ctx, 70, 66, width - 140, 86, 10);
  ctx.fill();
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#f5e4bc';
  ctx.textAlign = 'center';
  ctx.font = 'bold 34px "PingFang SC", "Microsoft YaHei", serif';
  ctx.fillText('异世界冒险者登记证', width / 2, 112);
  ctx.fillStyle = '#d4af37';
  ctx.font = '15px monospace';
  ctx.fillText(`GUILD REGISTRATION NO. ${result.adventurerId}`, width / 2, 138);

  // 4. Class Name & Title
  ctx.textAlign = 'left';
  ctx.fillStyle = '#7a4b23';
  ctx.font = 'bold 18px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText('【转生职业评定】', 72, 200);

  ctx.fillStyle = '#2d1a0d';
  ctx.font = 'bold 46px "PingFang SC", "Microsoft YaHei", serif';
  ctx.fillText(result.isekaiClass.name, 72, 256);

  ctx.fillStyle = result.isekaiClass.accentColor;
  ctx.font = 'bold 22px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText(result.isekaiClass.title, 72, 292);

  // Red Stamp on top right
  ctx.save();
  ctx.translate(width - 155, 240);
  ctx.rotate(-0.18);
  ctx.strokeStyle = 'rgba(182, 34, 34, 0.85)';
  ctx.lineWidth = 4;
  drawRoundedRect(ctx, -78, -32, 156, 64, 8);
  ctx.stroke();
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, -72, -26, 144, 52, 5);
  ctx.stroke();
  ctx.fillStyle = 'rgba(182, 34, 34, 0.9)';
  ctx.textAlign = 'center';
  ctx.font = 'bold 26px "PingFang SC", "Microsoft YaHei", serif';
  ctx.fillText(result.isekaiClass.stampText, 0, 10);
  ctx.restore();

  // Class Description
  ctx.textAlign = 'left';
  ctx.fillStyle = '#4a311d';
  ctx.font = '20px "PingFang SC", "Microsoft YaHei", sans-serif';
  let nextY = drawWrappedText(ctx, result.isekaiClass.description, 72, 338, width - 144, 30);

  // 5. Exclusive Cheat Skill Box
  nextY += 16;
  ctx.fillStyle = 'rgba(61, 37, 20, 0.08)';
  drawRoundedRect(ctx, 70, nextY, width - 140, 138, 12);
  ctx.fill();
  ctx.strokeStyle = '#b88a32';
  ctx.lineWidth = 2;
  ctx.stroke();

  const tierColors: Record<string, string> = {
    SSR: '#c43b2b',
    SR: '#9146b8',
    R: '#2e6f95',
  };

  ctx.fillStyle = tierColors[result.skill.tier] || '#b88a32';
  drawRoundedRect(ctx, 90, nextY + 20, 74, 34, 6);
  ctx.fill();

  ctx.fillStyle = '#fff9ee';
  ctx.textAlign = 'center';
  ctx.font = 'bold 20px monospace';
  ctx.fillText(result.skill.tier, 127, nextY + 44);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#2d1a0d';
  ctx.font = 'bold 24px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText(result.skill.name, 178, nextY + 45);

  ctx.fillStyle = '#4a311d';
  ctx.font = '19px "PingFang SC", "Microsoft YaHei", sans-serif';
  drawWrappedText(ctx, result.skill.description, 90, nextY + 84, width - 180, 28);

  // 6. Six-Dim Stats Bars
  nextY += 172;
  ctx.fillStyle = '#7a4b23';
  ctx.font = 'bold 18px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText('【六维资质面板】', 72, nextY);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#9c2d23';
  ctx.font = 'bold 20px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText(`预计存活：${result.survivalDays} 天`, width - 72, nextY);

  nextY += 28;
  const statKeys: StatKey[] = ['str', 'mag', 'luk', 'int', 'cha', 'abs'];
  const colW = (width - 170) / 2;

  statKeys.forEach((key, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const sx = 72 + col * (colW + 26);
    const sy = nextY + row * 68;
    const val = result.stats[key];
    const meta = STAT_LABELS[key];

    ctx.textAlign = 'left';
    ctx.fillStyle = '#3d2514';
    ctx.font = 'bold 19px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(`${meta.label} (${meta.short})`, sx, sy + 18);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#8a5a19';
    ctx.font = 'bold 20px monospace';
    ctx.fillText(String(val), sx + colW, sy + 18);

    // Bar track
    ctx.fillStyle = 'rgba(61, 37, 20, 0.14)';
    drawRoundedRect(ctx, sx, sy + 28, colW, 14, 7);
    ctx.fill();

    // Bar fill
    ctx.fillStyle = key === 'abs' ? '#a63429' : '#b88a32';
    drawRoundedRect(ctx, sx, sy + 28, Math.max(12, (colW * val) / 100), 14, 7);
    ctx.fill();
  });

  // 7. Guild Master Comment
  nextY += 232;
  ctx.fillStyle = 'rgba(255, 250, 238, 0.65)';
  drawRoundedRect(ctx, 70, nextY, width - 140, 146, 12);
  ctx.fill();
  ctx.strokeStyle = 'rgba(138, 90, 25, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.fillStyle = '#7a4b23';
  ctx.font = 'bold 18px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText('【公会会长评语】', 90, nextY + 34);

  ctx.fillStyle = '#3d2514';
  ctx.font = '20px "PingFang SC", "Microsoft YaHei", serif';
  drawWrappedText(ctx, result.isekaiClass.guildMasterComment, 90, nextY + 70, width - 180, 30);

  // 8. Footer
  ctx.textAlign = 'center';
  ctx.fillStyle = '#7a5a38';
  ctx.font = '16px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText('《异世界转生资质鉴定所》 · Bilibili Toy 互动作品', width / 2, height - 62);

  return canvas.toDataURL('image/png');
}

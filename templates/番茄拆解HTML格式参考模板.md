# 番茄新书榜首拆解 HTML 格式参考模板（Cobalt Grid）

> 来源：2026-07-24 设计师重新排版版本（Cobalt Grid 设计系统）
> 用途：每日输出前对照此模板 + HTML参考模板检查格式一致性
> GitHub参考：https://raw.githubusercontent.com/jiudyq-glitch/writer-assistant-reports/main/templates/cobalt-grid-breakdown-reference.html
> 完整规范：https://raw.githubusercontent.com/jiudyq-glitch/writer-assistant-reports/main/templates/cobalt-grid-format-spec.md
> 规则：文字内容不改，只改格式。此文件为格式基准，不允许偏离。

## CSS 变量（固定，仅2色+2透明度）
```css
:root {
  --paper: #F0EBDE;        /* 全局底色，暖奶油纸 */
  --ink: #1F2BE0;           /* 唯一墨水色。所有文字、边框、badge */
  --ink-soft: #5560E5;      /* 墨色浅变体 */
  --grid: rgba(31,43,224,0.10);    /* 坐标纸网格线 */
  --ink-faint: rgba(31,43,224,0.18); /* 表格行分隔、卡片细边框 */
  --edge: clamp(36px, 3.6vw, 80px); /* 页面边距 */
}
```
**铁律：零其他颜色。没有红色、绿色、橙色。所有层级通过字重、字号、透明度、边框粗细区分。**

## 字体（3族 + 系统 fallback）
```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&family=Hanken+Grotesk:wght@400;500;600&family=DM+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;600&family=Noto+Serif+SC:wght@400;600;700&display=swap" rel="stylesheet">
```
| 用途 | 字体栈 | 字重 |
|------|--------|------|
| 衬线 | 'Newsreader','Noto Serif SC',Georgia,serif | 400/600 |
| 无衬线 | 'Hanken Grotesk','Noto Sans SC','PingFang SC','Microsoft YaHei',system-ui,sans-serif | 400/500/600 |
| 等宽 | 'DM Mono','SF Mono','Menlo','Consolas',monospace | 400/500 |

## 字号层级（全部响应式 clamp，无固定 px）
| 层级 | 尺寸 | 字重 | 字体族 |
|------|------|------|--------|
| H1 主行 | clamp(48px,min(6vw,10vh),100px) | 400 | 衬线 |
| H1 副行 | 同上 | 600（非斜体） | 衬线 |
| H2 | clamp(32px,min(3.5vw,6vh),56px) | 400 | 衬线 |
| H3 | clamp(22px,min(2.2vw,3.5vh),32px) | 400 | 衬线 |
| Lede | clamp(15px,1.05vw,18px) | 400 | 无衬线 |
| Body | clamp(13px,0.95vw,15px) | 400 | 无衬线 |
| Caption | clamp(10px,0.75vw,12px) | 400 | 等宽 |
| KPI Value | clamp(28px,3vw,44px) | 400 | 衬线 |
| 编号装饰 | clamp(64px,8vw,120px) | 400 | 衬线 opacity:0.08 |

## 坐标纸网格背景（body::before 固定定位）
```css
body::before {
  content: '';
  position: fixed; inset: 0;
  background-image:
    linear-gradient(to right, rgba(31,43,224,0.10) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(31,43,224,0.10) 1px, transparent 1px);
  background-size: clamp(28px,2.2vw,44px) clamp(28px,2.2vw,44px);
  pointer-events: none; z-index: 0;
}
```

## Hairline 边框系统
- 全局 hairline：1.5px solid #1F2BE0
- 细线（卡片内/表格行间）：1px solid rgba(31,43,224,0.18)
- **Cobalt Grid 无圆角**（border-radius: 0）

## 导航栏（.nav-fixed，固定顶部 z-index:100）
- 背景 #F0EBDE 不透明，底部 border 1.5px
- .brand：等宽 Caption 全大写 "FANQIE BREAKDOWN"
- .date：等宽 Caption 日期
- .nav-links > a：等宽 Caption opacity:0.6 hover:1.0
- 链接：TOP | EDT | SKL | GRW | DXG | BKS | CON
- 锚点：#top #editor #skills #growth #diagnosis #books #conclusion
- 移动端 768px 隐藏导航链接

## Section 结构（按顺序，每个 .section 有 scroll-margin-top:80px）
| # | Section ID | 内容 |
|---|-----------|------|
| 1 | #top (hero) | .chapter-tag + H1（主行+<em>副行 weight 600）+ .lede |
| 2 | #editor | .section-header + .ec-grid（3张.ec-card）+ .pred-block |
| 3 | #skills | .section-header + .skill-grid（2x2网格，4张.skill-card）|
| 4 | #growth | .section-header + .ga-item卡片（6本）+ .trend-note |
| 5 | #diagnosis | .section-header + .table-wrap > .data-table（9行）|
| 6 | #books | .section-header + .channel-label + .book-block卡片 |
| 7 | #conclusion | .section-header + .callout-box > ol.concl-list（5条）|
| 8 | #source | .footer-note（数据源/明日关注/说明）|

每个 .section-header 有 border-top:1.5px solid var(--ink)，内含 h2 + .section-meta

## 组件结构规范

### 1. 编者按卡片（.ec-grid > .ec-card）
```html
<div class="ec-grid">
  <div class="ec-card">
    <span class="ec-tag">科幻末世</span>
    <div class="ec-title">核心发现标题</div>
    <ul class="ec-summary">
      <li>要点1</li>
      <li>要点2</li>
    </ul>
    <button class="ec-toggle" onclick="toggleEl('ec-more-1')">more ↓</button>
    <div class="ec-more" id="ec-more-1">
      <ul class="ec-summary">
        <li>灰色补充信息</li>
      </ul>
    </div>
  </div>
  <!-- 重复2-3张卡片 -->
</div>
<div class="pred-block">
  <p><strong>趋势预测（多维度）</strong></p>
  <p><strong>近期（1周内）：</strong>...</p>
  <p><strong>中期（1-3个月）：</strong>...</p>
  <p><strong>长期（3-6个月）：</strong>...</p>
</div>
```
- .ec-grid：grid 3列，gap clamp(12px,1.5vw,20px)
- .ec-card：1.5px 边框，padding clamp(20px,2.5vh,32px)
- .ec-tag：等宽 Caption，背景 ink 文字纸色，inline-block
- .ec-title：衬线 H3 尺寸
- .ec-summary li：Body 尺寸，行高 1.7
- .ec-toggle：等宽 Caption，1.5px 边框，hover 背景 ink 文字纸色
- .ec-more：默认隐藏，.open 时显示
- .pred-block：独立区块，分近期/中期/长期三段
- 移动端：单列

### 2. 写作精进卡（.skill-grid > .skill-card）
```html
<div class="skill-grid">
  <div class="skill-card">
    <span class="skill-num">01</span>
    <span class="skill-cat">金手指设计</span>
    <div class="skill-title">技巧名称（一句话）</div>
    <div class="skill-src">SOURCE: 书名</div>
    <div class="skill-ex">核心方法（2-3句操作方法）</div>
  </div>
  <!-- 4张卡片，2x2网格 -->
</div>
```
- .skill-grid：grid 2列（移动端1列）
- .skill-card：1.5px 边框，padding clamp(20px,2.5vh,32px)
- .skill-num：等宽 Caption opacity:0.5（或右下角超大装饰编号 clamp(64px,8vw,120px) opacity:0.08）
- .skill-cat：等宽 Caption 全大写
- .skill-title：衬线 H3 尺寸
- .skill-src：等宽 Caption opacity:0.5
- .skill-ex：Body 尺寸

### 3. 书籍拆解卡片（.book-block）
```html
<div class="book-block">
  <div class="book-hd">
    <div class="book-name">书名 <span class="pill-badge">已拆精要</span></div>
    <div class="book-meta">#1 · 作者 · 26.4万字 · 连载中 · 在读 20.80万 · bookId xxx</div>
  </div>
  <!-- 展示区（始终可见）-->
  <div class="dim"><span class="dim-num">1</span><h3>基础信息</h3></div>
  <table class="info-table">...</table>
  <div class="dim"><span class="dim-num">4</span><h3>人设与CP</h3></div>
  <div class="chara-block">...</div>
  <div class="dim"><span class="dim-num">5</span><h3>微创新点</h3></div>
  <ol class="insight-list">...</ol>
  <div class="dim"><span class="dim-num">7</span><h3>Qiao可借鉴Top3</h3></div>
  <ol class="insight-list">...</ol>
  <!-- 折叠区 -->
  <button class="collapse-btn" onclick="toggleEl('collapse-xxx')">▾ 维度2·3·6·8</button>
  <div class="collapse-content" id="collapse-xxx">
    <div class="dim"><span class="dim-num">2</span><h3>核心梗与爽点映射</h3></div>
    <div class="pts-grid">...</div>
    <div class="dim"><span class="dim-num">3</span><h3>黄金前十章逐章拆解</h3></div>
    <div class="ch-breakdown">...</div>
    <div class="dim"><span class="dim-num">6</span><h3>开篇评分</h3></div>
    <div class="sc-row">...</div>
    <div class="dim"><span class="dim-num">8</span><h3>推流阶段诊断</h3></div>
    <p>...</p>
  </div>
</div>
```
- .book-block：1.5px 边框，margin-bottom 较大
- .book-name：衬线 H3 尺寸
- .pill-badge：等宽 Caption，背景 ink 文字纸色，padding 2px 8px（"已拆精要"或"🆕今日新增拆解"）
- .book-meta：等宽 Caption opacity:0.6
- .dim-num：等宽 Caption，背景 ink 文字纸色，padding 2px 8px，border-radius:0
- .info-table：2列无边框，td padding 6px 0
- 新拆书：全部8维度展开，无折叠区

### 4. 人设组件（.chara-block）
```html
<div class="chara-block">
  <div class="surf"><b>外貌表相：</b>...；<b>性格表相：</b>...</div>
  <div class="core"><span class="arrow-label">↓反差内核↓</span> 内容</div>
  <div class="anchor"><b>性格锚点：</b>创伤：... | 执念：... | 软肋：... | 底线：...</div>
</div>
```

### 5. 爽点映射（.pts-grid > .pt-item）
```html
<div class="pts-grid">
  <div class="pt-item"><b>获得爽</b> <span class="pt-hit">命中</span> · 说明 · 高</div>
  <div class="pt-item"><b>升级爽</b> <span class="pt-weak">弱</span> · 说明 · 低</div>
</div>
```
- .pt-hit：等宽 Caption，背景 ink 文字纸色，padding 1px 6px
- .pt-weak：等宽 Caption，1px 边框 ink，padding 1px 6px，opacity:0.5

### 6. 章节拆解（.ch-breakdown > .ch-item）
```html
<div class="ch-breakdown">
  <div class="ch-item">
    <div class="ch-h">第1章 章节标题</div>
    <div class="ch-grid">
      <div class="g"><b>核心事件：</b>内容</div>
      <div class="g"><b>目标/情绪：</b>内容</div>
      <div class="g"><b>章节钩子：</b><span class="hook">钩子文字</span></div>
      <div class="g"><b>伏笔：</b><span class="foreshadow">伏笔文字</span></div>
    </div>
  </div>
</div>
```
- .hook：font-weight:600（加粗突出）
- .foreshadow：font-style:italic（衬线斜体，唯一允许斜体）

### 7. 开篇评分（.sc-row > .sc-cell）
```html
<div class="sc-row">
  <div class="sc-cell"><div class="sc-label">钩子</div><div class="sc-val">5</div></div>
  <div class="sc-cell"><div class="sc-label">代入</div><div class="sc-val">3</div></div>
  <div class="sc-cell"><div class="sc-label">信息</div><div class="sc-val">4</div></div>
  <div class="sc-cell"><div class="sc-label">金手指</div><div class="sc-val">5</div></div>
  <div class="sc-cell sc-total"><div class="sc-label">综合</div><div class="sc-val">4.3</div></div>
</div>
```
- .sc-label：等宽 Caption opacity:0.6
- .sc-val：衬线 KPI Value 尺寸
- .sc-total：背景 rgba(31,43,224,0.03)，.sc-val font-weight:600

### 8. 增长分析（.ga-item）
```html
<div class="ga-item">
  <div class="ga-h">书名 <span class="trend-up">+4,388 (+2.2%)</span></div>
  <div class="ga-body">
    <p><b>当前剧情阶段：</b>...</p>
    <p><b>增长归因：</b>...</p>
    <p><b>写作启示：</b>...</p>
  </div>
</div>
```
- .trend-up：font-weight:600（不用绿色）
- .trend-down：opacity:0.5（不用红色）

### 9. 推流诊断表（.table-wrap > .data-table）
```html
<div class="table-wrap">
  <table class="data-table">
    <thead><tr><th>书名</th><th>字数</th><th>推流阶段</th><th>风险</th><th>情节卡点×推流</th></tr></thead>
    <tbody>
      <tr><td>书名</td><td>26.4万</td><td>长期推荐期</td><td><span class="risk-tag risk-low">低</span></td><td>说明</td></tr>
    </tbody>
  </table>
</div>
```
- .risk-tag.risk-high：font-weight:700
- .risk-tag.risk-mid：opacity:0.7
- .risk-tag.risk-low：opacity:0.5
- 表头：等宽 Caption，1.5px 下边框
- 行间：1px solid rgba(31,43,224,0.18)

### 10. 结论建议（.callout-box > ol.concl-list）
```html
<div class="callout-box">
  <ol class="concl-list">
    <li><b>建议标题</b>——正文说明</li>
  </ol>
</div>
```
- .callout-box：1.5px 边框

### 11. 折叠面板（原生 JS）
```html
<button class="collapse-btn" onclick="toggleEl('id')">▾ 维度2·3·6·8</button>
<div class="collapse-content" id="id">...</div>
<script>
function toggleEl(id) {
  var el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}
</script>
```
- .collapse-content { display: none; }
- .collapse-content.open { display: block; }
- .collapse-btn：等宽 Caption，1.5px 边框，padding 8px 16px，hover 背景 ink 文字纸色

## 重点信息突出规则
| 信息类型 | 突出方式 |
|----------|----------|
| 大标题 | 衬线 + 大尺寸 |
| KPI/评分数字 | 衬线 + 大字号 |
| 新增/已拆精要 | ink 背景 + 纸色文字 pill badge |
| 趋势上升 | font-weight: 600 |
| 趋势下降 | opacity: 0.5 |
| 风险高 | font-weight: 700 |
| 风险中 | opacity: 0.7 |
| 风险低 | opacity: 0.5 |
| 章节钩子 | font-weight: 600 |
| 伏笔 | font-style: italic（唯一允许斜体）|
| 命中标签 | ink 背景 + 纸色文字 |
| 弱标签 | 边框 + opacity: 0.5 |
| 维度编号 | ink 背景 + 纸色文字方块 |
| 技能卡编号 | 超大淡色背景装饰 opacity: 0.08 |

## 每日检查清单
- [ ] 只有 #F0EBDE 和 #1F2BE0 两种颜色（加透明度变体）
- [ ] 没有红色、绿色、橙色等任何其他颜色
- [ ] Google Fonts 三族已加载，有系统 fallback
- [ ] 坐标纸网格背景正确显示
- [ ] 固定导航栏可见，锚点跳转不被遮挡
- [ ] 所有 section 有 id 和对应导航链接
- [ ] 图片使用 loading="lazy"
- [ ] 表格在移动端可横向滚动
- [ ] 折叠按钮可用（原生 JS toggleEl）
- [ ] 输出为单文件 HTML（CSS 全部内联）
- [ ] 组件类名与上述规范完全一致
- [ ] .hook 加粗 / .foreshadow 斜体
- [ ] .pill-badge 用 ink 背景 + 纸色文字
- [ ] .dim-num 用 ink 背景 + 纸色文字方块
- [ ] 已拆书内容不简略，只折叠不删减
- [ ] 隐藏 JSON 在文件末尾

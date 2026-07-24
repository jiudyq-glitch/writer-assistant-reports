# 番茄新书榜首拆解 HTML 格式参考模板

> 来源：2026-07-21 版本（用户确认的最初格式标准）
> 用途：每日输出前对照此模板检查字号、行间距、小标题格式、组件结构
> 规则：文字内容不改，只改格式。此文件为格式基准，不允许偏离。

## CSS 变量（固定）
```css
:root{
  --bg:#ffffff;--card:#ffffff;--ink:#171717;--ink-2:#404040;--muted:#737373;--muted-2:#a1a1a1;
  --line:#e5e5e5;--line-2:#f5f5f5;--soft:#fafafa;
  --accent:#4b3fe3;--accent-soft:#e5eaff;--teal:#15a877;--teal-soft:#e8f7f0;
  --rose:#e8463a;--rose-soft:#fcebe9;--amber:#e27900;--amber-soft:#fdf0e0;
  --radius:12px;--radius-sm:8px;
  --font-sans:"SF Pro Text",-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,"PingFang SC","Microsoft YaHei","Hiragino Sans GB",Roboto,sans-serif;
  --shadow:0 3px 9px 0 rgba(24,24,24,0.06);
}
```

## 字号规范（固定）
| 元素 | 字号 | 颜色 |
|------|------|------|
| body | 14px | --ink-2 |
| h1 | 30px | 默认 |
| h2 | 22px | 默认 |
| h3 | 17px | 默认 |
| .sub | 15px | --muted |
| .editor .lead | 15px | --ink |
| .editor p | 13.5px | --ink-2 |
| .skill .t | 16px | --ink |
| .skill .ex | 12.5px | --muted |
| .bk .hd .nm | 20px | 默认 |
| .bk .hd .mt | 12px | --muted |
| .info-tbl | 13px | 默认 |
| .pt | 12.5px | 默认 |
| .ch-item .ch-h | 13.5px | --ink |
| .ch-item .ch-grid .g | 12px | --muted |
| .iv li | 13px | --ink-2 |
| .concl li | 13.5px | --ink-2 |

## 行间距（固定）
- body line-height: 1.55
- .ch-item .ch-grid .g line-height: 1.6
- .skill .ex line-height: 1.65

## 组件结构规范

### 1. 编者按 (.editor) — 横排卡片 + 灰色折叠
**结构：3张横排卡片（grid 3列），每张含标签+标题+bullet points+折叠more**
```html
<section class="editor" id="编者按">
  <h2>编者按 · 今日拆书要点</h2>
  <div class="editor-cards">
    <div class="ec-card">
      <span class="ec-tag">频道名</span>
      <div class="ec-title">核心发现标题</div>
      <ul>
        <li>要点1（12px，ink-2色）</li>
        <li>要点2</li>
        <li>要点3</li>
      </ul>
      <button class="ec-toggle" onclick="toggleEcMore('ec-more-1')">more</button>
      <div class="ec-more" id="ec-more-1">
        <ul>
          <li>灰色补充信息（11.5px，muted色）</li>
          <li><b>加粗关键字</b></li>
        </ul>
      </div>
    </div>
    <!-- 重复2-3张卡片 -->
  </div>
  <div class="pred">趋势预测...</div>
</section>
```
**CSS（已内嵌在模板CSS中）：**
- `.editor-cards`：grid 3列，gap 12px
- `.ec-card`：soft背景，line边框，radius-sm圆角
- `.ec-tag`：10px，accent色，accent-soft背景
- `.ec-title`：13px，ink色，font-weight 600
- `.ec-more`：默认隐藏，`.open`时显示，11.5px灰色文字
- 移动端：单列堆叠

### 2. 写作精进卡 (.skills)
```html
<div class="skills">
  <div class="skill">
    <div class="n">01</div>  <!-- 大号水印数字，absolute定位 -->
    <span class="cat">分类标签</span>
    <div class="t">技巧名称</div>
    <div class="src">来源：书名</div>
    <div class="ex">描述文字，<b>关键点加粗</b></div>
  </div>
</div>
```

### 3. 逐本拆解 - 已拆过的书（折叠展示）
**关键：小标题格式与新拆书完全一致，都用 .dim + h3 + dim-num**
```html
<div class="bk">
  <div class="hd">
    <div class="nm">书名 <span class="new-badge" style="background:var(--muted);">已拆精要</span></div>
    <div class="mt">#排名 · 作者 · 字数 · 状态 · 在读 · bookId</div>
  </div>
  <!-- 展示区：始终可见的维度 -->
  <div class="dim"><h3><span class="dim-num">1</span>基础信息</h3></div>
  <table class="info-tbl">...</table>
  <div class="dim"><h3><span class="dim-num">4</span>人设与CP</h3></div>
  <div class="chara">...</div>
  <div class="dim"><h3><span class="dim-num">5</span>微创新点</h3></div>
  <ul class="iv">...</ul>
  <div class="dim"><h3><span class="dim-num">7</span>Qiao可借鉴Top3</h3></div>
  <ol class="iv">...</ol>
  <!-- 折叠区 -->
  <button class="collapse-btn" onclick="toggleCollapse('id')">▾ 展开/收起维度2·3·6·8详细拆解</button>
  <div class="collapse-content" id="id">
    <div class="dim"><h3><span class="dim-num">2</span>核心梗与爽点映射</h3></div>
    ...
    <div class="dim"><h3><span class="dim-num">3</span>黄金前十章逐章拆解</h3></div>
    <div class="ch-breakdown">...</div>
    <div class="dim"><h3><span class="dim-num">6</span>开篇评分</h3></div>
    <div class="sc-row">...</div>
    <div class="dim"><h3><span class="dim-num">8</span>推流阶段诊断</h3></div>
    <p>...</p>
  </div>
</div>
```

### 4. 逐本拆解 - 新拆的书（完整展开）
```html
<div class="bk">
  <div class="hd">
    <div class="nm">书名 <span class="new-badge">🆕今日新增拆解</span></div>
    <div class="mt">#排名 · 作者 · 字数 · 状态 · 在读 · bookId</div>
  </div>
  <!-- 全部8维度展开，格式与折叠区内一致 -->
  <div class="dim"><h3><span class="dim-num">1</span>基础信息与字数</h3></div>
  ...
  <div class="dim"><h3><span class="dim-num">8</span>推流阶段诊断</h3></div>
  ...
</div>
```

### 5. 章节拆解 (.ch-breakdown)
```html
<div class="ch-breakdown">
  <div class="ch-item">
    <div class="ch-h">第1章 章节标题</div>
    <div class="ch-grid">
      <div class="g"><b>核心事件：</b>内容</div>
      <div class="g"><b>目标/情绪：</b>内容</div>
      <div class="g"><b>章节钩子：</b><span class="hook">钩子文字</span></div>
      <div class="g"><b>下一阶段伏笔：</b><span class="foreshadow">伏笔文字</span></div>
    </div>
  </div>
</div>
```
注意：.hook 和 .foreshadow 是内联彩色文字，不是徽章样式。

### 6. 人设组件 (.chara)
```html
<div class="chara">
  <div class="surf"><b>外貌：</b>...；<b>性格表相：</b>...</div>
  <div class="core"><span class="ar">↓ 反差内核 ↓</span> 内容</div>
</div>
```

### 7. 评分组件 (.sc-row)
```html
<div class="sc-row">
  <div class="sc"><div class="l">钩子</div><div class="v">5</div></div>
  <div class="sc"><div class="l">代入</div><div class="v">3</div></div>
  <div class="sc"><div class="l">信息</div><div class="v">4</div></div>
  <div class="sc"><div class="l">金手指</div><div class="v">5</div></div>
  <div class="sc" style="background:var(--accent-soft);"><div class="l">综合</div><div class="v" style="color:var(--accent);">4.3</div></div>
</div>
```

### 8. 爽点命中表 (.pts)
```html
<div class="pts">
  <div class="pt"><b>获得爽</b> <span class="h">命中</span> · 说明</div>
  <div class="pt"><b>升级爽</b> <span class="m">弱</span> · 说明</div>
</div>
```
注意：是 grid 布局的卡片，不是 table。

### 9. 风险标签
```html
<span class="risk rh">高</span>  <!-- 红色背景 -->
<span class="risk rm">中</span>  <!-- 橙色背景 -->
<span class="risk rl">低</span>  <!-- 绿色背景 -->
```

### 10. 趋势标签（内联）
```html
<span class="trend-up">+4,388 (+2.2%)</span>
<span class="trend-down">-4,161 (-2.9%)</span>
<span class="trend-flat">→持平</span>
```

## 每日检查清单
- [ ] CSS变量与模板一致
- [ ] 字号：body 14px / h1 30px / h2 22px / h3 17px
- [ ] 行间距：body 1.55
- [ ] 小标题格式：.dim + h3 + .dim-num（已拆书和新拆书统一）
- [ ] .hook / .foreshadow 是内联彩色文字，不是徽章
- [ ] .pts 是 grid 卡片布局，不是 table
- [ ] .chara 用 .surf + .core + .ar 结构
- [ ] .sc-row 综合分有 accent-soft 背景
- [ ] .skill 有 .n 水印数字 + .cat 徽章 + .t + .src + .ex
- [ ] 编者按用横排卡片（.editor-cards > .ec-card），bullet points + 灰色折叠more
- [ ] 折叠按钮和折叠区结构正确
- [ ] 已拆书内容不简略，只折叠不删减
- [ ] 隐藏JSON在文件末尾

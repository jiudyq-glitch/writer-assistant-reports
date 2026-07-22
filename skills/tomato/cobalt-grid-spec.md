# Cobalt Grid — 番茄科幻榜监控日报 排版规范

## 一、设计系统定位

长页面可滚动日报（非幻灯片）。视觉语言源自 WIRED Japan / 建筑趋势报告：暖奶油坐标纸 + 电光钴蓝墨水 + 像素装饰 glitch。气质是理性、数据驱动、带点数字粗野主义的编辑设计。

---

## 二、颜色系统（2色）

| 角色 | 色值 | 用途 |
|------|------|------|
| **纸色** | `#F0EBDE` | 全局底色，暖奶油 |
| **墨色** | `#1F2BE0` | 唯一墨水色，所有文字、边框、hairline、图表线条 |
| **墨色淡** | `rgba(31, 43, 224, 0.18)` | 表格行分隔、细边框 |
| **墨色网格** | `rgba(31, 43, 224, 0.10)` | 坐标纸背景网格线 |

**规则**：零其他颜色。没有红色警告、没有绿色成功。所有信息层级通过字重、字号、透明度、边框粗细区分。

---

## 三、字体系统（3族）

| 用途 | 字体栈 | 字重 | 说明 |
|------|--------|------|------|
| **标题/衬线** | `'Newsreader', 'Noto Serif SC', Georgia, serif` | 400 | 所有大标题、书籍名、KPI数字、章节号。Newsreader 用于英文/数字，Noto Serif SC  fallback 中文 |
| **正文/无衬线** | `'Hanken Grotesk', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif` | 400/500/600 | 正文、标签、卡片内容。Hanken Grotesk 用于英文，Noto Sans SC  fallback 中文 |
| **元数据/等宽** | `'DM Mono', 'SF Mono', 'Menlo', 'Consolas', monospace` | 400/500 | 日期、页码、导航、图表标注、排名数字 |

**加载策略**：Google Fonts 加载 Newsreader + Hanken Grotesk + DM Mono（`display=swap`），系统字体作为 fallback。确保每天日报在无网络环境也能正常显示。

---

## 四、网格与背景

- **坐标纸网格**：`linear-gradient(to right, rgba(31,43,224,0.10) 1px, transparent 1px)` 双向叠加
- **网格尺寸**：`clamp(28px, 2.2vw, 44px)` 正方形单元
- **固定定位**：`position: fixed; inset: 0; pointer-events: none; z-index: 0`
- **内容层**：`position: relative; z-index: 1`

---

## 五、Hairline 系统

- **全局 hairline**：`1.5px solid #1F2BE0`
- **顶部/底部 hairline**：固定导航栏底部、页脚顶部、每个 section-header 顶部
- **表格 hairline**：表头下 `1.5px`，行之间 `1px rgba(31,43,224,0.18)`
- **卡片边框**：`1.5px solid #1F2BE0`

---

## 六、字号层级（响应式）

| 层级 | 尺寸 | 字体族 | 用途 |
|------|------|--------|------|
| H1 主行 | `clamp(48px, min(6vw,10vh), 100px)` | 衬线 weight 400 | Hero 主标题上半行 |
| H1 副行 | 同上 | 衬线 weight 600（**非斜体**） | Hero 主标题下半行，通过 `<em>` 标记但 `font-style: normal; font-weight: 600` |
| H2 | `clamp(32px, min(3.5vw,6vh), 56px)` | 衬线 | Section 标题 |
| H3 | `clamp(22px, min(2.2vw,3.5vh), 32px)` | 衬线 | 子标题 |
| Lede | `clamp(15px, 1.05vw, 18px)` | 无衬线 | 导语段落 |
| Body | `clamp(13px, 0.95vw, 15px)` | 无衬线 | 正文、卡片内容 |
| Caption | `clamp(10px, 0.75vw, 12px)` | 等宽 | 标签、元数据、页码 |
| KPI Value | `clamp(28px, 3vw, 44px)` | 衬线 | KPI 大数字 |

---

## 七、组件规范

### 7.1 固定导航栏
- 高度：自适应 `padding: 12px`
- 背景：`#F0EBDE`（覆盖网格）
- 底部边框：`1.5px solid #1F2BE0`
- 左侧品牌名：等宽 Caption 尺寸，全大写
- 右侧日期：等宽 Caption 尺寸
- 中间导航链接：等宽 Caption，hover 时 opacity 1.0（默认 0.6）

### 7.2 Section Header
- 顶部边框：`1.5px solid #1F2BE0`
- `padding-top: clamp(16px, 2vh, 24px)`
- 左右 flex 布局：左侧 H2，右侧等宽 Caption（section-meta）
- `scroll-margin-top: 80px`（锚点跳转不被导航栏遮挡）

### 7.3 Chapter Tag
- 无衬线 `font-weight: 600`，`letter-spacing: 0.16em`，全大写
- 左侧 40px `1.5px` hairline 装饰
- 用于 Hero 区域和关键 section 前

### 7.4 KPI Grid
- 4 列网格（移动端 2 列）
- 外边框：`1.5px solid #1F2BE0`
- 单元格右边框：`1px solid rgba(31,43,224,0.18)`
- 单元格 padding：`clamp(20px, 2.5vh, 32px) clamp(16px, 2vw, 28px)`
- 标签：等宽 Caption
- 数值：衬线 KPI Value 尺寸
- 副文案：无衬线 Body 尺寸，opacity 0.7

### 7.5 Insight Card
- 边框：`1.5px solid #1F2BE0`
- padding：`clamp(20px, 2.5vh, 32px)`
- 编号：等宽 Caption，opacity 0.5
- 标题：衬线 H3 尺寸
- 正文：无衬线 Body 尺寸，opacity 0.85
- 网格：2 列（移动端 1 列），gap `clamp(16px, 2vw, 24px)`

### 7.6 Cover Card（榜单 Top3）
- 边框：`1.5px solid #1F2BE0`
- 图片区域：`aspect-ratio: 3/4`，`object-fit: cover`
- 排名 badge：绝对定位左上角，等宽 Caption，背景 `#1F2BE0`，文字 `#F0EBDE`
- 信息区：padding `clamp(14px, 1.5vw, 20px)`，顶部边框 `1.5px`
- 书名：衬线 `clamp(15px, 1.2vw, 18px)`
- 作者：等宽 Caption，opacity 0.5
- 统计项：无衬线 Body，label opacity 0.5，value `font-weight: 600`
- 效率值 >4000 时加粗高亮：`font-weight: 700`
- 状态标签：等宽 Caption，背景 `#1F2BE0`，文字 `#F0EBDE`
- 网格：3 列（移动端 2 列→1 列）

### 7.7 Data Table（榜单 4-30 名）
- 外层 `.table-wrap`：`overflow-x: auto`，顶部/底部边框 `1.5px`
- 表头：等宽 Caption，`text-transform: uppercase`，`letter-spacing: 0.06em`，底部 `1.5px` 边框
- 数据行：底部 `1px rgba(31,43,224,0.18)` 边框
- 行 hover：`background: rgba(31, 43, 224, 0.03)`
- 排名列：等宽，居中，36px 宽，opacity 0.5
- 数字列：`font-variant-numeric: tabular-nums`，右对齐
- 新上榜标记：等宽 Caption，背景 `#1F2BE0`，文字 `#F0EBDE`，padding `1px 5px`
- 趋势箭头：上升加粗，下降 opacity 0.5，持平 opacity 0.4

### 7.8 Chart Frame
- 边框：`1.5px solid #1F2BE0`
- padding：`clamp(20px, 2.5vh, 32px)`
- 图片：`width: 100%`
- Caption：等宽 Caption，居中，顶部 margin 16px，opacity 0.5

### 7.9 Callout Box
- 边框：`1.5px solid #1F2BE0`
- padding：`clamp(20px, 2.5vh, 32px)`
- 用于：爆款规律分析、社会心理信号等
- Header：等宽 Caption，opacity 0.6
- 标题：衬线 H3 尺寸
- 正文：无衬线 Body
- 数据标签：等宽 Caption，边框 `1px solid #1F2BE0`，inline-block

### 7.10 Footer
- 顶部边框：`1.5px solid #1F2BE0`
- padding-top：`clamp(20px, 2.5vh, 32px)`
- flex 两端对齐
- 左右均为等宽 Caption，opacity 0.5

---

## 八、长页面特殊规则

1. **非幻灯片**：不使用 `100vh`，每个 section 自然高度，内容决定长度
2. **平滑滚动**：`html { scroll-behavior: smooth; }`
3. **锚点偏移**：所有 section 设置 `scroll-margin-top: 80px`，避免被固定导航栏遮挡
4. **固定导航**：始终可见，快速跳转到任意 section
5. **图片懒加载**：所有封面图、图表使用 `loading="lazy"`
6. **自定义滚动条**：`::-webkit-scrollbar` 宽度 6px，thumb 用 `#1F2BE0`

---

## 九、重点信息突出规则

1. **KPI 大数字**：衬线 `clamp(28px, 3vw, 44px)`，天然突出
2. **新上榜标记**：黑色药丸标签（背景 `#1F2BE0`，文字 `#F0EBDE`），等宽字体
3. **效率值高亮**：`>4000` 时 `font-weight: 700`
4. **趋势变化**：上升用粗体，下降/持平用降低 opacity
5. **Insight 卡片**：独立边框卡片，编号 + 标题 + 正文三层结构
6. **排名 Badge**：Top3 封面左上角绝对定位，反色设计
7. **Section 分隔**：每个 section 顶部 `1.5px` hairline + section-meta 计数器，形成视觉节奏

---

## 十、像素装饰（可选）

- 固定右侧 12vw 宽像素 glitch SVG，opacity 0.15
- 窄屏（<900px）自动隐藏
- 用于增强"数字粗野主义"气质，不干扰内容阅读

---

## 十一、每日复用检查清单

生成日报时确认：
- [ ] 背景网格正确显示（`rgba(31,43,224,0.10)`）
- [ ] 所有文字颜色为 `#1F2BE0` 或其透明度变体
- [ ] 无其他颜色（红/绿/橙等）
- [ ] Google Fonts 已加载，fallback 字体可用
- [ ] 固定导航栏显示正确
- [ ] 所有 section 有 `scroll-margin-top`
- [ ] 封面图使用 `loading="lazy"`
- [ ] 新上榜书籍有黑色药丸标签
- [ ] 效率值 >4000 已加粗
- [ ] 表格在移动端可横向滚动

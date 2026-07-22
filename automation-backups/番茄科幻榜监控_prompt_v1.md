# 番茄科幻榜监控日报 Automation Prompt 备份
> 备份时间：2026-07-22
> Automation ID: T37.WS-UZ7W_NG
> 状态：已被v2版本替换（Cobalt Grid规范）

## 原始Prompt（v1 V6 Quiet Luxury）
执行「番茄科幻榜单监控」日报任务。今天是日报模式（非周五）。
任务流程：
1. 判断今天日期（系统时间），生成 YYYY-MM-DD 日报
2. 抓取4个番茄榜单各30条（共120条）
3. 下载每榜Top3封面图
4. WebFetch读取昨天报告对比daysOnRank
5. WebSearch搜索近7天中国本土社会新闻
6. 数据分析：效率、标签频次、人设CP、具体梗深挖、书名取名技巧
7. 生成日报柱状图（V6配色：海军蓝+琥珀金）
8. 生成MD报告（含隐藏JSON块）
9. 生成HTML报告（report-page技能）
10. 上传GitHub

设计规范：V6 Quiet Luxury（海军蓝#2c3e6b + 琥珀金#9e7b3e）

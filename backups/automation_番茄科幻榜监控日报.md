# Automation Prompt Backup: 番茄科幻榜监控日报
# Schedule ID: T37.WS-UZ7W_NG
# Last Updated: 2026-07-23
# Cron: 0 8 * * * (daily at 08:00 Asia/Shanghai)
# Status: Active

执行「番茄科幻榜单监控」日报任务。今天是日报模式（非周五）。

任务流程：
1. 判断今天日期（系统时间），生成 YYYY-MM-DD 日报
2. 抓取4个番茄榜单各30条（共120条）
3. PUA书名清洗（抓取每本书页面提取正确书名）
4. 下载每榜Top3封面图【封面缓存：先检查GitHub covers/{bookId}.jpg，存在则复用，不存在才从番茄下载并上传缓存】
5. WebFetch读取昨天报告对比daysOnRank + 前天大前天报告做3日趋势
6. WebSearch近7天社会新闻（不设限方向，以与书目共振强度为标准）
7. 数据分析：效率/标签频次/6维度创作向/社会心理信号/书名技巧/爆款规律
8. 生成3张图表（Cobalt Grid配色）
9. 生成MD报告（含隐藏JSON块FANQIE_DATA_START...END）
10. 生成HTML报告（Cobalt Grid配色）
11. 上传GitHub：reports/(MD+HTML) + insights/(3个文件)

【HTML布局规范·2026-07-23更新】
- 封面缩略图：前三名横排紧凑（图片72px×96px+右侧信息，无摘要），3列并排
- 表格折叠：每榜一张表格，默认显示#4-#10，#11-#30折叠，JS toggle按钮展开/收起
- Top10效率分析：爆发力Top3(横排3列) + 毕业预警与书名取名技巧(横排2列)
- 社会心理信号：不设限方向类别，以书目共振强度为唯一标准

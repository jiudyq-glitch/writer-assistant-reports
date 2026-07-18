(function () {
  /* ── Minimalist Copy zinc palette ── */
  const palette = {
    primary: "#18181b",
    secondary: "#52525b",
    muted: "#71717a",
    faint: "#a1a1aa",
    line: "#e4e4e7",
    lineSoft: "#f4f4f5",
    axis: "#a1a1aa",
    axisLabel: "#71717a",
    bg: "#ffffff",
    surface: "#fafafa",
    textPrimary: "#18181b",
    textSecondary: "#404040",
    textMuted: "#71717a",
    textFaint: "#a1a1aa",
    border: "#e4e4e7",
    borderStrong: "#d4d4d8",
    chart1: "#3f3f46",
    chart2: "#71717a",
    chart3: "#a1a1aa",
    chart4: "#d4d4d8",
    chart5: "#fafafa"
  };
  const chartColors = [palette.primary, palette.secondary, palette.muted, palette.chart3, palette.chart4, palette.chart5];

  function readJson(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    try {
      return JSON.parse(el.textContent || "null");
    } catch (error) {
      console.warn("Invalid JSON block", id, error);
      return null;
    }
  }

  function pct(value) {
    return Number(value).toFixed(1) + "%";
  }

  function grid() {
    return { left: 58, right: 48, top: 52, bottom: 58, containLabel: true };
  }

  function marketOption(rows, type) {
    if (type === "bar") {
      return {
        animation: false,
        color: [palette.primary, palette.muted],
        backgroundColor: palette.bg,
        tooltip: {
          trigger: "axis",
          backgroundColor: palette.surface,
          borderColor: palette.border,
          textStyle: { color: palette.textSecondary, fontFamily: "'Geist', sans-serif" }
        },
        legend: { top: 8, textStyle: { color: palette.textMuted, fontFamily: "'Geist', sans-serif" } },
        grid: grid(),
        xAxis: {
          type: "category",
          data: rows.map((row) => row.year),
          axisLine: { lineStyle: { color: palette.border } },
          axisLabel: { color: palette.axisLabel, fontFamily: "'Geist', sans-serif" },
          splitLine: { lineStyle: { color: palette.lineSoft } }
        },
        yAxis: [
          {
            type: "value",
            name: "销量 百万辆",
            nameTextStyle: { color: palette.textMuted },
            splitLine: { lineStyle: { color: palette.lineSoft } },
            axisLabel: { color: palette.axisLabel }
          },
          {
            type: "value",
            name: "渗透率",
            axisLabel: { formatter: (value) => value + "%", color: palette.axisLabel },
            splitLine: { show: false }
          }
        ],
        series: [
          { name: "销量", type: "bar", data: rows.map((row) => row.sales_m) },
          {
            name: "渗透率",
            type: "line",
            yAxisIndex: 1,
            data: rows.map((row) => row.penetration),
            lineStyle: { width: 2 }
          }
        ]
      };
    }

    return {
      animation: false,
      color: [palette.primary, palette.muted],
      backgroundColor: palette.bg,
      tooltip: {
        trigger: "axis",
        backgroundColor: palette.surface,
        borderColor: palette.border,
        textStyle: { color: palette.textSecondary, fontFamily: "'Geist', sans-serif" }
      },
      legend: { top: 8, textStyle: { color: palette.textMuted, fontFamily: "'Geist', sans-serif" } },
      grid: grid(),
      xAxis: {
        type: "category",
        data: rows.map((row) => row.year),
        axisLine: { lineStyle: { color: palette.border } },
        axisLabel: { color: palette.axisLabel, fontFamily: "'Geist', sans-serif" },
        splitLine: { lineStyle: { color: palette.lineSoft } }
      },
      yAxis: [
        {
          type: "value",
          name: "销量 百万辆",
          nameTextStyle: { color: palette.textMuted },
          splitLine: { lineStyle: { color: palette.lineSoft } },
          axisLabel: { color: palette.axisLabel }
        },
        {
          type: "value",
          name: "渗透率",
          axisLabel: { formatter: (value) => value + "%", color: palette.axisLabel },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: "销量",
          type: "line",
          smooth: true,
          data: rows.map((row) => row.sales_m),
          lineStyle: { width: 2 }
        },
        {
          name: "渗透率",
          type: "line",
          yAxisIndex: 1,
          smooth: true,
          data: rows.map((row) => row.penetration),
          lineStyle: { width: 2, type: "dashed" }
        }
      ]
    };
  }

  function shareOption(rows, type) {
    if (type === "pie") {
      return {
        animation: false,
        color: chartColors,
        backgroundColor: palette.bg,
        tooltip: { trigger: "item", valueFormatter: (value) => pct(value), backgroundColor: palette.surface, borderColor: palette.border, textStyle: { color: palette.textSecondary } },
        legend: { bottom: 8, type: "scroll", textStyle: { color: palette.textMuted } },
        series: [
          {
            type: "pie",
            radius: ["42%", "70%"],
            center: ["50%", "42%"],
            data: rows.map((row) => ({ name: row.brand, value: row.share })),
            label: { formatter: (params) => params.name + "\n" + pct(params.value), color: palette.textSecondary },
            itemStyle: { borderColor: palette.bg, borderWidth: 2 }
          }
        ]
      };
    }

    const reversed = rows.slice().reverse();
    return {
      animation: false,
      color: [palette.primary],
      backgroundColor: palette.bg,
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        valueFormatter: (value) => pct(value),
        backgroundColor: palette.surface,
        borderColor: palette.border,
        textStyle: { color: palette.textSecondary, fontFamily: "'Geist', sans-serif" }
      },
      grid: { left: 92, right: 42, top: 28, bottom: 24, containLabel: true },
      xAxis: {
        type: "value",
        axisLabel: { formatter: (value) => value + "%", color: palette.axisLabel },
        splitLine: { lineStyle: { color: palette.lineSoft } }
      },
      yAxis: {
        type: "category",
        data: reversed.map((row) => row.brand),
        axisLabel: { color: palette.axisLabel, fontFamily: "'Geist', sans-serif" },
        axisLine: { lineStyle: { color: palette.border } }
      },
      series: [
        {
          name: "份额",
          type: "bar",
          data: reversed.map((row) => ({
            value: row.share,
            itemStyle: {
              color:
                row.brand === "比亚迪"
                  ? palette.primary
                  : row.brand === "特斯拉中国"
                    ? palette.secondary
                    : palette.muted
            }
          })),
          label: { show: true, position: "right", formatter: (params) => pct(params.value), color: palette.textSecondary },
          itemStyle: { borderRadius: [0, 4, 4, 0] }
        }
      ]
    };
  }

  function setupToc() {
    const nav = document.querySelector(".toc-rail");
    const page = document.querySelector(".doc-page");
    if (!nav || !page) return;

    const targets = Array.from(
      page.querySelectorAll("header[id], section[id]")
    ).filter((block) => block.querySelector("h1, h2"));

    const lines = document.createElement("div");
    const popup = document.createElement("div");
    lines.className = "toc-lines";
    popup.className = "toc-popup";

    targets.forEach((target) => {
      const heading = target.querySelector("h1, h2");
      const label = heading.textContent.trim();
      const line = document.createElement("a");
      const link = document.createElement("a");
      line.className = "toc-line";
      line.href = "#" + target.id;
      line.dataset.target = target.id;
      line.setAttribute("aria-label", label);
      link.href = "#" + target.id;
      link.dataset.target = target.id;
      link.textContent = label;
      lines.appendChild(line);
      popup.appendChild(link);
    });

    nav.replaceChildren(lines, popup);
    const links = Array.from(nav.querySelectorAll("a[data-target]"));
    function setActive(id) {
      links.forEach((link) => link.classList.toggle("active", link.dataset.target === id));
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
          if (visible) setActive(visible.target.id);
        },
        { rootMargin: "-22% 0px -62% 0px", threshold: 0.01 }
      );
      targets.forEach((target) => observer.observe(target));
    } else if (links[0]) {
      links[0].classList.add("active");
    }
  }

  function setupCharts() {
    if (!window.echarts) return;
    const instances = [];
    document.querySelectorAll("[data-chart]").forEach((block) => {
      const canvas = block.querySelector(".chart-canvas");
      const dataId = block.getAttribute("data-data");
      const chartKind = block.getAttribute("data-chart");
      const initialType = block.getAttribute("data-type") || "line";
      const rows = readJson(dataId);
      if (!canvas || !rows) return;

      const chart = echarts.init(canvas, null, { renderer: "canvas" });
      function optionFor(type) {
        if (chartKind === "market-trend") return marketOption(rows, type);
        if (chartKind === "share-ranking") return shareOption(rows, type);
        return {};
      }
      chart.setOption(optionFor(initialType), true);
      instances.push(chart);

      block.querySelectorAll("[data-chart-type]").forEach((button) => {
        button.classList.toggle("active", button.dataset.chartType === initialType);
        button.addEventListener("click", () => {
          block
            .querySelectorAll("[data-chart-type]")
            .forEach((item) => item.classList.toggle("active", item === button));
          chart.setOption(optionFor(button.dataset.chartType), true);
        });
      });
    });

    window.addEventListener("resize", () => {
      instances.forEach((chart) => chart.resize());
    });
  }

  function setupMermaid() {
    if (!window.mermaid || !document.querySelector(".mermaid")) return;
    window.mermaid.initialize({
      startOnLoad: true,
      securityLevel: "loose",
      theme: "base",
      themeVariables: {
        fontFamily: "'Geist', -apple-system, sans-serif",
        primaryColor: "#f4f4f5",
        primaryBorderColor: "#d4d4d8",
        primaryTextColor: "#18181b",
        lineColor: "#e4e4e7",
        textColor: "#404040",
        mainBkg: "#ffffff",
        clusterBkg: "#fafafa",
        clusterBorder: "#e4e4e7",
        nodeBorder: "#e4e4e7",
        edgeLabelBackground: "#ffffff"
      },
      flowchart: {
        htmlLabels: true,
        curve: "basis",
        padding: 14,
        nodeSpacing: 42,
        rankSpacing: 58
      }
    });
  }

  const lucideIcons = {
    maximize2: [
      ["path", { d: "M15 3h6v6" }],
      ["path", { d: "m21 3-7 7" }],
      ["path", { d: "m3 21 7-7" }],
      ["path", { d: "M9 21H3v-6" }]
    ],
    x: [
      ["path", { d: "M18 6 6 18" }],
      ["path", { d: "m6 6 12 12" ]]
    ]
  };

  function lucideIcon(name) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "lucide-icon");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    (lucideIcons[name] || []).forEach(([tag, attrs]) => {
      const child = document.createElementNS("http://www.w3.org/2000/svg", tag);
      Object.entries(attrs).forEach(([key, value]) => child.setAttribute(key, value));
      svg.appendChild(child);
    });
    return svg;
  }

  function setupDiagramZoom() {
    const frames = Array.from(document.querySelectorAll(".mermaid-frame"));
    if (!frames.length) return;

    const lightbox = document.createElement("div");
    const panel = document.createElement("div");
    const close = document.createElement("button");
    const content = document.createElement("div");
    lightbox.className = "diagram-lightbox";
    panel.className = "diagram-lightbox-panel";
    close.className = "diagram-lightbox-close";
    close.type = "button";
    close.title = "Close";
    close.setAttribute("aria-label", "Close enlarged diagram");
    close.appendChild(lucideIcon("x"));
    content.className = "diagram-lightbox-content";
    panel.append(close, content);
    lightbox.appendChild(panel);
    document.body.appendChild(lightbox);

    function closeLightbox() {
      lightbox.classList.remove("open");
      content.replaceChildren();
      document.body.style.overflow = "";
    }

    function openLightbox(frame) {
      const svg = frame.querySelector("svg");
      const mermaidSource = frame.querySelector(".mermaid");
      const clone = svg ? svg.cloneNode(true) : mermaidSource ? mermaidSource.cloneNode(true) : null;
      if (!clone) return;
      content.replaceChildren(clone);
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
      close.focus();
    }

    close.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    });

    frames.forEach((frame) => {
      if (frame.querySelector(".diagram-zoom-trigger")) return;
      const button = document.createElement("button");
      button.className = "diagram-zoom-trigger";
      button.type = "button";
      button.title = "Enlarge";
      button.setAttribute("aria-label", "Enlarge diagram");
      button.appendChild(lucideIcon("maximize2"));
      button.addEventListener("click", () => openLightbox(frame));
      frame.appendChild(button);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupToc();
    setupMermaid();
    setupDiagramZoom();
    setupCharts();
  });
})();

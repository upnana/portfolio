# 0112 Portfolio v2

全新重写的作品集页面（**不是**在旧版上改皮肤）。

## 本地预览

```bash
cd /home/july/rxn/portfolio-v2
python3 -m http.server 8765
# 打开 http://127.0.0.1:8765
```

视频目前引用线上旧站资源：

`https://upnana.github.io/portfolio/media/...`

这样不用先下 100MB+ 视频也能预览。

## 部署到 GitHub Pages（替换旧站）

1. 把旧仓库 `upnana/portfolio` 的 `media/` 拷进本目录（或继续用绝对 URL）。
2. 若改用相对路径，把 HTML 里的  
   `https://upnana.github.io/portfolio/media/` 全局替换为 `media/`。
3. 用本目录的 `index.html` 覆盖旧仓库根目录的 `index.html` 后 push。

## 和旧版的差异

- 满宽真机视频首屏，品牌 0112 做主视觉
- 演示置顶，精选三项「结果先行」
- Evo-RL value overlay 做成对照条
- 其余项目用列表 + 折叠，去掉卡片墙 / 紫蓝渐变 / emoji

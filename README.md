<div align="center">

# Parallel Image References

**「输入主题，回车。一次拿到 6 张可审阅的爆款文案图。」**  
**"Type a topic. Hit enter. Six reviewed social covers come back."**

![License](https://img.shields.io/badge/License-MIT-555?style=for-the-badge)
![Codex Skill](https://img.shields.io/badge/Codex-Skill-111827?style=for-the-badge)
![Subagents](https://img.shields.io/badge/Subagents-Parallel-7c3aed?style=for-the-badge)
![Xiaohongshu](https://img.shields.io/badge/小红书-Compatible-dc2626?style=for-the-badge)
![Douyin](https://img.shields.io/badge/抖音-Compatible-0f172a?style=for-the-badge)

---

在你的 Codex 里打一句话，拿回一组能直接审阅、筛选、发布参考的社媒封面图。

3 到 5 分钟，你能得到 6 张小红书 / 抖音风格候选图：  
痛点钩子、好奇钩子、信任感钩子，每张都有 prompt、评分、适合用途和主要缺点。

不是「AI 随便画一张」那种水平。  
它把内容创作者最耗时间的部分拆开：**试方向、看效果、做筛选。**

你看到的 README 里的示例图，就是这个 skill 自己生成的一组结果。  
不是 Figma，不是 Photoshop，不是设计软件流程。就是一句 prompt + skill 跑通。

```bash
npx github:Alex-3336/parallel-image-references
```

跨 agent 通用。装进 Codex 后，用 `$parallel-image-references` 直接触发。

[看效果](#看效果) · [安装](#安装) · [能做什么](#能做什么) · [示例](#示例) · [核心机制](#核心机制)

---

</div>

## 看效果

![Parallel Image References 效果展示](assets/skill-intro-collage.png)

## 示例候选图

同一个主题，一次生成 6 张不同方向的封面图，再由 Codex 自动审阅和打分。

| A1 痛点钩子 | A2 清单干货 | B1 好奇钩子 |
| --- | --- | --- |
| ![A1 痛点钩子](assets/examples/candidate-a1.png) | ![A2 清单干货](assets/examples/candidate-a2.png) | ![B1 好奇钩子](assets/examples/candidate-b1.png) |

| B2 收藏型 | C1 可信清单 | C2 报告感 |
| --- | --- | --- |
| ![B2 收藏型](assets/examples/candidate-b2.png) | ![C1 可信清单](assets/examples/candidate-c1.png) | ![C2 报告感](assets/examples/candidate-c2.png) |

## 安装

一行安装：

```bash
npx github:Alex-3336/parallel-image-references
```

它会安装到：

```text
~/.codex/skills/parallel-image-references
```

手动安装：

```bash
mkdir -p ~/.codex/skills
git clone https://github.com/Alex-3336/parallel-image-references.git ~/.codex/skills/parallel-image-references
```

更新已有版本：

```bash
cd ~/.codex/skills/parallel-image-references
git pull
```

## 触发方式

在 Codex 里直接说：

```text
Use $parallel-image-references 给我生成 6 张小红书爆款文案封面图，主题是 AI 副业。
```

也可以这样说：

```text
Use $parallel-image-references 给我生成 6 张抖音封面图，主题是普通人如何用 AI 做内容，风格要强痛点、高对比、适合手机上快速扫到。
```

指定标题：

```text
Use $parallel-image-references 给我生成小红书封面图，标题必须是「别再这样用 AI 写文案了」，做 6 个不同方向。
```

## 能做什么

| 能力 | 说明 |
| --- | --- |
| 多图生成 | 默认一次生成 6 张候选图 |
| 自动拆方向 | 痛点钩子、好奇钩子、信任感钩子 |
| 并行执行 | 使用多个 subagent 同时生成不同方向 |
| 自动审阅 | 记录评分、用途、缺点和 prompt |
| 本地保存 | 图片和 `manifest.md` 都保存到本地 |
| 人来选择 | 机器负责试错，人负责判断 |

默认参数：

| 项目 | 默认值 |
| --- | --- |
| 候选图数量 | 6 张 |
| 方向数量 | 3 个 |
| 每个方向 | 2 张 |
| 小红书比例 | 3:4 或 4:5 |
| 抖音封面比例 | 9:16 |
| 单次上限 | 8 张，除非明确要求更多 |

## 适合 / 不适合

适合：

- 小红书封面图
- 抖音短视频封面
- 爆款文案海报
- 知识卡片
- 产品种草图
- 朋友圈 / 社群传播图
- 想一次看多个视觉方向，再人工挑选

不适合：

- 只想生成一张最终图
- 需要稳定还原大量精确文字的排版图
- 网站、App、前端页面实现
- SVG / icon / logo 这类更适合矢量或代码生成的内容
- 把选中图片复刻成代码

## 示例

### 小红书封面

```text
Use $parallel-image-references 给我生成 6 张小红书爆款文案封面图，主题是 AI 副业，风格要像收藏型干货。
```

可能得到：

- 痛点型：普通人做 AI 副业，最容易踩的 3 个坑
- 好奇型：为什么你用 AI 很久，还是赚不到钱
- 信任型：AI 副业冷启动清单

### 抖音封面

```text
Use $parallel-image-references 给我生成 6 张抖音封面图，主题是普通人如何用 AI 做内容，风格要强痛点、高对比、手机上快速扫到。
```

适合输出：

- 大字标题
- 高对比背景
- 单一强焦点
- 9:16 竖版封面

## 核心机制

这个 skill 会按下面的方式工作：

1. 判断平台：小红书、抖音或两者都要
2. 拆分方向：痛点、好奇、信任感
3. 开多个 subagent 并行生成候选图
4. 保存图片到本地目录
5. 为每张图记录 prompt 和审阅结果
6. 给出候选图列表，让你选择保留哪张

输出目录：

```text
image_references/<主题>-<时间>/
├── manifest.md
├── A-pain-point/
│   ├── candidate-A1.png
│   └── candidate-A2.png
├── B-curiosity/
│   ├── candidate-B1.png
│   └── candidate-B2.png
└── C-trust/
    ├── candidate-C1.png
    └── candidate-C2.png
```

`manifest.md` 会记录：

| 字段 | 含义 |
| --- | --- |
| ID | 候选图编号 |
| Direction | 图片方向 |
| File | 本地文件路径 |
| Platform | 平台和比例 |
| Prompt | 生成提示词摘要 |
| Score | 审阅评分 |
| Best Use | 最适合的使用方式 |
| Main Flaw | 主要缺点 |

## 审阅标准

每张图按 1-10 分审阅，主要看：

- 钩子强度：第一眼能不能让人停下来
- 中文可读性：主标题是否够大、够清楚
- 平台感：是否像小红书 / 抖音会出现的图
- 视觉焦点：有没有一个明确主体或信息中心
- 可信度：有没有廉价夸张、假感、过度堆叠
- 差异性：是否真的提供了不同方向

## 目录结构

```text
parallel-image-references/
├── SKILL.md
├── README.md
├── package.json
├── bin/
│   └── install.js
├── agents/
│   └── openai.yaml
└── assets/
    ├── skill-intro-collage.png
    └── examples/
        ├── candidate-a1.png
        ├── candidate-a2.png
        ├── candidate-b1.png
        ├── candidate-b2.png
        ├── candidate-c1.png
        └── candidate-c2.png
```

## License

MIT

# Parallel Image References

一个用于 Codex 的图片生成 Skill。

它专门用来批量生成抖音 / 小红书风格的爆款文案图，并让 Codex 自动审阅每张图，方便你快速选择最适合发布的版本。

## 它能做什么

- 一次生成多张候选图
- 自动拆成不同内容方向，比如痛点钩子、好奇钩子、信任感钩子
- 使用多个 subagent 并行生成图片
- 为每张图记录 prompt、用途、评分和主要缺点
- 生成 `manifest.md`，方便后续查看和筛选
- 只做图片，不生成网站、代码或 UI 实现

默认配置：

- 生成 6 张候选图
- 3 个方向，每个方向 2 张
- 小红书默认使用 3:4 或 4:5
- 抖音封面默认使用 9:16
- 最多不超过 8 张，除非你明确要求更多

## 适合场景

- 小红书封面图
- 抖音短视频封面
- 爆款文案海报
- 知识卡片
- 产品种草图
- 社媒标题图
- 想一次看多个视觉方向，然后人工挑选

## 安装方式

把这个仓库复制到你的 Codex skills 目录：

```bash
mkdir -p ~/.codex/skills
git clone https://github.com/Alex-3336/parallel-image-references.git ~/.codex/skills/parallel-image-references
```

如果已经存在同名目录，可以先删除旧版本：

```bash
rm -rf ~/.codex/skills/parallel-image-references
git clone https://github.com/Alex-3336/parallel-image-references.git ~/.codex/skills/parallel-image-references
```

## 使用方式

在 Codex 里直接调用：

```text
Use $parallel-image-references 给我生成 6 张小红书爆款文案封面图，主题是 AI 副业。
```

也可以指定平台和风格：

```text
Use $parallel-image-references 给我生成 6 张抖音封面图，主题是普通人如何用 AI 做内容，风格要强痛点、高对比、适合手机上快速扫到。
```

指定精确文案：

```text
Use $parallel-image-references 给我生成小红书封面图，标题必须是「别再这样用 AI 写文案了」，做 6 个不同方向。
```

## 输出结果

Skill 会生成类似这样的目录：

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

- 候选图编号
- 方向
- 文件路径
- 使用的 prompt
- 评分
- 适合用途
- 主要缺点

## 注意事项

- 这个 skill 依赖 Codex 的图片生成能力，实际生成图片时会使用 `$imagegen`。
- 图片里的中文可能需要人工检查。如果文字明显错误，应该重新生成对应候选图。
- 这个 skill 只负责图片候选和审阅，不负责把图片复刻成代码。


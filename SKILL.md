---
name: parallel-image-references
description: Generate multiple finished social-media image candidates in parallel with subagents for Douyin, Xiaohongshu, short-video covers, note covers, viral copywriting posters, quote cards, product-seeding images, and scroll-stopping Chinese content images. Use when Codex is asked to create several image options, review them as references, compare viral-potential, or let the user choose from multiple generated images. Pair with the imagegen skill for all raster image generation. This skill is for image outputs only, not code recreation.
---

# Parallel Image References

Use this skill to generate several finished social-media image candidates, then review them so the user can choose the best one.

The output is images only. Do not recreate the selected image as code. Do not turn the task into a website, UI, or product implementation.

## Completion Standard

Before starting, define the done state in one sentence:

```text
Done means <N> usable social-media image candidates are saved under <output folder>, each has a prompt and review note recorded, and the user can choose which image(s) to keep.
```

Verify before replying:

- Candidate images exist in the output folder or are shown inline for preview-only work.
- `manifest.md` lists every candidate, prompt, platform ratio, review score, and main flaw.
- Images are meaningfully different, not tiny variations of one layout.
- The main Chinese copy is readable enough to judge. If text is badly garbled, regenerate or mark the flaw clearly.
- The final response gives image choices, not implementation instructions.

## Defaults

Use these defaults unless the user specifies otherwise:

- `6` total candidates
- `3` directions, `2` images per direction
- Xiaohongshu note cover: `3:4` or `4:5`
- Douyin cover / short-video poster: `9:16`
- Output folder: `image_references/<slug>-<YYYYMMDD-HHMM>/`
- Review scale: `1-10`

Do not generate more than `8` candidates without explicit user approval.

## Workflow

### 1. Clarify Only Blocking Gaps

Proceed without asking when the user gives a topic, audience, or copy direction.

Ask only when one of these would change the whole image set:

- platform: Douyin, Xiaohongshu, or both
- topic or product
- required exact Chinese title/copy
- whether images should be realistic photo, editorial poster, handwritten note, meme-style, or clean graphic

If the user only says "爆款文案图", choose Xiaohongshu cover style by default.

### 2. Define Directions

Create distinct visual/copy directions before spawning workers.

Recommended direction mix:

1. Strong pain-point hook: direct headline, high contrast, fast understanding.
2. Curiosity hook: leaves a knowledge gap, encourages click-through.
3. Trust/report hook: credible, organized, more premium and less loud.

For product or monetization content, use:

1. Before/after outcome.
2. Problem-solution proof.
3. Lifestyle or use-case scene.

### 3. Spawn Parallel Subagents

Spawn subagents when generating multiple candidates. Use one `worker` per direction.

Tell each worker:

- it is not alone in the codebase
- it owns only its assigned output folder
- it must not modify or delete other workers' files
- it must use `$imagegen` for raster image generation
- it must create finished images, not UI code or mock implementation
- it must return exact file paths and prompts

Recommended worker split:

- Worker A: strong pain-point hook
- Worker B: curiosity hook
- Worker C: trust/report hook

### 4. Worker Prompt Template

Use this shape for each worker:

```text
Use $imagegen to generate finished Chinese social-media image candidate(s).

You are not alone in the codebase. Do not modify or delete files outside your assigned output folder.

Task:
- Platform: <Douyin / Xiaohongshu / both>
- Topic/product: <topic>
- Audience: <audience>
- Assigned direction: <direction>
- Required output count: <count>
- Output folder: <absolute path>
- Aspect ratio: <ratio>

Image requirements:
- Finished image only, no code.
- Main copy must be large, readable, and visually dominant.
- Use short Chinese copy suitable for a cover/poster.
- Keep layout high-impact but not messy.
- Avoid fake app UI unless the user asks for it.
- Avoid watermark, QR code, unreadable tiny text, and excessive decorative clutter.

Copy:
- Main headline: <exact headline or worker may create>
- Supporting copy: <optional>
- Text that must appear verbatim: <text or "none">

Return:
- generated file path(s)
- exact prompt(s) used
- short review note for each image
```

## Output Organization

Create this structure:

```text
image_references/<slug>-<timestamp>/
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

Write `manifest.md`:

```markdown
# Social Image References: <task name>

## Candidate Index

| ID | Direction | File | Platform | Prompt | Score | Best Use | Main Flaw |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| A1 | Pain point | `<path>` | Xiaohongshu 3:4 | <prompt summary> | 8 | <why useful> | <flaw> |
```

## Review Criteria

Score each image from `1-10` using:

- Hook strength: can the first line stop scrolling?
- Readability: is the main Chinese copy large and clear?
- Platform fit: does it feel native to Douyin or Xiaohongshu?
- Visual focus: is there one clear subject or message?
- Credibility: does it avoid cheap exaggeration, fake claims, and visual noise?
- Variation value: does it offer a different direction from other candidates?

Call out flaws plainly:

- text is garbled
- headline is too small
- layout is too crowded
- style feels generic
- image is attractive but not clickable
- message is unclear

## Presenting Results

Show a compact chooser:

- candidate ID
- image preview or local path
- score
- best use
- main flaw

Keep the response focused on choosing images. Do not explain internal subagent steps.

## Cleanup

When the user chooses images and asks to delete the rest:

- keep selected image files
- keep `manifest.md`
- delete rejected candidate images and empty direction folders
- update `manifest.md` with `Selected:` and `Deleted:`

Do not delete unrelated generated images, source files, or project assets.

## Quality Rules

- Use short, strong Chinese headlines. Avoid long paragraphs inside the image.
- Make the main copy visually dominant.
- Prefer one strong image idea over many decorations.
- Make candidates meaningfully different in hook, composition, or style.
- If exact Chinese text matters, inspect generated text carefully and regenerate clearly wrong candidates.
- Do not create code, websites, HTML, React, UI shells, or implementation files.
- Do not include marketing analysis unless it helps the user choose between images.

## When Not To Use This Skill

Do not use this skill for:

- one final image with no alternatives
- code recreation from an image
- website or app UI implementation
- SVG/icon/vector editing
- non-social-media image work that does not need review choices

Use `$imagegen` directly for a single final image.

#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");
const skillName = "parallel-image-references";
const targetRoot = path.join(os.homedir(), ".codex", "skills");
const targetDir = path.join(targetRoot, skillName);

const entriesToCopy = ["SKILL.md", "README.md", "agents", "assets"];

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
    return;
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

fs.mkdirSync(targetRoot, { recursive: true });
fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });

for (const entry of entriesToCopy) {
  copyRecursive(path.join(packageRoot, entry), path.join(targetDir, entry));
}

console.log(`Installed ${skillName} to ${targetDir}`);
console.log("Use it in Codex with: Use $parallel-image-references 给我生成 6 张小红书爆款文案封面图，主题是 AI 副业。");

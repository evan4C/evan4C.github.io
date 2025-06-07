const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');

// 日期处理
const today = new Date();
const pad = (n) => n.toString().padStart(2, '0');
const dateStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(
  today.getDate()
)}`;

// 分类选项
const categoriesOptions = {
  1: 'AI',
  2: 'SDE',
  3: 'car',
  4: 'productivity',
  5: 'investment',
  6: 'life',
  7: 'life, introspect',
  8: 'life, principles',
  9: 'life, reading',
  10: 'life, workout',
};

// 命令行接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 提问封装
const ask = (question) => {
  return new Promise((resolve) =>
    rl.question(question, (answer) => resolve(answer.trim()))
  );
};

// 主逻辑
(async () => {
  const title = await ask('请输入标题：');
  if (!title) {
    console.error('❌ 标题不能为空');
    rl.close();
    return;
  }

  console.log('\n请选择分类（输入对应编号，例如：2）：');
  for (const [key, value] of Object.entries(categoriesOptions)) {
    console.log(`${key}. ${value}`);
  }
  const categoryChoice = await ask('\n分类编号：');
  const category = categoriesOptions[categoryChoice] || 'life';

  const tagsInput = await ask('\n请输入 tags（多个用英文逗号分隔，可留空）：');
  const tags = tagsInput
    ? tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '')
    : [];

  const fileName = `${dateStr}-${title}.md`;
  const outputPath = path.join(process.cwd(), '_posts', fileName);

  const content = `---
title: ${title}
date: ${dateStr}
categories: [${category}]
tags: [${tags.join(', ')}]
---

`;

  fs.mkdirSync(path.join(process.cwd(), '_posts'), { recursive: true });
  fs.writeFileSync(outputPath, content);

  console.log(`\n✅ 已创建文件：_posts/${fileName}`);

  exec(`code "${outputPath}"`);
  rl.close();
})();

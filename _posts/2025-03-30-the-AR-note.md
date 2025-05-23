---
title: 追加-回顾笔记法
date: 2025-03-30
categories: [note]
tags: [note, 追加-回顾笔记法]
---

The append-and-review note was written by Andrej Karpathy on 19 Mar, 2025, [original link](https://karpathy.bearblog.dev/the-append-and-review-note/)

我觉得Andrej的想法非常棒，值得去实践一下，但是用apple note的话，在电脑端无法使用vim进行编辑有点麻烦，所以采用private repository的方法重新实现Andrej的想法，同时使用Git进行版本控制说不定可以带来一些意想不到的收获，坚持一段时间看看效果如何。

下面是Andrej文章的中文翻译：

关于一种我偶然发现并沿用多年的高效笔记方法，我想分享几点心得。我将它称为"追加-回顾笔记法"。这种方法在极简易用性与日常记录实用性之间找到了完美平衡。

## 数据结构
我在苹果备忘录应用中仅保留一个名为"notes"的文本笔记。维护多个笔记并分类管理会产生巨大的认知负担。单一笔记意味着使用CTRL+F搜索轻而易举。苹果在跨设备同步、离线编辑和备份方面表现出色。

## 追加机制 Append
每当我想到任何想法、待办事项或其他任何内容时，我都会以文本形式将其追加到笔记的顶部。无论是在电脑上工作时，还是在路上用iPhone时，我都会这样做。我发现给这些笔记添加其他结构化元数据（日期、链接、概念、标签）并不是特别有用，所以我默认不这样做。唯一的例外是我会使用像“watch:”、“listen:”或“read:”这样的标签，这样当我想找深夜看的电影、跑步/散步时听的内容或飞行时读的书时，可以轻松用CTRL+F搜索。

## 回顾机制 Review
随着新内容被添加到顶部，其他内容会逐渐沉到底部，就像受重力影响一样。每隔一段时间，我会向下滚动浏览笔记。如果发现有什么值得继续关注的内容，我就通过简单地复制粘贴把它“打捞”到顶部。有时我会合并、处理、分组或修改看似相关的笔记。我很少删除笔记。那些反复被忽视的内容会持续下沉。它们不会丢失，只是不会占据我的首要注意力。

## 应用场景

- 一个完全随机的想法突然冒出来，但我在路上无法深入思考，就把它加到笔记中，打算稍后再回顾。
- 在派对上有人提到一部我应该看的电影。
- 我在X上刷屏时看到一本书的极佳评论。
- 早上坐下来写一个当天想完成的小待办清单。
- 我只是需要一个地方记录正在思考的内容。
- 我本来想发一条推文，但觉得还需要再想想，就复制粘贴到笔记中，稍后再深入考虑。
- 我发现一句有趣的引言，想时不时被提醒。
- 我希望未来的自己能多思考某件事。
- 我在读一篇论文，想记下一些有趣的数据。
- 我在处理一些随机事情时，需要一个临时地方来CTRL+C和CTRL+V一些内容。
- 常用shell命令备忘（如递归查找Python文件）
- 我在运行神经网络的超参数扫描时，记录下我运行的命令和实验的最终结果。
- 我感到压力很大，因为脑子里的事情太多，担心会忘记，于是坐下来快速把它们列成一个项目清单。
- 在重新整理笔记时，我发现自己其实从不同角度反复思考过同一件事。我再多处理一下，把一些笔记合并成一个，感觉有了新的洞察。
- 记下某件事后，我感觉可以立刻放下，清空我的工作记忆，全神贯注于其他事情。我相信在之后的回顾中能重新审视那个想法，并在有更多时间时处理它。

## 使用体验
我的笔记在过去几年里变得相当庞大。翻阅那些很久以前困扰我的旧事物和旧想法的感觉很好。

有时一些想法经不起反复审查，就沉得更深。有时我会惊讶于自己居然思考某件事这么久。有时，许久以前的一个想法在新的视角下突然变得相关起来。

这种方法确保思维既不被遗忘所困，也不被琐事所累，在流动中自然沉淀真知。当合并相关笔记时，常能获得新的洞见，这种有机生长过程本身就是认知进化的缩影。
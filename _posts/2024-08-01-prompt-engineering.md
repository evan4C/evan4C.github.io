---
title: "Prompt Engineering"
date: 2024-08-01
categories: [AI]
tags: [prompt-engineering, chatGPT]
---

## ChatGPT的原理

基本原理：LLM produces a probability distribution over some vocabulary

GPT的训练目标只是预测下一个最有可能出现的单词是什么，但是不知道怎样回答问题。InstructGPT通过在一系列QA对话上进行对齐训练（RLHF），帮助GPT理解怎样回答问题。

如何设置openAI的API接口

```python
import openai
import os

# Get the value of 'OPENAI_API_KEY' environment variable
openai.api_key  = os.getenv('OPENAI_API_KEY')

# Helper function to get the response from ChatGPT
def get_completion(prompt, model="gpt-3.5-turbo"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0, # degree of randomness of the model's output
    )
    return response.choices[0].message["content"]
```

## Prompting 原则1：指令要清晰且具体

### 技巧1：使用分隔符来清晰划分输入文本的不同部分：

```python
text = f"""
You should express what you want a model to do by \ 
providing instructions that are as clear and \ 
specific as you can possibly make them. \ 
This will guide the model towards the desired output, \ 
and reduce the chances of receiving irrelevant \ 
or incorrect responses. Don't confuse writing a \ 
clear prompt with writing a short prompt. \ 
In many cases, longer prompts provide more clarity \ 
and context for the model, which can lead to \ 
more detailed and relevant outputs.
"""
prompt = f"""
Summarize the text delimited by triple backticks \ 
into a single sentence.
```{text}```
"""
response = get_completion(prompt)
print(response)
```

### 技巧2：对ChatGPT的回答进行结构化

```python
prompt = f"""
Generate a list of three made-up movie titles along \ 
with their authors and genres. 
Provide them in JSON format with the following keys: 
book_id, title, author, genre.
"""
response = get_completion(prompt)
print(response)
```

### 技巧3：让模型先判断文本是否满足特定的条件，再做出相应的回答

```python
text_1 = f"""
Making a cup of tea is easy! First, you need to get some \ 
water boiling. While that's happening, \ 
grab a cup and put a tea bag in it. Once the water is \ 
hot enough, just pour it over the tea bag. \ 
Let it sit for a bit so the tea can steep. After a \ 
few minutes, take out the tea bag. If you \ 
like, you can add some sugar or milk to taste. \ 
And that's it! You've got yourself a delicious \ 
cup of tea to enjoy.
"""
prompt = f"""
You will be provided with text delimited by triple quotes. 
If it contains a sequence of instructions, \ 
re-write those instructions in the following format:

Step 1 - ...
Step 2 - …
…
Step N - …

If the text does not contain a sequence of instructions, \ 
then simply write \"No steps provided.\"

\"\"\"{text_1}\"\"\"
"""
response = get_completion(prompt)
print("Completion for Text 1:")
print(response)
```

### 技巧4："Few-shot"指令：给模型一个成功案例去模仿

```python
prompt = f"""
Your task is to answer in a consistent style.

<child>: Teach me about patience.

<grandparent>: The river that carves the deepest \ 
valley flows from a modest spring; the \ 
grandest symphony originates from a single note; \ 
the most intricate tapestry begins with a solitary thread.

<child>: Teach me about resilience.
"""
response = get_completion(prompt)
print(response)
```

## Prompting 原则2：给模型更多思考的时间

### 技巧1：把复杂的任务分解成一个个具体的小任务，并告诉模型每一步要怎么做。

```python
text = f"""
In a charming village, siblings Jack and Jill set out on \ 
a quest to fetch water from a hilltop \ 
well. As they climbed, singing joyfully, misfortune \ 
struck—Jack tripped on a stone and tumbled \ 
down the hill, with Jill following suit. \ 
Though slightly battered, the pair returned home to \ 
comforting embraces. Despite the mishap, \ 
their adventurous spirits remained undimmed, and they \ 
continued exploring with delight.
"""
prompt = f"""
Your task is to perform the following actions: 
1 - Summarize the following text delimited by 
  <> with 1 sentence.
2 - Translate the summary into French.
3 - List each name in the French summary.
4 - Output a json object that contains the 
  following keys: french_summary, num_names.

Use the following format:
Text: <text to summarize>
Summary: <summary>
Translation: <summary translation>
Names: <list of names in Italian summary>
Output JSON: <json with summary and num_names>

Text: <{text}>
"""
response = get_completion(prompt)
print(response)
```

### 技巧2：指导模型在快速得出结论之前先探索自己的解决方案

```python
prompt = f"""
Your task is to determine if the student's solution \
is correct or not.
To solve the problem do the following:
- First, work out your own solution to the problem. 
- Then compare your solution to the student's solution \ 
and evaluate if the student's solution is correct or not. 
Don't decide if the student's solution is correct until 
you have done the problem yourself.

Use the following format:
Question:
```
question here
```
Student's solution:
```
student's solution here
```
Actual solution:
```
steps to work out the solution and your solution here
```
Is the student's solution the same as actual solution \
just calculated:
```
yes or no
```
Student grade:
```
correct or incorrect
```

Question:
```
I'm building a solar power installation and I need help \
working out the financials. 
- Land costs $100 / square foot
- I can buy solar panels for $250 / square foot
- I negotiated a contract for maintenance that will cost \
me a flat $100k per year, and an additional $10 / square \
foot
What is the total cost for the first year of operations \
as a function of the number of square feet.
``` 
Student's solution:
```
Let x be the size of the installation in square feet.
Costs:
1. Land cost: 100x
2. Solar panel cost: 250x
3. Maintenance cost: 100,000 + 100x
Total cost: 100x + 250x + 100,000 + 100x = 450x + 100,000
```
Actual solution:
"""
response = get_completion(prompt)
print(response)
```

## 写作指南

### 简单代码

格式：Write a [describe the tech stack] app using [any auxiliary tech like a database]. I need it to [describe the most important requirements].

例子：Write a Python/FastAPI app using a PostgreSQL database, hooked up with SQLAlchemy. I need to accept HTML requests and write them to the database

### 复杂代码

例子：You are an expert backend developer. Your task is to write a Python/FastAPI app with a PostgreSQL database. The application should accept HTML requests and write them to the database.Write a detailed tech spec, including user requirements for [your user type goes here]

### 提高问题解决能力

格式：Share a step-by-step systematic approach for solving [specific problem or challenge].

### 改进文本

使用LLM来对自己的文本进行改进，尽量不要使用翻译功能，因为用原语言书写也能提高自己的写作能力。

格式：[Paste Your Writing].
Proofread the above text for spelling and grammar. Make the sentences more clear and native.

### 逆向工程

如果不知道怎样使用Prompt向 ChatGPT 提出问题，只需告诉 ChatGPT 即可。

What's the best prompt for ChatGPT to learn my writing styles and respond to my emails for me?


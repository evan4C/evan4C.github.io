---
title: 一文看懂Agile和Scrum
date: 2024-12-27
categories: [SWE]
tags: [Agile, Scrum, 敏捷开发]
---

> Agile is a philosophy of building software. Scrum is a framework that implements Agile.
{: .prompt-info }

## Agile Values: [敏捷软件开发宣言](https://agilemanifesto.org/)

We are uncovering better ways of developing software by doing it and helping others do it. Through this work we have come to value:
1. Individuals and interactions over ~~processes and tools~~
2. Working software over ~~comprehensive documentation~~
3. Customer collaboration over ~~contract negotiation~~
4. Responding to change over ~~following a plan~~
That is, while there is value in the items on the right, **we value the items on the left more**.

## Agile Principles: 敏捷原则

While the Agile values define our ideal way of working, the Agile principles give us some good guidelines of what behaviors and actions this ideal way of working would have. In other words, if we take any process or practice and cross-reference it with the principles below, we can determine if that particular process or practice is getting us closer to being Agile or taking us in the opposite direction.

1. Our highest priority is to satisfy the customer through early and continuous delivery of valuable software.
2. Welcome changing requirements, even late in development. Agile processes harness change for the customer's competitive advantage.
3. Deliver working software frequently, from a couple of weeks to a couple of months, with a preference to the shorter timescale.
4. Business people and developers must work together daily throughout the project.
5. Build projects around motivated individuals. Give them the environment and support they need, and trust them to get the job done.
6. The most efficient and effective method of conveying information to and within a development team is face-to-face conversation.
7. Working software is the primary measure of progress.
8. Agile processes promote sustainable development. The sponsors, developers, and users should be able to maintain a constant pace indefinitely.
9. Continuous attention to technical excellence and good design enhances agility.
10. Simplicity--the art of maximizing the amount of work not done--is essential.
11. The best architectures, requirements, and designs emerge from self-organizing teams.
12. At regular intervals, the team reflects on how to become more effective, then tunes and adjusts its behavior accordingly.

Recapping, we can identify some major themes that can help us in determining how true to Agile a process or practice is relating to the principles above (noted by P#)

### Customer satisfaction

an Agile way of working puts the customer first (P1 & P2). This means that the outcome of our work should be an increase in customer satisfaction. While the output of (our) work may have elements that don't bring direct value to (our) customers, in Agile, we do our best to minimize this (P10).
- Outcome - Is the value (in our case working software) that we deliver to the customers
- Output - Is the set of actions or items that contribute to achieving the outcome
### Working software 

as we see in P1, P3, and P7, valuable working software is the main outcome of our work. Note that in Agile, working software also has to be technically excellent as described below.

### High-quality software 

Agility is a result of continuous attention to technical excellence of the software being developed, as we can see in P9. Also, it is worth noting that designs and requirements are used   in Agile and not skipped (P9, P11).

### Self-organization 

in Agile we recognize that the people doing the work are the best ones to decide how the work should be done (P5, P11). This does not only mean making them responsible and accountable for their actions but it also means empowering them to make decisions and to value and trust their judgment. Aside from local empowerment (team level), a company should do constant work to liberate itself from paternalistic company policies.

### Inspection & adaptation 

in Agile we understand that people, processes, and products have to constantly adapt to the ever-changing circumstances (P2, P12). An Agile way of working would enable this constant adaptation by having frequent and rich communication and collaboration within a team and across the organization, avoiding handoffs and delayed feedback (P4, P6). For this purpose, we create the time and space to inspect the product and process, reflect on our way of working and decide on how to improve in the future. (P12).

### Motivated people 

modern software development is less a matter of tools or frameworks we use, but a matter of skilled and motivated individuals given the opportunity and the environment to learn and succeed. (P5) Leadership's primary purpose should be to create and foster such an environment and support the team members.

### Sustainable development 

the primary purpose of Agile is not just to work efficiently and deliver more, but to build your teams and organization in a sustainable (organic) way (P8). Agile organizations prioritize long-term prosperity and survival over immediate gains.

## The Pillars of Empiricism

The Scrum Framework, wherever you use it, is built on three pillars that allow empirical process control.
1. Transparency: you gather data (like metrics, feedback, and other experiences) to find out what is going on;
2. Inspection: you inspect the progress with everyone involved and decide what that means for your ambitions;
3. Adaptation: you make changes that you hope will bring you closer to your ambitions;

![The Pillars of Empiricism](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*uJ1JOwtU0XxWkOH8CiYDWQ.png)

This cycle repeats as often as necessary to catch deviations, unexpected discoveries, and potential opportunities that emerge as the work is done. It happens not once a year or when the project is completed, but continuously on a daily, weekly, or monthly basis. Rather than making decisions based on assumptions about potential futures, you're instead making decisions on the data you've collected up to this point. This is empiricism. And in this post, you will discover how everything in the Scrum Framework is designed around these pillars.

## Scrum: A Framework for Empirical Process Control

Scrum is a framework for developing and sustaining complex products.
- Create a usable product, get feedback early, and improve it
- Focus not on development speed, but on reducing risk and waste

It's one thing to say that you need transparency in your work on a product, that you frequently need to inspect that work and that the insights that emerge from this will drive adaptation. It's another to put that into practice in a tangible, concrete way. This is what makes Scrum a framework; it offers five repeating events to work on three artifacts, three roles to support this plus several principles & rules to glue this together into a cohesive whole.

![Scrum: A Framework for Empirical Process Control](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*T_r0Hl6PrAnm7SvFXb2GDw.png)

## Scrum's 3 artifacts

1. The Product Backlog: From the customer's perspective, what is needed for the product; Specific product features, like User Login, etc.
2. The Sprint Backlog: From the developer's perspective, a plan to achieve the Sprint Goal; Technical tasks in this Sprint to realize the product feature: Frontend/Backend development items, etc.
3. The Increment: the collection of all the Product Backlog Items (like new features, bug-fixes, and other adjustments) that a team has completed during a Sprint.

## Scrum's 5 events

1. The Sprint: Explore a particular part of the complex problem of developing a product in a time-boxed event.
2. Sprint Planning: Make a basic plan for the upcoming Sprint.
3. Daily Scrum: Change the Sprint Plan based on the actual situation.
4. Sprint Review: Inspect the work that has been done to date and to decide what next steps make sense based on what was learned from that.
5. Sprint Retrospective: Inspect how the Scrum Team worked together to achieve the Sprint Goal, and what can be improved in the next Sprint.

## Scrum's 3 roles

1. The Product Owner
   - Define the product: Decides the "why" and "what"
   - Responsibility: The team's ROI (Return On Investment)
   - Creation, prioritization, updating of the Product Backlog, and Release Plan
2. The Scrum Master
   - Coach for improvement, Agile, and Scrum values
   - Responsibility: Team efficiency
   - Education, coaching, and facilitation
4. The Development Team
   - Decide and implement the "how"
   - 3 to 9 people, cross-functional (Frontend, Backend, Test, etc.)
   - Ideally, all members are dedicated (Focus on one project, no context switching)
   - Responsibility: Product Quality

## Scrum's 2 driving principles

1. Deliver a Done Increment Every Sprint: Scrum Framework in a single sentence: to work empirically by delivering a Done increment every Sprint.
2. Use a Shared Goal to Create Cohesion During the Sprint: Sprint Goals are the lighthouses that help you reach the harbor through dense fog. Without them, you're likely to get lost or run ashore.

## Scrum's 5 core rules

1. Openness: Be open about how things are going. What is going well? What is not? Where are the challenges and opportunities?
2. Courage: Be courageous to do the right thing. Say No to things that impede the empirical process. Show courage by working on tough challenges together. Ask for, and give feedback about things you are not sure about. Ask questions and admit what you don't know or are uncertain about;
3. Focus: Keep focus on the Sprint Goal and the goals of the Scrum Team. Create a space where people can keep and sustain focus;
4. Respect: respect the skills, expertise, and intelligence of the members of the Scrum Team. Trust their ability to self-organize around complex problems. And respect the uncertainty that is inherent to complex work;
5. Commitment: Create an environment where people can personally commit to working together as a team towards the Sprint Goal;

## FAQs

### Why do we want to be Agile? What is the benefit to developers, and customers?
The picture below should capture the benefits to developers and customers, following Agile. The question of why we want to be Agile should be asked to the team/organization that has gone through this document and decided if it resonates with them or not.

![Agile Benefits](https://miro.medium.com/v2/resize:fit:1400/1*3c2jnSaTxkeeAjLde8j3rw.jpeg)

### How immediately does value need to be delivered?

The 3rd Agile Principle states: Deliver working software frequently, from a couple of weeks to a couple of months, with a preference to the shorter timescale.
The time scale is preferably a small one. However, to choose an appropriate duration for delivering software, maybe the better questions to ask would be: How quickly do we want to get feedback on the software we have built and delivered?

It may very well be that your team is not capable at the moment to build and deliver valuable software within a timeframe that enables you to get feedback as frequently as you would like. In that case, it is okay to do longer iterations, while staying aware of this process impediment and taking actions to improve it, at some point arriving at shorter iterations.

### Why would Scrum be a good choice?

Scrum is like the training wheels on a bike. It is a great framework to get teams started to work in an Agile way. Scrum is a framework, not a process, teams create their own development process, through constant inspection and adaptation. 
With its timeboxed approach, it helps teams to learn how to prioritize their work, in understanding what is working well and what is not with their process, and it encourages them to think of why they are doing these practices and take action to make them better (see double-loop learning image below). 
Using Scrum is the choice of the team.

![double-loop learning](https://agilereflections.dk/wp-content/uploads/2022/03/image.png?w=840)

### Project Manager vs Product Owner

- Project development means producing a specific result within a set period.  
- The project manager's responsibility is to manage the team's daily work.  
- They are also responsible for the output, but often do not bear responsibility for the return on investment (ROI) or value.  

- Product development involves creating, improving, or maintaining a product to align with a certain vision.  
- Developers are self-managing, so they decide who does what and how.  
- The product owner is responsible for outcomes (effects and impact) and ROI/value, rather than just the output.

### Scrum Best Materials

[Scrum: A Framework to Reduce Risk and Deliver Value Sooner](https://medium.com/the-liberators/scrum-a-framework-to-reduce-risk-and-deliver-value-sooner-c49fa80902e7)

[Scrum Guide](https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf)
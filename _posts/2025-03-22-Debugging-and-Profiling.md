---
title: Debugging and Profiling 
date: 2025-03-22
categories: [SWE]
tags: [debug, profile, Linux, MIT]
---

debug是为了找出code中的错误，profile是为了优化code的性能（测量和分析code占用的时间和内存）。

## Debug

### 1. printf debugging and logging

最简单的debug方法就是在code内添加printf语句，在控制台打印出相关的debug信息。其次是使用log，在文件内记录code运行中的debug信息。

在Python中可以通过导入logging库来实现log功能。

如何在terminal中打印出彩色字体？

terminal使用**ANSI escape codes**来控制字体的颜色，例如下面的代码将打印出红色字体

```bash
echo -e "\e[38;2;255;0;0mThis is red\e[0m"
```

- 在UNIX系统中，程序的log通常保存在`/var/log`目录下
- 在UNIX系统中，可以使用`dmesg`命令来访问内核log
- 对于Linux系统，可以使用`journalctl`来显示系统级log，其文件保存在`/var/log/journal`目录下
- 对于Mac系统，可以使用`log show`命令来显示系统级log，其文件保存在`/var/log/system.log/`内

在Shell环境下，使用`logger`命令可以向系统级log中添加log信息。使用`lnav`工具可以改善log的展示方式从而优化阅读体验。

### 2. Debugger

debugger可以添加断点，在程序运行到某一行时中止程序的继续运行，以便查看debug信息。

Python常用的debugger是`pdb`或者其改进版`ipdb`，其支持的常用命令如下：

- l(ist) - Displays 11 lines around the current line or continue the previous listing.
- s(tep) - Execute the current line, stop at the first possible occasion.
- n(ext) - Continue execution until the next line in the current function is reached or it returns.
- b(reak) - Set a breakpoint (depending on the argument provided).
- p(rint) - Evaluate the expression in the current context and print its value. There’s also pp to display using pprint instead.
- r(eturn) - Continue execution until the current function returns.
- q(uit) - Quit the debugger.

对于更加底层的debug，可以使用`gdb`或其改进版`pwndgb`，`lldb`等工具，这些工具可以让你查看有关寄存器、内存、计数器等debug信息。

### 3. Special Tool

即使当你在debug某些black-box的二进制程序，你也可以利用一些特殊工具来辅助你。例如，程序必须要使用system call来执行某些需要内核才能完成的操作，你可以使用`strace`(Linux)或`dtruss`(Mac)对这些system calls进行追踪。

```bash
# On Linux
sudo strace -e lstat ls -l > /dev/null
# On macOS
sudo dtruss -t lstat64_extended ls -l > /dev/null
```

如果需要对网络通信进行debug，则可以使用`tcpdump`、`Wireshark`等工具，也可以利用浏览器自带的审查工具进行debug。

### 4. Static Analysis

除了在发生问题时进行debug之外，你还可以利用一些代码检查工具在问题发生之前对你的代码进行检查。

```bash
# check your python code
pyflakes foobar.py

mypy foobar.py

# check your sh code
shellcheck hello.sh
```

绝大多数编辑器或IDE支持实时代码检查，对于vim，可以使用`ale`、`syntastic`插件。

## Profiling

即使你的代码功能上没有任何问题，但如果它占用过多的内存或运行过慢，它可能也不是一个好的程序。使用profiler和monitor工具，可以帮你发现程序的这些缺点。

### 1. Timing

通常情况下，添加一个计时器可以帮助你快速确认程序的性能，但是简单的计时器结果可能会具有误导性，因为你的电脑可能同时在运行其它进程。因此，为了准确衡量时间，需要首先区分3个时间概念：

1. Real - Wall clock elapsed time from start to finish of the program, including the time taken by other processes and time taken while blocked (e.g. waiting for I/O or network)
2. User - Amount of time spent in the CPU running user code
3. Sys - Amount of time spent in the CPU running kernel code

大多数情况下，当人们提到profiler时，通常指的是 CPU profiler，CPU profiler主要分为两种类型：

- 跟踪profiler（tracing profilers）：记录程序执行过程中每一个函数调用
- 采样profiler（sampling profilers）：周期性地（通常每毫秒一次）对程序进行探测，并记录当时的调用堆栈。

profiler利用这些记录来呈现程序耗时最多的部分的汇总统计信息。

对于Python，可以使用`cProfile`来记录每次函数调用的时间，或者使用`kernprof`来检测每一行代码的运行时间。

```bash
python -m cProfile -s tottime grep.py 1000 '^(import|\s*def)[^,]*$' *.py

kernprof -l -v test.py
```

### 2. Memory

在像 C 或 C++ 这样的语言中，内存泄漏可能会导致程序无法释放那些不再需要的内存。为了进行内存调试，你可以使用像 `Valgrind` 这样的工具帮助你识别内存泄漏。

即使在像 Python 这样的带有垃圾回收机制的语言中，使用内存分析器仍然是有用的，因为只要内存中的对象还有指针引用，它们就不会被垃圾回收。下面是一个使用 memory-profiler 的示例程序及其运行输出。

```python
@profile
def my_func():
    a = [1] * (10 ** 6)
    b = [2] * (2 * 10 ** 7)
    del b
    return a

if __name__ == '__main__':
    my_func()
```

```bash
python -m memory_profiler example.py
Line #    Mem usage  Increment   Line Contents
==============================================
     3                           @profile
     4      5.97 MB    0.00 MB   def my_func():
     5     13.61 MB    7.64 MB       a = [1] * (10 ** 6)
     6    166.20 MB  152.59 MB       b = [2] * (2 * 10 ** 7)
     7     13.61 MB -152.59 MB       del b
     8     13.61 MB    0.00 MB       return a
```

### 3. Event

在进行性能分析时，你可能也希望忽略程序的具体实现细节，将其视为一个黑盒来处理。`perf`命令屏蔽了不同 CPU 之间的差异，它并不报告时间或内存使用情况，而是报告与你的程序相关的**系统事件**。例如，`perf`可以轻松地报告缓存命中率低、高频页面错误（page faults）或活锁（livelocks）等问题。

- `perf list`：列出可以通过 perf 跟踪的事件
- `perf stat COMMAND ARG1 ARG2`：获取与某个进程或命令相关的各种事件计数
- `perf record COMMAND ARG1 ARG2`：记录命令运行过程，并将统计数据保存到名为 perf.data 的文件中
- `perf report`：格式化并输出 perf.data 中收集的数据

### 4. Resource Monitoring

有时候，分析程序性能的第一步就是了解它实际消耗了哪些资源。当程序资源受限时（例如内存不足或网络连接缓慢），运行速度往往会变慢。命令行中有许多工具可以用来探测和展示系统资源的使用情况，比如 CPU 使用率、内存使用情况、网络和磁盘使用情况等。

| 分类           | 工具名称 | 功能描述                                                         | 常用选项 / 特点                                     |
| -------------- | -------- | ---------------------------------------------------------------- | --------------------------------------------------- |
| 通用监控       | htop     | `top` 的增强版，展示系统中运行进程的各种统计信息                 | `<F6>` 排序进程，`t` 显示树状结构，`h` 切换线程显示 |
|                | glances  | 类似 htop，拥有更好的 UI 界面                                    | 全面系统监控工具                                    |
|                | dstat    | 实时显示 I/O、网络、CPU 使用率、上下文切换等多个子系统的资源指标 | 汇总各类资源使用情况                                |
| I/O 操作监控   | iotop    | 实时显示磁盘 I/O 使用情况，检查进程是否进行大量磁盘操作          | 需 root 权限，实时输出                              |
| 磁盘使用情况   | df       | 显示各个分区的磁盘使用情况                                       | `-h` 显示人类可读格式（如 MB、GB）                  |
|                | du       | 显示当前目录下每个文件的磁盘使用                                 | `-h` 显示人类可读格式                               |
|                | ncdu     | `du` 的交互式版本，可浏览和删除目录中文件                        | 快速定位大文件或目录                                |
| 内存使用情况   | free     | 显示系统中总的已用与空闲内存                                     | `-h` 显示人类可读格式                               |
| 文件占用监控   | lsof     | 列出由进程打开的文件信息                                         | 可用于查找哪个进程占用了某个文件                    |
| 网络连接与配置 | ss       | 查看网络连接、端口使用情况、网络接口状态等                       | 常用于查找占用端口的进程，替代已弃用的 `netstat`    |
|                | ip       | 显示路由、网络设备和接口信息                                     | 替代已弃用的 `ifconfig`                             |
| 网络使用监控   | nethogs  | 实时展示每个进程的网络带宽使用情况                               | 按进程分类流量，非常直观                            |
|                | iftop    | 显示网络流量，类似于 top 但用于网络数据                          | 按连接显示流量情况                                  |

### 5. Benchmarking

有时候，你需要执行黑盒基准测试（black box benchmarking）来判断哪个程序性能好，像 **hyperfine** 这样的工具可以让你快速对命令行程序进行基准测试。

例如，在 Shell 工具与脚本的课程中，我们推荐使用 `fd` 来替代 `find`。你可以使用 hyperfine 来比较它们在常见任务中的表现。

```bash
hyperfine --warmup 3 'fd -e jpg' 'find . -iname "*.jpg"'
Benchmark #1: fd -e jpg
  Time (mean ± σ):      51.4 ms ±   2.9 ms    [User: 121.0 ms, System: 160.5 ms]
  Range (min … max):    44.2 ms …  60.1 ms    56 runs

Benchmark #2: find . -iname "*.jpg"
  Time (mean ± σ):      1.126 s ±  0.101 s    [User: 141.1 ms, System: 956.1 ms]
  Range (min … max):    0.975 s …  1.287 s    10 runs

Summary
  'fd -e jpg' ran
   21.89 ± 2.33 times faster than 'find . -iname "*.jpg"'
```

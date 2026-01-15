---
title: 一文看懂PostgreSQL
date: 2026-01-13
categories: [SDE]
tags: [数据库, 一文看懂]
---

自己的 postgresql 学习笔记，记录一些常用的命令和概念。

## PostgreSQL 简介

PostgreSQL 是一个功能强大、开源的关系型数据库管理系统（RDBMS），以其稳定性、扩展性和对 SQL 标准的良好支持而闻名。它支持复杂查询、外键、触发器、视图和事务处理等高级功能。

## 安装 PostgreSQL

在 MacOS 上，推荐使用 postgres.app 进行安装，下载地址：https://postgresapp.com/。

安装完成后，可以通过命令行工具`psql`连接和管理数据库。

## psql 常用命令

psql 是 PostgreSQL 的交互式终端，可以用来执行 SQL 命令和管理数据库。

```bash
# 连接到数据库
psql -U username -d dbname
# 列出所有数据库
\l
# 切换数据库
\c dbname
# 列出所有表
\dt
# 查看表结构
\d tablename
# 退出psql
\q
```

## 基本 SQL 操作

SQL 是用于与数据库交互的标准语言。以下是一些常用的 SQL 操作：

```sql
-- 创建数据库
CREATE DATABASE test;

-- 删除数据库（谨慎使用）
DROP DATABASE test;

-- 创建表
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    email VARCHAR(100),
    date_of_birth DATE 'YYYY-MM-DD' NOT NULL,
    country_of_birth VARCHAR(100) NOT NULL
);

-- 删除表
DROP TABLE person;

-- 插入数据
INSERT INTO person (first_name, last_name, gender, email, date_of_birth, country_of_birth) VALUES ('Alice', 'Smith', 'Female', 'alice@gmail.com', '1990-01-01', 'USA');

-- 查询数据
SELECT * FROM person;

-- 更新数据
UPDATE person SET email = 'alice@example.com' WHERE first_name = 'Alice';

-- 删除数据
DELETE FROM person WHERE first_name = 'Alice';
```

## 批量生成测试数据

可以使用 mockaroo 网站生成测试数据，网址：https://mockaroo.com/。选择需要的字段和数据类型，然后导出为SQL格式，最后在psql中通过下面的命令执行生成的数据表。

```bash
\i /path/to/generated_data.sql
```

## 其他 SQL 命令

```sql
-- ORDER BY 排序查询结果
SELECT * FROM person ORDER BY first_name ASC;
SELECT * FROM person ORDER BY first_name DESC;

-- WHERE 条件查询
SELECT * FROM person WHERE first_name = 'Alice' AND country_of_birth = 'USA';

-- LIKE 模糊查询 + 通配符 %
SELECT * FROM person WHERE first_name LIKE 'A%';

-- LIKE 模糊查询 + 通配符 _
SELECT * FROM person WHERE first_name LIKE 'A_i_e';

-- ILIKE 不区分大小写的模糊查询
SELECT * FROM person WHERE first_name ILIKE 'a%';

-- DISTINCT 去重
SELECT DISTINCT country_of_birth FROM person;

-- LIMIT 限制返回行数
SELECT * FROM person LIMIT 10;

-- OFFSET 跳过指定行数
SELECT * FROM person OFFSET 5 LIMIT 10;

-- IN 查询
SELECT * FROM person WHERE country_of_birth IN ('USA', 'Canada');

-- BETWEEN 查询范围
SELECT * FROM person WHERE date_of_birth BETWEEN '1990-01-01' AND '2000-12-31';

-- GROUP BY 分组
SELECT country_of_birth, COUNT(*) FROM person GROUP BY country_of_birth;

-- HAVING 分组后过滤
SELECT country_of_birth, COUNT(*) FROM person GROUP BY country_of_birth HAVING COUNT(*) > 5;

-- ALIAS 别名
SELECT first_name AS fname, last_name AS lname FROM person;

-- COALESCE 处理 NULL 值
SELECT first_name, COALESCE(email, '<no email>') FROM person;

-- NULLIF 比较两个值，如果相等则返回 NULL，否则返回第一个值
SELECT NULLIF(first_name, 'Alice') FROM person;
SELECT COALESCE(10 / NULLIF(0, 0), 'undefined') AS result;
```

## 聚合函数

```sql
-- COUNT 计数
SELECT COUNT(*) FROM person;

-- SUM 求和
SELECT SUM(salary) FROM employee;

-- AVG 平均值
SELECT AVG(salary) FROM employee;

-- MAX 最大值
SELECT MAX(salary) FROM employee;

-- MIN 最小值
SELECT MIN(salary) FROM employee;
```

## 数学运算和字符串运算

```sql
-- 加法
SELECT 5 + 3;

-- 减法
SELECT 5 - 3;

-- 乘法
SELECT 5 * 3;

-- 除法
SELECT 5 / 3;

-- 取模
SELECT 5 % 3;

-- 幂运算
SELECT 5 ^ 3;

-- 字符串连接
SELECT 'Hello' || ' ' || 'World';
```

## Timestamp 和 Date 操作

```sql
-- 获取当前时间戳
SELECT NOW();
SELECT NOW()::DATE;
SELECT NOW()::TIME;

-- 日期加减
SELECT NOW() + INTERVAL '1 day';
SELECT NOW() - INTERVAL '2 hours';

-- 提取日期部分
SELECT EXTRACT(YEAR FROM NOW());
SELECT EXTRACT(MONTH FROM NOW());
SELECT EXTRACT(DAY FROM NOW());

-- Age 函数计算年龄
SELECT AGE(NOW(), '1990-01-01'::DATE);
```

## Primary Key

```sql
-- 创建表时定义主键
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- 删除主键
ALTER TABLE department DROP CONSTRAINT department_pkey;

-- 添加主键
ALTER TABLE department ADD PRIMARY KEY (id);
```

## Unique 约束

```sql
-- 创建表时定义 unique 约束
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- 添加 unique 约束
ALTER TABLE employee ADD CONSTRAINT employee_email_key UNIQUE (email);

-- 删除 unique 约束
ALTER TABLE employee DROP CONSTRAINT employee_email_key;
```

## Check 约束

```sql
-- 创建表时定义 check 约束
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    price NUMERIC CHECK (price > 0)
);

-- 添加 check 约束
ALTER TABLE product ADD CONSTRAINT product_price_check CHECK (price > 0);

-- 删除 check 约束
ALTER TABLE product DROP CONSTRAINT product_price_check;
```

## 异常处理

```sql
-- ON CONFLICT 处理插入冲突
INSERT INTO person (first_name, last_name) VALUES ('Bob', 'Johnson')
ON CONFLICT (id) DO UPDATE SET last_name = EXCLUDED.last_name;

```

## Foreign Key 和 Join

Foreign Key 用于在两个表之间建立关联关系，一个表的外键引用另一个表的主键。

```sql
-- 创建表时定义外键
CREATE TABLE car (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
);
CREATE TABLE person (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    email VARCHAR(100),
    date_of_birth DATE 'YYYY-MM-DD' NOT NULL,
    country_of_birth VARCHAR(100) NOT NULL,
    car_id BIGINT REFERENCES car(id),
    UNIQUE(car_id)
);

-- 内连接（INNER JOIN），返回两个表中匹配的记录，使用 \x 命令可以更好地显示结果
SELECT * FROM person
INNER JOIN car ON person.car_id = car.id;

-- 左连接（LEFT JOIN），返回左表的所有记录及右表中匹配的记录
SELECT * FROM person
LEFT JOIN car ON person.car_id = car.id;

-- 右连接（RIGHT JOIN），返回右表的所有记录及左表中匹配的记录
SELECT * FROM person
RIGHT JOIN car ON person.car_id = car.id;

-- 全连接（FULL JOIN），返回两个表中的所有记录
SELECT * FROM person
FULL JOIN car ON person.car_id = car.id;
```

## Export and Import csv

```bash
-- 导出查询结果为 CSV 文件
\COPY (SELECT * FROM person) TO '/path/to/output.csv' WITH CSV HEADER;

-- 从 CSV 文件导入数据到表
\COPY person(first_name, last_name, gender, email, date_of_birth, country_of_birth) FROM '/path/to/input.csv' WITH CSV HEADER;
```

## Extensions

PostgreSQL 支持通过扩展（Extensions）来增强数据库的功能。以下是一些常用的扩展：

```sql
-- 查看可用的扩展
SELECT * FROM pg_available_extensions;

-- 安装扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- 用于生成 UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";  -- 提供加密和哈希函数
CREATE EXTENSION IF NOT EXISTS "hstore";    -- 用于存储键值对
CREATE EXTENSION IF NOT EXISTS "postgis";   -- 用于地理空间数据处理
```

## UUID

UUID（Universally Unique Identifier）是一种用于唯一标识信息的标准格式。在 PostgreSQL 中，可以使用 `uuid-ossp` 扩展来生成 UUID.

```sql
-- 生成一个随机的 UUID
SELECT uuid_generate_v4();

-- 创建表时使用 UUID 作为主键
CREATE TABLE person (
    person_uid UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    email VARCHAR(100),
    date_of_birth DATE 'YYYY-MM-DD' NOT NULL,
    country_of_birth VARCHAR(100) NOT NULL
);
```

<!--
 * @Author: jdchen
 * @Date: 2023-08-24 16:25:49
 * @LastEditors: jdchen
 * @LastEditTime: 2023-08-24 16:26:19
 * @Description: 
 * @FilePath: /npm-init/README.md
-->
# 学习搭建cli脚手架

## 安装

### 全局安装
```bash
npm install -g jdchen-cli
```
# or yarn
```bash
yarn global add jdchen-cli
```

### 使用
创建模版
```bash
jdchen-cli create <name> [-t|--template]
```
示例
```bash
jdchen-cli create hello-cli -t dumi2-demo
```

### 不全局安装，借助npx
创建模版
```bash
npx jdchen-cli create <name> [-t|--template]
```
示例
```bash
npx jdchen-cli create hello-cli -template dumi2-demo
```
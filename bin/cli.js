#! /usr/bin/env node
// 该字段是必须的，触发jdchen-cli时告诉操作系统用node环境来执行cli.js文件
const program = require('commander')
const inquirer = require('inquirer');
const package = require('../package.json')
const path = require("path")
const downloadGitRepo = require('download-git-repo')
const ora = require('ora')
const fs = require('fs-extra')

const templates = require('./templates.js') // 动态获取时删除这一行代码
// const { getGitReposList } = require('./api.js') // 新增

// 定义loading
const loading = ora('正在下载模版...')
program.on('--help', () => {}) // 添加--help

// 定义当前版本
program.version(`v${package.version}`)
program
  .command('create [projectName]') // [projectName]是可选 <projectName>是必填
  .option('-t, --template <template>', '模版名称') // 配置项 --template xxx
  .description('创建项目')
  .action(async (projectName, options) => {
    // 添加获取模版列表接口和loading
    // const getRepoLoading = ora('获取模版列表...')
    // getRepoLoading.start()
    // const templates = await getGitReposList('chenijuly')
    // getRepoLoading.succeed('获取模版列表成功!')

    // 1. 从模版列表中找到对应的模版
    let project = templates.find(template => template.name === options.template)

    // 2. 如果匹配到模版就赋值，没有匹配到就是undefined
    let projectTemplate = project ? project.value : undefined
    console.log('命令行参数：', projectName, projectTemplate, options.template) 

    // 3. // 如果用户没有传入名称就交互式输入
    if(!projectName) {
      const { name } = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "请输入项目名称：",
      })
      projectName = name // 赋值输入的项目名称
    }
    console.log("项目名称：", projectName)
    // 4. 如果用户没有传入模版就交互式输入
    if(!projectTemplate) { 
    // 新增选择模版代码
      const { template } = await inquirer.prompt({
        type: 'list',
        name: 'template',
        message: '请选择模版：',
        choices: templates // 模版列表
      })
      projectTemplate = template // 赋值选择的项目名称
    }
    console.log('模版：', projectTemplate)

    // 获取目标文件夹路径
    const dest = path.join(process.cwd(), projectName)
    // 判断文件夹是否存在，存在就交互询问用户是否覆盖
    if(fs.existsSync(dest)) {
      const { force } = await inquirer.prompt({
        type: 'confirm',
        name: 'force',
        message: '目录已存在，是否覆盖？',
      })
      // 如果覆盖就删除文件夹继续往下执行，否的话就退出进程
      force ? fs.removeSync(dest) : process.exit(1)
    }
    // 5. 开始下载模版
    // 开始loading
    loading.start()
    downloadGitRepo(projectTemplate, dest, (err) => {
      if (err) {
        loading.fail('创建模版失败：' + err.message) // 失败loading
      } else {
        loading.succeed('创建模版成功!') // 成功loading
        // 添加引导信息(每个模版可能都不一样，要按照模版具体情况来)
        console.log(`\ncd ${projectName}`)
        console.log('npm i')
        console.log('npm start\n')
      }
    })





  });

// 解析用户执行命令传入参数
program.parse(process.argv)

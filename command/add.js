'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')
const table = require('../util/table');
const tip = require('../util/tip');


const writeFile = (err) => {
  // 处理错误
  if (err) {
    console.log(err);
    tip.fail('请重新运行!');
    process.exit();
  }

  table(config);
  tip.suc('新模板添加成功!');
  process.exit();
};

module.exports = () => {
  co(function* () {

    // 分步接收用户输入的参数
    let tplName = yield prompt('Template name: ')
    let gitUrl = yield prompt('Git https link: ')
    let branch = yield prompt('Branch: ')
    let description = yield prompt('description: ')
    // 避免重复添加
    if (!config[tplName]) {
      config[tplName] = {}
      config[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '') // 过滤unicode字符
      config[tplName]['branch'] = branch
      config[tplName]['description'] = description
    } else {
      console.log(chalk.red('Template has already existed!'))
      process.exit()
    }

    // 把模板信息写入templates.json
    fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', writeFile)
  })
}
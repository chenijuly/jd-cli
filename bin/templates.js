/*
 * @Author: jdchen
 * @Date: 2023-08-25 13:22:17
 * @LastEditors: jdchen
 * @LastEditTime: 2023-08-25 14:33:29
 * @Description: 
 * @FilePath: /npm-init/bin/templates.js
 */
/** 暴露模版代码 */
// 注意模版地址部分，域名github.com和模版地址之间是用冒号:隔开的，不是斜杠/，这个是下一节下载git仓库代码模版所用到的库download-git-repo的规则。
// github:${git用户名}/${仓库名}
module.exports = [
  {
    name: 'mobile-h5-demo',
    value: 'https://github.com:chenijuly/mobile-h5'
  },
  {
    name: 'antd-pro-demo',
    value: 'gitlab:jdchen/gitlab.ichint.com/common/pc-antd-pro.git'
  },
  {
    name: 'uniapp-demo',
    value: 'gitlab:jdchen/gitlab.ichint.com/templates/uniapp-project.git'
  }
]
/*
 * @Author: jdchen
 * @Date: 2023-08-25 14:58:31
 * @LastEditors: jdchen
 * @LastEditTime: 2023-08-25 14:58:49
 * @Description: 
 * @FilePath: /npm-init/bin/api.js
 */
// bin/api.js
const https = require('https')

/** 获取用户git仓库列表信息 */
function getGitReposList(username) {
  return new Promise((resolve, reject) => {
    https.request(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'User-Agent': username
      }
    }, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk.toString()
      })
      res.on('end', () => {
        const list = JSON.parse(data)
        resolve(list.map(item => ({ // 组合成模版所需要的name，value结构
          name: item.name,
          value: `https://github.com:${username}/${item.name}`
        })))
      })
      res.on('error', (err) => {
        reject(err)
      })
    }).end()
  })
}

module.exports = {
  getGitReposList
}
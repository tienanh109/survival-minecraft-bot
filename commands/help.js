const fs = require('fs')
const path = require('path')
const config = require('../config')

module.exports = (bot, username, args) => {
  const commandDir = path.join(__dirname)

  const commands = fs.readdirSync(commandDir)
    .filter(file => file.endsWith('.js') && file !== 'help.js')
    .map(file => file.slice(0, -3)) // bỏ ".js"

  const prefix = config.prefix || '!'
  const list = commands.join(', ')
  bot.chat(`📖 Tất cả lệnh có sẵn (Prefix: ${prefix}): ${list}`)
}
// made by tienanh109
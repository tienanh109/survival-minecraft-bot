const fs = require('fs')
const path = require('path')

module.exports = function loadCommands(bot) {
  bot.commands = {}
  const commandDir = path.join(__dirname, 'commands')

  fs.readdirSync(commandDir).forEach(file => {
    if (file.endsWith('.js')) {
      const name = file.slice(0, -3)
      bot.commands[name] = require(path.join(commandDir, file))
      console.log(`[+] Đã tải lệnh: ${name}`)
    }
  })
}

// bot.js - Tự động khởi chạy bởi webserver
// Made by tienanh109

const mineflayer = require('mineflayer')
const config = require('./config')
const loadCommands = require('./commandLoader')
const loadPlugins = require('./pluginLoader')

const bot = mineflayer.createBot({
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  auth: config.auth,
  version: config.version
})

bot.once('spawn', () => {
  console.log(`✅ Bot ${config.username} đã vào thế giới.`)
  loadPlugins(bot)
  loadCommands(bot)
})

bot.on('chat', (username, message) => {
  if (username === bot.username || !message.startsWith(config.prefix)) return

  // Kiểm tra whitelist
  if (Array.isArray(config.whitelist) && config.whitelist.length > 0) {
    if (!config.whitelist.includes(username)) {
      bot.chat(`🚫 Xin lỗi ${username}, bạn không được phép điều khiển tôi.`)
      return
    }
  }

  const args = message.slice(config.prefix.length).split(' ')
  const commandName = args.shift().toLowerCase()
  const command = bot.commands?.[commandName]

  if (command) {
    try {
      command(bot, username, args)
    } catch (err) {
      if (config.autoRespondOnError) bot.chat('⚠️ Có lỗi khi xử lý lệnh.')
      if (!config.hideErrors) console.error(`[!] Lỗi trong lệnh "${commandName}":`, err)
    }
  } else {
    bot.chat(`Không có lệnh "${commandName}"`)
  }
})

bot.on('error', err => console.log('[❌] Lỗi bot:', err))
bot.on('end', () => console.log('[🔌] Bot ngắt kết nối.'))

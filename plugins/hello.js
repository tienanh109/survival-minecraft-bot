const config = require('../config')

module.exports = (bot) => {
  const prefix = config.prefix || '!'
  bot.chat(`Bot đã sẵn sàng! Bắt đầu khám phá lệnh với ${prefix}help`)
}

// Made by tienanh109
// commands/wake.js
module.exports = (bot, username, args) => {
  if (!bot.isSleeping) {
    bot.chat('Tôi không ngủ mà!')
    return
  }

  try {
    bot.wake()
    bot.chat(`${username} đã đánh thức tôi! Chào buổi sáng!`)
    console.log(`${username} đã đánh thức bot`)
  } catch (err) {
    console.error('Lỗi:', err)
    bot.chat(`Không thể thức dậy: ${err.message}`)
  }
}

// Made by tienanh109
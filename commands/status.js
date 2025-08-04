module.exports = (bot, username, args) => {
  const status = []

  if (bot.following) {
    status.push(`🤖 Đang theo dõi: ${bot.following}`)
  }

  if (bot.gotoTarget) {
    const { x, y, z } = bot.gotoTarget
    status.push(`📍 Đang đi tới: (${x}, ${y}, ${z})`)
  }

  if (!status.length) {
    status.push(`✅ Hiện tại bot đang rảnh.`)
  }

  bot.chat(status.join(' | '))
}
// Made by tienanh109
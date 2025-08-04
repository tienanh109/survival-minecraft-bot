module.exports = async (bot, username, args) => {
  const items = bot.inventory.items()
  if (items.length === 0) return bot.chat(`📭 Túi đang trống.`)

  bot.chat(`🗑️ Đang vứt toàn bộ đồ...`)

  for (const item of items) {
    try {
      await bot.toss(item.type, null, item.count)
    } catch (err) {
      bot.chat(`⚠️ Lỗi khi vứt đồ: ${item.name}`)
      console.error(err)
    }
  }

  bot.chat(`✅ Đã vứt hết.`)
}
// Made by tienanh109
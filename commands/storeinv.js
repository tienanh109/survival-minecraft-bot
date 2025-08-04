let storing = false

module.exports = (bot, username, args) => {
  if (!storing) {
    bot.chat(`🎒 Ném đồ cho tôi đi, tôi sẽ giữ.`)
    storing = true

    bot.on('playerCollect', onCollect)
  } else {
    bot.chat(`✅ Đã cất đồ. Không nhận nữa.`)
    storing = false

    bot.removeListener('playerCollect', onCollect)
  }

  function onCollect(collector, collected) {
    if (collector.username !== bot.username) return

    const item = collected.metadata?.[8]?.value?.name || 'vật phẩm'
    bot.chat(`📥 Nhận được: ${item}`)
  }
}
// Made by tienanh109
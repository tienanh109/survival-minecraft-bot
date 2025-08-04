module.exports = (bot) => {
  bot.on('entityHurt', (entity) => {
    if (entity.username === bot.username) {
      const attacker = bot.nearestEntity(e =>
        e.type === 'player' && e !== bot.entity
      )
      if (attacker) {
        bot.chat(`Đau đấy anh bạn!`)
      }
    }
  })
}
// Made by tienanh109
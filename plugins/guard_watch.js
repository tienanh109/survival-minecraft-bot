module.exports = (bot) => {
  const hostileMobs = ['zombie', 'skeleton', 'creeper', 'spider']

  bot.on('physicsTick', () => {
    if (!bot.guardPos) return

    const enemy = bot.nearestEntity(e =>
      e.type === 'mob' &&
      hostileMobs.includes(e.name) &&
      bot.entity.position.distanceTo(e.position) < 16
    )

    if (enemy && bot.pvp.target !== enemy) {
      bot.chat(`⚔️ Phát hiện ${enemy.name}, tấn công!`)
      bot.pvp.attack(enemy)
    }
  })

  bot.on('death', () => {
    bot.chat('💀 Tôi đã hi sinh khi canh gác.')
    bot.guardPos = null
  })
}
// Made by tienanh109
const { GoalNear } = require('mineflayer-pathfinder').goals

module.exports = function autoSleepWithPlayers(bot) {
  const sleepingPlayers = new Set()
  let lastSleepAttempt = 0

  bot.on('entityMoved', async (entity) => {
    if (entity.type !== 'player' || entity === bot.entity) return

    const username = entity.username
    const now = Date.now()

    // Nếu đã xử lý gần đây (spam), bỏ qua
    if (sleepingPlayers.has(username) || now - lastSleepAttempt < 5000) return

    const below = bot.blockAt(entity.position.offset(0, -1, 0))
    if (!below || !below.name.includes('bed')) return

    sleepingPlayers.add(username)
    lastSleepAttempt = now

    if (bot.isSleeping) return

    bot.chat(`🛏️ Thấy ${username} đang ngủ, tôi cũng sẽ ngủ.`)

    const bed = bot.findBlock({
      matching: block => block.name.includes('bed'),
      maxDistance: 32
    })

    if (!bed) {
      bot.chat('❌ Không tìm thấy giường để ngủ.')
      return
    }

    try {
      if (!bot.pathfinder) {
        bot.loadPlugin(require('mineflayer-pathfinder').pathfinder)
      }

      await bot.pathfinder.goto(new GoalNear(bed.position.x, bed.position.y, bed.position.z, 1))
      await bot.sleep(bed)
      bot.chat('💤 Tôi đã ngủ.')
    } catch (err) {
      bot.chat(`⚠️ Không thể ngủ: ${err.message}`)
    }
  })

  bot.on('wake', () => {
    bot.chat('🌅 Tôi đã thức dậy rồi.')
    sleepingPlayers.clear()
  })
}
// Made by tienanh109
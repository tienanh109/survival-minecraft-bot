// pvpbot.js
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const { GoalFollow } = goals
const mineflayerPvp = require('mineflayer-pvp').plugin

let targetPlayer = null

module.exports = (bot, username, args) => {
  if (!bot.pvp) bot.loadPlugin(mineflayerPvp)
  if (!bot.pathfinder) bot.loadPlugin(pathfinder)

  const targetName = args[0]
  if (!targetName) return bot.chat('❗ Dùng: !pvpbot <tên người chơi>')

  // Nếu đang đánh và lặp lại lệnh -> hủy
  if (targetPlayer && targetPlayer.username === targetName) {
    bot.pvp.stop()
    bot.pathfinder.setGoal(null)
    bot.chat(`🛑 Đã dừng PvP với ${targetPlayer.username}.`)
    targetPlayer = null
    return
  }

  const player = bot.players[targetName]?.entity
  if (!player) return bot.chat(`❌ Không tìm thấy người chơi "${targetName}".`)

  const mcData = require('minecraft-data')(bot.version)
  const defaultMove = new Movements(bot, mcData)
  bot.pathfinder.setMovements(defaultMove)

  bot.chat(`⚔️ Đang tấn công ${targetName}...`)
  targetPlayer = player

  bot.pvp.attack(player)

  const follow = () => {
    if (!targetPlayer || !targetPlayer.isValid) {
      bot.chat(`❌ Mục tiêu không còn tồn tại.`)
      bot.pvp.stop()
      bot.pathfinder.setGoal(null)
      targetPlayer = null
      return
    }
    bot.pathfinder.setGoal(new GoalFollow(targetPlayer, 1), true)
  }

  follow()

  // Cập nhật liên tục nếu player di chuyển
  const interval = setInterval(() => {
    if (!targetPlayer || !targetPlayer.isValid) {
      clearInterval(interval)
      return
    }
    follow()
  }, 1000)

  bot.once('death', () => {
    bot.chat('💀 Tôi đã chết, dừng PvP.')
    bot.pvp.stop()
    bot.pathfinder.setGoal(null)
    targetPlayer = null
    clearInterval(interval)
  })
}

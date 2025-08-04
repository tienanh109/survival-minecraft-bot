// pvpbot.js
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const { GoalFollow } = goals
const mineflayerPvp = require('mineflayer-pvp').plugin
const armorManager = require('mineflayer-armor-manager')

let targetPlayer = null
let stopInterval = null

module.exports = (bot, username, args) => {
  if (!bot.pvp) bot.loadPlugin(mineflayerPvp)
  if (!bot.pathfinder) bot.loadPlugin(pathfinder)
  if (!bot.armorManager) bot.loadPlugin(armorManager)

  const targetName = args[0]
  if (!targetName) return bot.chat('❗ Dùng: !pvpbot <tên người chơi>')

  if (targetPlayer && targetPlayer.username === targetName) {
    bot.pvp.stop()
    bot.pathfinder.setGoal(null)
    bot.chat(`🛑 Đã dừng PvP với ${targetPlayer.username}.`)
    targetPlayer = null
    clearInterval(stopInterval)
    return
  }

  const playerEntity = bot.players[targetName]?.entity
  if (!playerEntity) return bot.chat(`❌ Không tìm thấy người chơi "${targetName}".`)

  const mcData = require('minecraft-data')(bot.version)
  const defaultMove = new Movements(bot, mcData)
  bot.pathfinder.setMovements(defaultMove)

  bot.chat(`⚔️ Đang tấn công ${targetName}...`)
  targetPlayer = playerEntity

  const sword = bot.inventory.items().find(item => item.name.includes('sword'))
  if (sword) bot.equip(sword, 'hand')
  const shield = bot.inventory.items().find(item => item.name.includes('shield'))
  if (shield) bot.equip(shield, 'off-hand')

  bot.pvp.attack(playerEntity)

  const follow = () => {
    if (!targetPlayer || !targetPlayer.isValid) {
      bot.chat(`❌ Mục tiêu đã rời khỏi thế giới hoặc chết.`)
      stopCombat()
      return
    }
    bot.pathfinder.setGoal(new GoalFollow(targetPlayer, 1), true)
  }

  follow()

  stopInterval = setInterval(() => {
    if (!targetPlayer || !targetPlayer.isValid) {
      stopCombat()
      return
    }

    const hp = targetPlayer.health
    if (typeof hp === 'number' && hp <= 0) {
      bot.chat(`☠️ ${targetName} đã chết. Dừng PvP.`)
      stopCombat()
    } else {
      follow()
    }
  }, 1000)

  bot.once('death', () => {
    bot.chat('💀 Tôi đã chết, dừng PvP.')
    stopCombat()
  })

  function stopCombat() {
    bot.pvp.stop()
    bot.pathfinder.setGoal(null)
    targetPlayer = null
    clearInterval(stopInterval)
  }
}

// made by tienanh109
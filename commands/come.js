const { GoalNear } = require('mineflayer-pathfinder').goals

module.exports = (bot, username, args) => {
  if (!bot.pathfinder) bot.loadPlugin(require('mineflayer-pathfinder').pathfinder)

  const target = bot.players[username]?.entity
  if (!target) {
    return bot.chat('❌ Không tìm thấy bạn quanh đây.')
  }

  const pos = target.position
  const goal = new GoalNear(pos.x, pos.y, pos.z, 1)

  bot.following = null
  bot.gotoTarget = { x: pos.x, y: pos.y, z: pos.z }

  bot.pathfinder.setGoal(goal)
  bot.chat(`🏃 Đang đến gần ${username}...`)
}

// Made by tienanh109
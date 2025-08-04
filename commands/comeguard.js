const { GoalNear, GoalBlock } = require('mineflayer-pathfinder').goals

module.exports = (bot, username, args) => {
  if (!bot.pathfinder) bot.loadPlugin(require('mineflayer-pathfinder').pathfinder)
  if (!bot.pvp) bot.loadPlugin(require('mineflayer-pvp').plugin)

  const target = bot.players[username]?.entity
  if (!target) return bot.chat('❌ Không thấy bạn gần đây.')

  const pos = target.position
  const goal = new GoalNear(pos.x, pos.y, pos.z, 1)

  bot.following = null
  bot.gotoTarget = { x: pos.x, y: pos.y, z: pos.z }

  bot.pathfinder.setGoal(goal)

  bot.once('goal_reached', () => {
    bot.guardPos = pos
    bot.pathfinder.setGoal(new GoalBlock(pos.x, pos.y, pos.z)) // đứng tại đó
    bot.chat(`🛡️ Đã đến gần ${username}, bắt đầu canh gác.`)
  })
}
// Made by tienanh109
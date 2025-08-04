const { GoalBlock } = require('mineflayer-pathfinder').goals

module.exports = (bot, username, args) => {
  if (!bot.pathfinder) bot.loadPlugin(require('mineflayer-pathfinder').pathfinder)
  if (!bot.pvp) bot.loadPlugin(require('mineflayer-pvp').plugin)

  const player = bot.players[username]?.entity
  if (!player) return bot.chat('❌ Không thấy bạn gần đây.')

  const pos = player.position

  bot.guardPos = pos
  bot.following = null
  bot.gotoTarget = null

  bot.pathfinder.setGoal(new GoalBlock(pos.x, pos.y, pos.z))
  bot.chat(`🛡️ Canh gác tại vị trí hiện tại của ${username}.`)
}
// Made by tienanh109
const { GoalBlock } = require('mineflayer-pathfinder').goals

module.exports = (bot, username, args) => {
  const { pathfinder } = bot
  if (!pathfinder) bot.loadPlugin(require('mineflayer-pathfinder').pathfinder)

  if (args.length !== 3) {
    return bot.chat('❗ Dùng: !goto <x> <y> <z>')
  }

  const [x, y, z] = args.map(Number)
  if ([x, y, z].some(isNaN)) {
    return bot.chat('⚠️ Tọa độ không hợp lệ.')
  }

  bot.gotoTarget = { x, y, z } // lưu lại để `!status` dùng
  bot.following = null         // huỷ follow nếu có

  const goal = new GoalBlock(x, y, z)
  pathfinder.setGoal(goal)

  bot.chat(`🧭 Đang đi đến: (${x}, ${y}, ${z})`)
}
// Made by tienanh109
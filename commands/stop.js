module.exports = (bot, username, args) => {
  if (bot.pathfinder && bot.pathfinder.isMoving()) {
    bot.pathfinder.setGoal(null)
  }

  bot.following = null
  bot.gotoTarget = null
  bot.guardPos = null

  bot.chat(`⛔ Đã dừng toàn bộ hoạt động.`)
}
// Made by tienanh109
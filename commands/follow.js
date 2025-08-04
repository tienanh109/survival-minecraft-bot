const { GoalFollow } = require('mineflayer-pathfinder').goals

module.exports = (bot, username, args) => {
  if (!bot.pathfinder) bot.loadPlugin(require('mineflayer-pathfinder').pathfinder)

  const target = bot.players[username]?.entity
  if (!target) return bot.chat("❌ Không thấy bạn gần mình.")

  if (bot.following === username) {
    bot.following = null
    bot.pathfinder.setGoal(null)
    bot.chat(`🚫 Ngừng theo dõi ${username}.`)
  } else {
    bot.gotoTarget = null
    bot.following = username
    const goal = new GoalFollow(target, 1)
    bot.pathfinder.setGoal(goal, true)
    bot.chat(`✅ Đang theo dõi ${username}.`)
  }
}

// Made by tienanh109
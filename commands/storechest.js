const { GoalNear } = require('mineflayer-pathfinder').goals

module.exports = async (bot, username, args) => {
  const mcData = require('minecraft-data')(bot.version)
  if (!bot.pathfinder) bot.loadPlugin(require('mineflayer-pathfinder').pathfinder)

  // Tìm khối rương gần nhất
  const chestBlock = bot.findBlock({
    matching: mcData.blocksByName.chest.id,
    maxDistance: 10
  })

  if (!chestBlock) {
    return bot.chat('❌ Không tìm thấy rương gần đây.')
  }

  // Đi tới rương
  const goal = new GoalNear(chestBlock.position.x, chestBlock.position.y, chestBlock.position.z, 1)
  bot.pathfinder.setGoal(goal)

  bot.once('goal_reached', async () => {
    bot.chat('📦 Đã tới rương, đang mở...')

    try {
      const chest = await bot.openChest(chestBlock)
      const items = bot.inventory.items()

      if (items.length === 0) {
        bot.chat('📭 Không có gì để cất.')
        chest.close()
        return
      }

      for (const item of items) {
        await chest.deposit(item.type, null, item.count)
        bot.chat(`✅ Cất: ${item.count} x ${item.name}`)
      }

      chest.close()
      bot.chat('🎉 Đã cất xong toàn bộ vào rương.')
    } catch (err) {
      bot.chat('⚠️ Lỗi khi cất đồ vào rương.')
      console.error(err)
    }
  })
}
// made by tienanh109
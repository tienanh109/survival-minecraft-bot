const { GoalNear } = require('mineflayer-pathfinder').goals
const { Vec3 } = require('vec3')

module.exports = async (bot, username, args) => {
  const count = parseInt(args[0])
  if (isNaN(count) || count <= 0) return bot.chat('❗ Dùng: !getwood <số lượng>')

  const mcData = require('minecraft-data')(bot.version)

  // Trong 1.9: log (id 17) & log2 (id 162)
  const validLogs = [
    { id: mcData.blocksByName.log.id, meta: [0, 1, 2, 3] },
    { id: mcData.blocksByName.log2.id, meta: [0, 1] }
  ]

  if (!bot.pathfinder) bot.loadPlugin(require('mineflayer-pathfinder').pathfinder)
  if (!bot.tool) bot.loadPlugin(require('mineflayer-tool').plugin)
  if (!bot.collectBlock) bot.loadPlugin(require('mineflayer-collectblock').plugin)

  bot.chat(`🌲 Đang tìm ${count} khối gỗ...`)

  const blocks = []

  for (let dx = -32; dx <= 32; dx++) {
    for (let dy = -8; dy <= 8; dy++) {
      for (let dz = -32; dz <= 32; dz++) {
        const pos = bot.entity.position.offset(dx, dy, dz)
        const block = bot.blockAt(pos)
        if (!block) continue

        const match = validLogs.find(l => l.id === block.type && l.meta.includes(block.metadata))
        if (match) {
          blocks.push(block)
          if (blocks.length >= count) break
        }
      }
      if (blocks.length >= count) break
    }
    if (blocks.length >= count) break
  }

  if (blocks.length === 0) {
    return bot.chat('❌ Không tìm thấy khối gỗ nào gần đây.')
  }

  bot.chat(`🪓 Đã thấy ${blocks.length} khối gỗ.`)

  try {
    const axe = bot.inventory.items().find(i => i.name.includes('axe'))
    if (axe) await bot.equip(axe, 'hand')

    await bot.collectBlock.collect(blocks.slice(0, count))
    await new Promise(resolve => setTimeout(resolve, 1500)) // chờ nhặt item

    bot.chat(`✅ Đã chặt đủ ${count} gỗ.`)

    const player = bot.players[username]?.entity
    if (!player) return bot.chat('❌ Không thấy bạn để đưa đồ.')

    // Di chuyển đến gần người chơi
    const goal = new GoalNear(player.position.x, player.position.y, player.position.z, 1)
    bot.pathfinder.setGoal(goal, true)

    // Chờ bot đến gần
    const waitUntilNear = async () => {
      while (true) {
        const dist = bot.entity.position.distanceTo(player.position)
        if (dist <= 2) break
        await new Promise(r => setTimeout(r, 300))
      }
    }

    await waitUntilNear()

    // Đợi ổn định inventory
    await new Promise(resolve => setTimeout(resolve, 500))

    const woodItems = bot.inventory.items().filter(i => i.name.includes('log'))
    if (woodItems.length === 0) return bot.chat('❌ Không có gỗ trong kho.')

    let dropped = 0
    for (const item of woodItems) {
      const amount = Math.min(item.count, count - dropped)
      if (amount <= 0) break

      await bot.toss(item.type, null, amount)
      dropped += amount
    }

    bot.chat(`🎁 Đã đưa tổng cộng ${dropped} gỗ cho ${username}.`)

  } catch (err) {
    bot.chat('⚠️ Lỗi: ' + (err.message || err.toString()))
    console.error('[!] Stack:', err)
  }
}

// made by tienanh109
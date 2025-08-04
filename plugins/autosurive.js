module.exports = (bot) => {
  const toxicFoods = ['rotten_flesh', 'spider_eye', 'pufferfish']

  if (!bot.pvp) bot.loadPlugin(require('mineflayer-pvp').plugin)

  // 🔁 Tự động ăn nếu đói
  bot.on('physicsTick', () => {
    if (bot.food === 20) return

    const food = bot.inventory.items().find(item =>
      item.name.includes('') &&
      item.name && !toxicFoods.includes(item.name)
    )

    if (food) {
      bot.equip(food, 'hand', () => {
        bot.consume(() => {
          bot.chat('🍗 Đang ăn...')
        })
      })
    } else {
      // Không có đồ ăn → xin người chơi gần nhất
      const player = bot.nearestEntity(e => e.type === 'player')
      if (player && !bot._lastBeg || Date.now() - bot._lastBeg > 10000) {
        bot.chat(`${player.username}, đói quá... cho tui xin đồ ăn với 😢`)
        bot._lastBeg = Date.now()
      }
    }
  })

  // 🛡️ Kháng cự khi bị đánh
  bot.on('entityHurt', (entity) => {
    if (!bot.guardPos) return // chỉ phản ứng nếu đang ở guard mode (hoặc bị đánh)
    if (entity !== bot.entity) return

    const attacker = bot.nearestEntity(e =>
      e.type === 'mob' &&
      bot.entity.position.distanceTo(e.position) < 8
    )

    if (attacker) {
      bot.chat(`⚔️ Phản kích ${cleanName(attacker.name)}!`)
      bot.pvp.attack(attacker)
    }
  })

  // 🧹 Helper: loại bỏ phần đuôi dạng "#1" trong tên
  function cleanName(name) {
    return name?.split('#')[0]
  }
}
// made by tienanh109
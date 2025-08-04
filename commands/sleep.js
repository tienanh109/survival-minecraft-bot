// commands/sleep.js
const { goals: { GoalNear } } = require('mineflayer-pathfinder')

module.exports = async (bot, username, args) => {
  if (bot.isSleeping) {
    bot.chat('Tôi đang ngủ rồi!')
    return
  }

  try {
    // Tìm giường gần nhất
    const bed = bot.findBlock({
      matching: block => bot.isABed(block),
      maxDistance: 20
    })
    
    if (!bed) {
      bot.chat('Không tìm thấy giường nào gần đây.')
      return
    }

    bot.chat(`${username}, tôi sẽ đi ngủ ngay!`)
    
    // Di chuyển đến gần giường
    if (bot.pathfinder) {
      await bot.pathfinder.goto(new GoalNear(bed.position.x, bed.position.y, bed.position.z, 1))
    }
    
    // Đợi một chút trước khi ngủ
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Thử ngủ
    await bot.sleep(bed)
    bot.chat('Ngủ ngon! Dùng !wake để đánh thức tôi.')
    
  } catch (err) {
    console.error('Lỗi:', err)
    bot.chat(`Không thể ngủ: ${err.message}`)
  }
}

// Made by tienanh109
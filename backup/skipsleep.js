// plugins/autoSleep.js
const { goals: { GoalNear } } = require('mineflayer-pathfinder')

module.exports = function autoSleep(bot) {
  let hasSleptThisNight = false
  let sleepTimeout = null
  let isProcessingSleep = false

  function shouldSleepNow() {
    const time = bot.time.timeOfDay
    return time > 13000 && time < 23000 // khoảng thời gian đêm
  }

  async function findAndSleep() {
    if (isProcessingSleep || bot.isSleeping) return
    
    isProcessingSleep = true
    
    try {
      // Tìm giường gần nhất
      const bed = bot.findBlock({
        matching: block => bot.isABed(block),
        maxDistance: 20
      })
      
      if (!bed) {
        bot.chat('🚫 Không tìm thấy giường gần để ngủ.')
        return
      }

      // Kiểm tra xem giường có trống không
      const bedOccupied = Object.values(bot.entities)
        .some(entity => 
          entity.position && 
          entity.position.distanceTo(bed.position) < 1 && 
          entity.isSleeping
        )

      if (bedOccupied) {
        bot.chat('🚫 Giường đã có người ngủ, tìm giường khác...')
        // Tìm giường khác
        const otherBeds = bot.findBlocks({
          matching: block => bot.isABed(block),
          maxDistance: 20,
          count: 5
        }).filter(bedPos => bedPos.distanceTo(bed.position) > 2)
        
        if (otherBeds.length > 0) {
          const alternateBed = bot.blockAt(otherBeds[0])
          if (alternateBed) {
            await bot.pathfinder.goto(new GoalNear(alternateBed.position.x, alternateBed.position.y, alternateBed.position.z, 1))
            await new Promise(resolve => setTimeout(resolve, 500))
            await bot.sleep(alternateBed)
            bot.chat('😴 Đã tìm được giường khác. Chúc ngủ ngon!')
            return
          }
        }
        bot.chat('🚫 Không tìm thấy giường trống nào.')
        return
      }

      bot.chat(`🌙 Trời tối rồi, tôi sẽ đi ngủ...`)
      
      // Di chuyển đến gần giường
      await bot.pathfinder.goto(new GoalNear(bed.position.x, bed.position.y, bed.position.z, 1))
      
      // Đợi một chút trước khi ngủ
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Thử ngủ
      await bot.sleep(bed)
      bot.chat('😴 Ngủ ngon! Hẹn gặp lại vào buổi sáng!')
      
    } catch (err) {
      console.error('[AutoSleep] Lỗi khi ngủ:', err)
      bot.chat('🚫 Không thể ngủ: ' + err.message)
    } finally {
      isProcessingSleep = false
    }
  }

  bot.on('time', () => {
    const isNight = shouldSleepNow()
    const isDay = !isNight

    // Reset trạng thái khi sang ngày mới
    if (isDay && hasSleptThisNight) {
      bot.chat('🌅 Một ngày mới lại đến! Tôi đã thức dậy.')
      hasSleptThisNight = false
      isProcessingSleep = false
      if (sleepTimeout) {
        clearTimeout(sleepTimeout)
        sleepTimeout = null
      }
    }

    // Không làm gì nếu không phải đêm, đã ngủ rồi, đang ngủ, hoặc đang xử lý ngủ
    if (!isNight || hasSleptThisNight || bot.isSleeping || isProcessingSleep) return

    // Đánh dấu đã ngủ để tránh spam
    hasSleptThisNight = true
    
    // Clear timeout cũ nếu có
    if (sleepTimeout) {
      clearTimeout(sleepTimeout)
    }
    
    // Delay một chút để đảm bảo thời gian ổn định
    sleepTimeout = setTimeout(() => {
      findAndSleep()
      sleepTimeout = null
    }, 1500) // 1.5 giây delay
  })

  bot.on('wake', () => {
    console.log('[AutoSleep] Bot đã thức dậy')
    // Không reset hasSleptThisNight ở đây vì có thể bot bị đánh thức giữa đêm
    isProcessingSleep = false
    if (sleepTimeout) {
      clearTimeout(sleepTimeout)
      sleepTimeout = null
    }
  })

  // Xử lý khi bot bị disconnect
  bot.on('end', () => {
    if (sleepTimeout) {
      clearTimeout(sleepTimeout)
      sleepTimeout = null
    }
  })

  // Command để force ngủ
  bot.on('chat', (username, message) => {
    if (message === '!sleep' || message === '!ngu') {
      if (bot.isSleeping) {
        bot.chat('💤 Tôi đang ngủ rồi!')
        return
      }
      bot.chat('🛏️ Được rồi, tôi sẽ đi ngủ ngay!')
      findAndSleep()
    }
    
    if (message === '!wake' || message === '!thuc') {
      if (bot.isSleeping) {
        bot.wake()
        bot.chat('😊 Tôi đã thức dậy!')
      } else {
        bot.chat('👀 Tôi không ngủ mà!')
      }
    }
  })

  console.log('[AutoSleep] ✅ Đã bật plugin tự động ngủ khi trời tối.')
  console.log('[AutoSleep] 💡 Sử dụng !sleep hoặc !ngu để bắt bot ngủ ngay')
  console.log('[AutoSleep] 💡 Sử dụng !wake hoặc !thuc để đánh thức bot')
}
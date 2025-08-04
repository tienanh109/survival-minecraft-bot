module.exports = (bot) => {
  bot.on('health', () => {
    if (bot.food < 20) {
      const food = bot.inventory.items().find(item => item.name.includes('beef'))
      if (food) bot.equip(food, 'hand', () => bot.consume())
    }
  })
}

// Made by tienanh109
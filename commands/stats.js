module.exports = (bot, username, args) => {
  const health = bot.health.toFixed(1)
  const food = bot.food
  const exp = bot.experience.level
  const pos = bot.entity.position
  const name = bot.username

  const inventory = bot.inventory.items()
  const itemList = inventory.length > 0
    ? inventory.map(item => `• ${item.count}x ${item.name}`).join('\n')
    : '• Không có vật phẩm nào.'

  const msg = `Trạng thái bot:
Tên: ${name}
Vị trí: (${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)})
Máu: ${health} / 20
Thức ăn: ${food} / 20
Cấp độ: ${exp}
Túi đồ:
${itemList}`

  msg.split('\n').forEach(line => bot.chat(line))
}

// MADE BY tienanh109
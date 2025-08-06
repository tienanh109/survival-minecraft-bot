module.exports = (bot, username, args) => {
  if (args.length === 0) {
    return bot.chat("❌ Hãy nhập tên item để drop. Ví dụ: !drop-filter dirt");
  }

  const filters = args.map(name => name.toLowerCase());

  const itemsToDrop = bot.inventory.items().filter(item =>
    filters.some(filter => item.name.includes(filter))
  );

  if (itemsToDrop.length === 0) {
    return bot.chat("✅ Không tìm thấy item phù hợp để drop.");
  }

  let dropping = false;
  const dropNext = () => {
    const item = itemsToDrop.shift();
    if (!item) return bot.chat("✅ Đã thả xong.");

    dropping = true;
    bot.tossStack(item, err => {
      if (err) {
        bot.chat(`❌ Lỗi khi thả ${item.name}`);
      }
      dropping = false;
      dropNext();
    });
  };

  if (!dropping) dropNext();
};
// Made by tienanh109
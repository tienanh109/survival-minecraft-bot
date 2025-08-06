module.exports = async (bot, username, args) => {
  if (args.length < 2) {
    return bot.chat('❗ Dùng: !repeat "<lệnh cần lặp>" <số lần>');
  }

  const fullInput = args.join(' ');
  const match = fullInput.match(/"(.+?)"\s+(\d+)/);
  if (!match) {
    return bot.chat('⚠️ Cú pháp sai. Ví dụ: !repeat "hunt sheep" 3');
  }

  const commandLine = match[1];
  const times = parseInt(match[2]);
  if (isNaN(times) || times <= 0) {
    return bot.chat('⚠️ Số lần lặp không hợp lệ.');
  }

  const commandParts = commandLine.split(' ');
  const commandName = commandParts[0];
  const commandArgs = commandParts.slice(1);

  const commandFn = bot.commands?.[commandName];
  if (!commandFn) {
    return bot.chat(`❌ Lệnh "${commandName}" không tồn tại.`);
  }

  bot.chat(`🔁 Đang lặp lệnh "${commandLine}" ${times} lần, lần lượt...`);

  for (let i = 0; i < times; i++) {
    bot.chat(`➡️ Lặp lần ${i + 1}/${times}...`);

    // Thực hiện lệnh
    commandFn(bot, username, commandArgs);

    // Đợi bot.emit('done') hoặc timeout nếu không có
    await new Promise(resolve => {
      let timeout = setTimeout(() => {
        bot.chat(`⚠️ Lệnh "${commandName}" không báo hoàn thành, tiếp tục...`);
        resolve();
      // }, 15000); // timeout sau 15s
      });

      bot.once('done', () => {
        clearTimeout(timeout);
        resolve();
      });
    });
  }

  bot.chat(`✅ Đã hoàn thành ${times} lần lệnh "${commandName}".`);
};
// made by tienanh109
const Vec3 = require('vec3');
const { pathfinder, Movements, goals: { GoalBlock, GoalNear } } = require('mineflayer-pathfinder');

module.exports = async (bot, username, args) => {
  if (!bot.pathfinder) bot.loadPlugin(pathfinder);
  if (!bot._movements) {
    bot._movements = new Movements(bot);
    bot.pathfinder.setMovements(bot._movements);
  }

  const blockName = args[0];
  const count = parseInt(args[1]) || 1;
  if (!blockName) {
    return bot.chat(`Usage: !mine <blockName> [count]`);
  }

  const targetBlock = bot.findBlock({
    matching: block => block && block.name === blockName,
    maxDistance: 64
  });
  if (!targetBlock) {
    return bot.chat(`Không tìm thấy block '${blockName}' gần đây.`);
  }

  const tool = bot.inventory.items().find(item => item.name.includes('pickaxe'));
  if (!tool) {
    return bot.chat(`Không có pickaxe để đào.`);
  }

  try {
    const { x, y, z } = targetBlock.position;
    await bot.pathfinder.goto(new GoalBlock(x, y, z));
    await bot.equip(tool, 'hand');
    await bot.dig(targetBlock);
    bot.chat(`Đã đào 1 '${blockName}'.`);

    // Theo dõi item mới rơi và cố gắng nhặt nó
    const onCollect = (collector, collected) => {
      try {
        if (collector === bot.entity && collected?.entity?.position) {
          const pos = collected.entity.position;
          bot.pathfinder.goto(new GoalNear(pos.x, pos.y, pos.z, 1)).then(() => {
            bot.chat(`Đã thu thập vật phẩm.`);
          });
        }
      } catch (e) {
        bot.chat(`Lỗi khi nhặt item: ${e.message}`);
      }
    };

    bot.once('playerCollect', onCollect);

    // Phòng khi không có sự kiện thu thập
    setTimeout(() => {
      bot.removeListener('playerCollect', onCollect);
    }, 5000);

  } catch (err) {
    if (err.message.includes('Tool is broken')) {
      bot.chat(`Cúp của bạn đã hỏng!`);
    } else {
      bot.chat(`Lỗi khi đào: ${err.message}`);
    }
  }
};
// Made by tienanh109
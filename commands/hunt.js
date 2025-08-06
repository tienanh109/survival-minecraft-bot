const { GoalBlock } = require('mineflayer-pathfinder').goals;
const mineflayerPvp = require('mineflayer-pvp').plugin;

module.exports = (bot, username, args) => {
  if (!bot.pathfinder) bot.loadPlugin(require('mineflayer-pathfinder').pathfinder);
  if (!bot.pvp) bot.loadPlugin(mineflayerPvp);

  const targetMobName = (args[0] || 'sheep').toLowerCase();
  const range = 30;

  const entity = bot.nearestEntity(e =>
    e.type === 'mob' &&
    e.name?.toLowerCase().startsWith(targetMobName) &&
    e.position &&
    bot.entity.position.distanceTo(e.position) < range
  );

  if (!entity) {
    bot.chat(`❌ Không tìm thấy mob "${targetMobName}" gần đây.`);
    return;
  }

  const sword = bot.inventory.items().find(item => item.name.includes('sword'));
  if (sword) {
    bot.equip(sword, 'hand', err => {
      if (!err) bot.chat(`⚔️ Đã trang bị ${sword.name}`);
    });
  }

  const pos = entity.position.floored();
  const goal = new GoalBlock(pos.x, pos.y, pos.z);
  bot.pathfinder.setGoal(goal);
  bot.chat(`🎯 Tiếp cận ${entity.name} tại (${pos.x}, ${pos.y}, ${pos.z})...`);

  const interval = setInterval(() => {
    if (!entity?.isValid) {
      clearInterval(interval);
      bot.pvp.stop();
      bot.pathfinder.setGoal(null);
      bot.chat("✅ Mob đã bị tiêu diệt. Đang nhặt đồ quanh xác...");

      // 🔁 Di chuyển xung quanh mob chết (vòng tròn nhỏ)
      const offsets = [
        [0, 0],
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
        [1, 1],
        [-1, 1],
        [1, -1],
        [-1, -1],
      ];

      let i = 0;
      const walkAround = () => {
        if (i >= offsets.length) {
          bot.chat("👜 Đã tìm xong quanh xác.");
          return;
        }

        const [dx, dz] = offsets[i];
        const px = pos.x + dx;
        const pz = pos.z + dz;
        const goal = new GoalBlock(px, pos.y, pz);
        bot.pathfinder.setGoal(goal);

        i++;
        setTimeout(walkAround, 1000); // đợi 1s mỗi bước
      };

      walkAround();
      return;
    }

    const dist = bot.entity.position.distanceTo(entity.position);
    if (dist < 4) {
      bot.pvp.attack(entity);
    }
  }, 500);

  bot.once('death', () => {
    bot.chat('💀 Tôi đã chết, dừng săn mob.');
    bot.pvp.stop();
    bot.pathfinder.setGoal(null);
    clearInterval(interval);
  });
};
// made by tienanh109
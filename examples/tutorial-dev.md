# 🤖 Minecraft Bot - Hành Trình Sinh Tồn (Mineflayer 1.9)

---

## 📦 Giới thiệu

Bot Minecraft này tạo bởi **tienanh109** và viết bằng Node.js sử dụng [Mineflayer](https://github.com/PrismarineJS/mineflayer), trợ lý hành trình sinh tồn trong game.

- Hỗ trợ Minecraft **1.9**
- Modular hoá: mỗi tính năng là 1 file riêng
- Tương tác qua lệnh trong game (`! (có thể tùy chỉnh)`)
- Dễ mở rộng qua `commands/` và `plugins/`

---

## 🗂️ Cấu trúc thư mục

```
tienanh109/survival-minecraft-bot/
├── commands/          ← Chat commands (!ping, !follow,...)
│   └── ...js
├── plugins/           ← Auto modules (auto-eat, auto-hi,...)
│   └── ...js
├── commandLoader.js   ← Tải lệnh tự động
├── pluginLoader.js    ← Tải plugin tự động
├── config.js          ← Cấu hình bot
├── main.js            ← Chạy dự án
├── bot.js             ← Chạy Bot
├── webserver.js       ← Chạy web server
├── và còn một số file khác như bot.log, etc...
└── package.json
```


---

## 🔧 Cách thêm lệnh mới (`commands/`)

1. Tạo file mới: `commands/hello.js`
2. Nội dung:
```js
module.exports = (bot, username, args) => {
  bot.chat(`Chào bạn ${username}!`)
}
```
3. Trong game gõ:
```
!hello
```

✅ Có thể truyền thêm args:
```
!say hello world
// args = ['hello', 'world']
```

---

## 🧠 Cách thêm plugin tự động (`plugins/`)

1. Tạo file mới: `plugins/autoEat.js`
2. Nội dung:
```js
module.exports = (bot) => {
  bot.on('health', () => {
    if (bot.food < 20) {
      const food = bot.inventory.items().find(i => i.name.includes('beef'))
      if (food) bot.equip(food, 'hand', () => bot.consume())
    }
  })
}
```

✅ Plugin được chạy tự động sau khi bot spawn.

---


## ✏️ THÊM TÍNH NĂNG MỚI

Bạn có thể sử dụng các tính năng tích hợp sẵn hoặc viết các tính năng mới:

Làm theo mẫu dưới đây để lên kế hoạch thêm lệnh hoặc plugin mới:

```
Tôi muốn thêm tính năng: [mô tả ngắn gọn].

→ Đây là lệnh hay plugin?: [command / plugin]

→ Tên file đề xuất: [abc.js]

→ Khi người chơi gọi lệnh hoặc bot trigger, nó sẽ: [hành động chi tiết]
```

---

### ✅ Ví dụ:

```
Tôi muốn thêm tính năng: bot follow người chơi gọi lệnh.

→ Đây là lệnh hay plugin?: command

→ Tên file đề xuất: follow.js

→ Khi người chơi gọi !follow, bot sẽ tự động đi theo người đó.
```

---

## 🧠 Tips:

- File `.js` trong `commands/` là hàm `(bot, username, args) => {}`
- File `.js` trong `plugins/` là hàm `(bot) => {}` chạy sau khi spawn
- Dùng `console.log(...)` để debug
- Server cần chạy Minecraft **1.9** và bật `offline-mode: true` nếu test local

---

Qua hướng dẫn. Bạn có thể tự làm tính năng mới!
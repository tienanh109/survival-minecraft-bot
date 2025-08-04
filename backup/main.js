// Made by tienanh109

console.log(`This is the open source Minecraft Survival Assistant Bot by tienanh109`)
console.log(`You can find the source code at github.com/tienanh109/survival-minecraft-bot`)
console.log(`Feel free to contribute and improve the bot!`)
console.log(`Thank you for using this bot!`)
console.log(`Have fun playing Minecraft!`)
console.log(`\n`)

// main.js
console.log(`🛠️ Giao diện cấu hình đang chạy tại http://localhost:8080`)
console.log(`📌 Hãy cấu hình trước khi khởi động bot.`)

const config = require('./config')
require('./webserver')(null, config) // chỉ chạy web, chưa khởi động bot

const fs = require('fs')
const path = require('path')

module.exports = function loadPlugins(bot) {
  const pluginDir = path.join(__dirname, 'plugins')

  fs.readdirSync(pluginDir).forEach(file => {
    if (file.endsWith('.js')) {
      const plugin = require(path.join(pluginDir, file))
      plugin(bot)
      console.log(`[+] Đã tải plugin: ${file}`)
    }
  })
}

const express = require('express')
const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')

let botProcess = null

module.exports = (bot, config) => {
  const app = express()
  const PORT = 8080

  app.use(express.static(path.join(__dirname, 'webui')))
  app.use(express.json())

  // API: Lấy config hiện tại
  app.get('/api/config', (req, res) => {
    res.json(config)
  })

  // API: Ghi config vào config.js
  app.post('/api/config', (req, res) => {
    const newConfig = req.body
    try {
      fs.writeFileSync(
        path.join(__dirname, 'config.js'),
        'module.exports = ' + JSON.stringify(newConfig, null, 2)
      )
      res.json({ success: true })
      console.log('[💾] Đã lưu config từ giao diện web.')
    } catch (err) {
      console.error('[❌] Lỗi ghi file config:', err)
      res.status(500).json({ success: false })
    }
  })

  // API: Start bot
  app.post('/api/start', (req, res) => {
    if (botProcess) {
      return res.status(400).json({ success: false, message: 'Bot đang chạy.' })
    }

    const out = fs.openSync(path.join(__dirname, 'bot.log'), 'a')
    const err = fs.openSync(path.join(__dirname, 'bot.log'), 'a')

    botProcess = spawn('node', ['bot.js'], {
      cwd: __dirname,
      stdio: ['ignore', out, err], // ghi stdout/stderr vào log
      shell: true
    })

    console.log('[🚀] Bot đang khởi động...')
    res.json({ success: true })

    botProcess.on('exit', (code) => {
      console.log(`[💤] Bot đã thoát với mã: ${code}`)
      botProcess = null
    })

    botProcess.on('error', (e) => {
      console.error('[❌] Lỗi khi khởi động bot:', e)
      botProcess = null
    })
  })

  // API: Stop bot
  app.post('/api/stop', (req, res) => {
    if (!botProcess) {
      return res.status(400).json({ success: false, message: 'Bot chưa chạy.' })
    }

    try {
      process.kill(botProcess.pid, 'SIGINT') // Gửi tín hiệu mềm
      console.log('[🛑] Đã gửi tín hiệu dừng bot.')
      res.json({ success: true })
    } catch (err) {
      console.error('[❌] Lỗi khi dừng bot:', err)
      res.status(500).json({ success: false, message: 'Không thể dừng bot.' })
    }
  })

  // API: Trạng thái bot
  app.get('/api/status', (req, res) => {
    res.json({ running: !!botProcess })
  })

  // Khởi động webserver
  app.listen(PORT, () => {
    console.log(`🌐 Giao diện chạy tại: http://localhost:${PORT}`)
  })
}

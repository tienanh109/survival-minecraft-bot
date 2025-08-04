// config.js
// Cấu hình bot cho Minecraft

module.exports = {
  // Cấu hình kết nối server
  host: 'localhost',         // IP hoặc hostname của server
  port: 65075,               // Port server Minecraft
  version: '1.9',            // Phiên bản Minecraft (ví dụ: '1.9', '1.12.2'...)
  auth: 'offline',           // 'offline' | 'mojang' | 'microsoft'

  // Tài khoản bot
  username: 'MyBot',         // Tên bot (nếu offline mode)
  password: undefined,       // Mật khẩu nếu dùng tài khoản thật

  // Giao tiếp
  prefix: '!',               // Prefix lệnh
  autoRespondOnError: true,  // Bot trả lời khi lệnh lỗi?
  hideErrors: false,         // Ẩn lỗi chi tiết trong console?

  // Tùy chọn mở rộng
  logging: true,             // Ghi log toàn bộ hành vi bot
  logChat: false,            // Ghi chat từ người chơi

  // Danh sách người được phép điều khiển bot
  whitelist: ['YourUsername1', 'tienanh109'], // Thêm tên người chơi tại đây
}

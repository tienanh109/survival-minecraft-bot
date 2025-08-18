# 🧠 AssistantMCSurvival Bot
> Trợ lý ảo sinh tồn Minecraft (Java Edition) với lệnh, và khả năng mở rộng lệnh dễ dàng.

![version](https://img.shields.io/badge/version-1.1-blue) ![mineflayer](https://img.shields.io/badge/mineflayer-4.5.x-green) ![node](https://img.shields.io/badge/node-%3E=18.x-orange)

---

## 🎮 Tính năng nổi bật

- ✅ Tự động chặt gỗ và đưa lại người dùng
- ✅ PVP Bot chiến đấu người chơi chỉ định
- ✅ Tính năng trợ giúp sinh tồn
- ✅ Người bạn đồng hành 
- ✅ Bảo vệ người chơi
- ✅ Có whitelist
- ✅ Source code dễ đọc, giải thích từng đoạn
- ✅ Config dễ sửa, lưu lại tự động
- ✅ Hệ thống lệnh mở rộng, tách từng file riêng
- ✅ và vô vàn tính năng khác nữa

---

## 🧠 Yêu cầu

- Minecraft Java Edition (khuyến nghị 1.9 trở lên)
- Node.js >= 18
- Kết nối mạng ổn định nếu dùng tài khoản online

---

## 📦 Cài đặt

```bash
# Cài Node.js >= 18.0 nếu chưa có
https://nodejs.org/

# Clone repo này về
git clone https://github.com/tienanh109/survival-minecraft-bot.git
cd survival-minecraft-bot

# Cài thư viện cần thiết
npm install
```

---

## 🚀 Khởi động

```bash
# mở trò chơi, bật LAN

# đọc và cấu hình ip, port, etc vào file config.js
nano config.js

# Khởi động server
node main.js
```
---

> [!NOTE]
> - **Nếu bạn gặp khó khăn trong quá trình cài đặt, [tham gia máy chủ của chúng tôi để được hỗ trợ!](https://tienanh109.github.io/dc)**
> - Không dùng bot cho bất cứ hành vi gian lận/phạm pháp

## ⚙️ Cấu hình

Toàn bộ cấu hình nằm trong file `config.js`.  
Bạn có thể chỉnh qua và khởi động lại server để áp dụng thay đổi

---

## ✍️ Mở rộng

- Bạn có thể mở rộng commands cho bot nếu muốn, có thể mở PR để đóng góp, sửa lỗi. [Cụ thể hướng dẫn tại đây](https://github.com/tienanh109/survival-minecraft-bot/blob/main/examples/tutorial-dev.md)
- Bot vẫn trong giai đoạn phát triển nên còn khá nhiều sai sót.

### 🚀 Todo list:
- (✅) Lệnh repeat - lặp lệnh
- 🟨 Lệnh: build - Xây dựng
- 🟨 Lệnh mới
- 🟨 Thông minh: Tự động cầm rìu hoặc sử dụng công cụ thích hợp để chặt cây
- 🟨 Tối ưu hóa trải nghiệm của người chơi
- 🟨 Đẩy code & update 1.3

`✅ là đã xong và chờ cập nhật, 🟨 là đang làm, () là đang xử lý.`


## 💖 Đóng góp

Pull request, đóng góp hoặc ý tưởng đều được chào đón!  
Mọi người đều có thể cải thiện bot hoặc thêm tính năng mới.

---

## 📜 Bản quyền

Code do [tienanh109](https://github.com/tienanh109) phát triển.  
Sử dụng source code theo giấy phép [GPL-3.0 license](https://github.com/tienanh109/survival-minecraft-bot?tab=GPL-3.0-1-ov-file)

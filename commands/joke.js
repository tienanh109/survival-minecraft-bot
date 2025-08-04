const fs = require('fs')
const path = require('path')
const https = require('https')

// fallback nội bộ nếu không có file/API
const fallbackJokes = [
  "Why don't Endermen like eye contact? ...Because they take it *personally*.",
  "What’s a creeper’s favorite food? ...Ssssspaghetti!",
  "Why did the chicken cross the Nether? ...To get to the other biome.",
  "Why did Steve get fired from his job? ...He kept mining his own business.",
  "What’s a skeleton’s least favorite room in the house? ...The living room."
]

function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getJokeFromFile(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    const lines = raw.split('\n').map(line => line.trim()).filter(Boolean)
    if (lines.length > 0) return getRandomFromArray(lines)
  } catch (err) {
    console.warn('[joke] Không đọc được file:', err.message)
  }
  return null
}

function getJokeFromAPI() {
  return new Promise((resolve) => {
    https.get('https://v2.jokeapi.dev/joke/Any?format=txt', (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(data.trim()))
    }).on('error', () => resolve(null))
  })
}

module.exports = async (bot) => {
  const jokeFromFile = getJokeFromFile(path.join(__dirname, '../data/jokes.txt'))
  if (jokeFromFile) return bot.chat(`🤣 ${jokeFromFile}`)

  const jokeFromAPI = await getJokeFromAPI()
  if (jokeFromAPI && jokeFromAPI.length <= 256) {
    return bot.chat(`😂 ${jokeFromAPI}`)
  }

  const fallback = getRandomFromArray(fallbackJokes)
  bot.chat(`😅 ${fallback}`)
}

// made by tienanh109
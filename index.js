const MIN_TEMP = 10
const MAX_TEMP = 30

function getDice() {
  return Math.random() * 20
}

function getTemp() {
  return getDice() * getDice()
}

function getRealisticTemp() {
  let temp = getTemp()
  while (temp < MIN_TEMP || temp > MAX_TEMP) {
    temp = getTemp()
  }
  return temp
}

function getRoundedTemp() {
  return Math.round((getRealisticTemp() + Number.EPSILON) * 100) / 100
}

addEventListener('scheduled', event => {
  event.waitUntil(handleSchedule())
})

async function handleSchedule() {
  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ temperature: getRoundedTemp() }),
  })
}

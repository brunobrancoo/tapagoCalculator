export function updateClock() {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  return `${hours}:${minutes}:${seconds}`
}

export function showClock() {
  const showClock = updateClock().split(":")
  showClock[0] = showClock[0].length < 2 ? "0" + showClock[0] : showClock[0]
  showClock[1] = showClock[1].length < 2 ? "0" + showClock[1] : showClock[1]
  showClock[2] = showClock[2].length < 2 ? "0" + showClock[2] : showClock[2]

  const showHours = showClock[0]
  const showMinutes = showClock[1]
  const showSeconds = showClock[2]

  return `${showHours}:${showMinutes}:${showSeconds}`
}

export function calcTimeLeft(timeToGo: string) {
  const currentTimeArray = updateClock().split(":")
  const timeToGoArray = timeToGo.split(":")

  if (Number.parseInt(currentTimeArray[2]) < 10) {
    currentTimeArray[2] = "0" + currentTimeArray[2]
  }

  const currentHourInSeconds =
    Number.parseInt(currentTimeArray[0]) * 3600 +
    Number.parseInt(currentTimeArray[1]) * 60 +
    Number.parseInt(currentTimeArray[2])

  const timeToGoInSeconds =
    Number.parseInt(timeToGoArray[0]) * 3600 +
    Number.parseInt(timeToGoArray[1]) * 60 +
    Number.parseInt(timeToGoArray[2])

  const difference = timeToGoInSeconds - currentHourInSeconds
  const result = difference / 60
  return Math.round(result)
}
